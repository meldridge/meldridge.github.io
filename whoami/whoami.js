(function () {
  'use strict';

  /* ── Dangerous privileges ─────────────────────────────────────────────── */
  const PRIVS = {
    'SeImpersonatePrivilege':         { sev: 'crit', note: 'Token impersonation — SYSTEM via PrintSpoofer / Potato family.' },
    'SeAssignPrimaryTokenPrivilege':  { sev: 'crit', note: 'Assign primary tokens — SYSTEM via token swap.' },
    'SeTcbPrivilege':                 { sev: 'crit', note: 'Act as part of the OS — equivalent to SYSTEM.' },
    'SeLoadDriverPrivilege':          { sev: 'crit', note: 'Load arbitrary signed driver — kernel-mode execution.' },
    'SeDebugPrivilege':               { sev: 'crit', note: 'Debug any process — token theft from SYSTEM / lsass.' },
    'SeBackupPrivilege':              { sev: 'crit', note: 'Read any file as the OS — exfil SAM/SYSTEM/NTDS.dit hives.' },
    'SeRestorePrivilege':             { sev: 'crit', note: 'Write any file as the OS — DLL hijack, overwrite system binaries.' },
    'SeTakeOwnershipPrivilege':       { sev: 'crit', note: 'Take ownership of any object — grant self full control.' },
    'SeCreateTokenPrivilege':         { sev: 'crit', note: 'Forge access tokens at will.' },
    'SeManageVolumePrivilege':        { sev: 'crit', note: 'DiskShadow / volume copy — NTDS.dit extraction on a DC.' },
    'SeSecurityPrivilege':            { sev: 'high', note: 'Manage audit/security log — can clear or modify the Security event log.' },
    'SeRelabelPrivilege':             { sev: 'high', note: 'Change object integrity labels.' },
    'SeTrustedCredManAccessPrivilege':{ sev: 'high', note: 'Access Credential Manager as a trusted caller.' },
    'SeEnableDelegationPrivilege':    { sev: 'high', note: 'Enable accounts as trusted-for-delegation — opens unconstrained delegation attacks.' },
    'SeSystemEnvironmentPrivilege':   { sev: 'high', note: 'Modify firmware environment values.' },
    'SeShutdownPrivilege':            { sev: 'info', note: 'Shut down the local system.' },
    'SeRemoteShutdownPrivilege':      { sev: 'info', note: 'Force shutdown from a remote system.' },
    'SeChangeNotifyPrivilege':        { sev: 'info', note: 'Bypass traverse checking — informational baseline.' },
  };

  /* ── High-value groups by stable well-known SID ───────────────────────── */
  const WELL_KNOWN_SIDS = {
    'S-1-5-32-544': { sev: 'crit', label: 'BUILTIN\\Administrators',          note: 'Local admin on this host.' },
    'S-1-5-32-551': { sev: 'crit', label: 'BUILTIN\\Backup Operators',        note: 'Back up / restore any file — SAM/SYSTEM/NTDS extraction on a DC.' },
    'S-1-5-32-549': { sev: 'crit', label: 'BUILTIN\\Server Operators',        note: 'On a DC: manage services and reboot — SYSTEM-equivalent path.' },
    'S-1-5-32-548': { sev: 'crit', label: 'BUILTIN\\Account Operators',       note: 'Modify non-protected domain accounts.' },
    'S-1-5-32-550': { sev: 'high', label: 'BUILTIN\\Print Operators',         note: 'On a DC: PrintNightmare-class attack surface; can load printer drivers.' },
    'S-1-5-32-578': { sev: 'crit', label: 'BUILTIN\\Hyper-V Administrators',  note: 'Full control of Hyper-V VMs — guest-to-host pivot.' },
    'S-1-5-32-580': { sev: 'high', label: 'BUILTIN\\Remote Management Users',  note: 'Allowed to connect via WinRM.' },
    'S-1-5-32-555': { sev: 'high', label: 'BUILTIN\\Remote Desktop Users',    note: 'Allowed to RDP in.' },
    'S-1-5-32-562': { sev: 'high', label: 'BUILTIN\\Distributed COM Users',   note: 'DCOM access — lateral movement vector.' },
  };

  /* ── High-value groups by domain RID suffix ───────────────────────────── */
  const DOMAIN_RIDS = {
    '512': { sev: 'crit', label: 'Domain Admins',           note: 'Full administrative control of the domain.' },
    '519': { sev: 'crit', label: 'Enterprise Admins',       note: 'Full administrative control of the forest.' },
    '518': { sev: 'crit', label: 'Schema Admins',           note: 'Modify the AD schema — persistence-grade.' },
    '517': { sev: 'crit', label: 'Cert Publishers',         note: 'Publish certificates to AD; combined with AD CS misconfig may yield DA.' },
    '516': { sev: 'crit', label: 'Domain Controllers',      note: 'Membership = this principal is a DC machine account.' },
    '520': { sev: 'crit', label: 'Group Policy Creator Owners', note: 'Create new GPOs; with link rights this is a domain-takeover path.' },
    '526': { sev: 'crit', label: 'Key Admins',              note: 'Write msDS-KeyCredentialLink — Shadow Credentials attack.' },
    '527': { sev: 'crit', label: 'Enterprise Key Admins',   note: 'Forest-wide Key Admins.' },
    '498': { sev: 'high', label: 'Enterprise Read-only Domain Controllers', note: 'RODC enterprise group.' },
    '521': { sev: 'high', label: 'Read-only Domain Controllers', note: 'RODC domain group.' },
    '553': { sev: 'high', label: 'RAS and IAS Servers',     note: 'Read certain account attributes.' },
    '525': { sev: 'info', label: 'Protected Users',         note: 'Hardens the account against credential theft — informational.' },
  };

  /* ── Name-based high-value groups (no stable RID) ─────────────────────── */
  const NAMED_GROUPS = [
    { re: /\bDnsAdmins\b/i,                 sev: 'crit', note: 'On a DC: load a DLL via dnscmd ServerLevelPluginDll — SYSTEM on the DC.' },
    { re: /Exchange Trusted Subsystem/i,    sev: 'crit', note: 'Legacy Exchange installs: WriteDACL on the domain object — DA via DCSync.' },
    { re: /Exchange Windows Permissions/i,  sev: 'crit', note: 'WriteDACL on the domain object — DA via DCSync.' },
    { re: /Organization Management/i,       sev: 'high', note: 'Exchange admin — broad recipient and mailbox access.' },
  ];

  /* ── Parser ───────────────────────────────────────────────────────────── */
  function parseWhoami(raw) {
    const text = raw.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const lines = text.split('\n');
    const out = { user: null, groups: null, privileges: null };
    let section = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      // Section header: a label line followed by a line of dashes.
      if (i + 1 < lines.length && /^-{3,}$/.test(lines[i + 1].trim()) && trimmed) {
        const lower = trimmed.toLowerCase();
        if (lower.includes('user information'))            section = 'user';
        else if (lower.includes('group information'))      section = 'groups';
        else if (lower.includes('privileges information')) section = 'privileges';
        else                                                section = null;
        i++;
        continue;
      }

      // Table separator: a row of `=== === ===`. Previous line is headers.
      if (section && /^[= ]+$/.test(trimmed) && /==/.test(trimmed) && i > 0 && lines[i - 1].trim()) {
        const headerLine = lines[i - 1];
        const sepLine    = lines[i];
        const cols = [];
        const re = /=+/g;
        let m;
        while ((m = re.exec(sepLine)) !== null) cols.push(m.index);
        if (cols.length < 2) continue;

        const sliceCols = (src) => cols.map((start, k) => {
          const end = k + 1 < cols.length ? cols[k + 1] : src.length;
          return (src.slice(start, end) || '').trim();
        });

        const headers = sliceCols(headerLine);
        const rows = [];
        let j = i + 1;
        while (j < lines.length) {
          const d = lines[j];
          const dt = d.trim();
          if (dt === '') break;
          if (/^[= -]+$/.test(dt)) break;
          rows.push(sliceCols(d));
          j++;
        }

        if (section === 'user') {
          const ix = {
            user: headers.findIndex(h => /user name/i.test(h)),
            sid:  headers.findIndex(h => /\bsid\b/i.test(h)),
          };
          out.user = rows.map(r => ({
            user: r[ix.user >= 0 ? ix.user : 0] || '',
            sid:  r[ix.sid  >= 0 ? ix.sid  : 1] || '',
          }));
        } else if (section === 'groups') {
          const ix = {
            name: headers.findIndex(h => /group name/i.test(h)),
            type: headers.findIndex(h => /^type$/i.test(h)),
            sid:  headers.findIndex(h => /\bsid\b/i.test(h)),
            attr: headers.findIndex(h => /attributes/i.test(h)),
          };
          out.groups = rows.map(r => ({
            name: r[ix.name >= 0 ? ix.name : 0] || '',
            type: ix.type >= 0 ? (r[ix.type] || '') : '',
            sid:  ix.sid  >= 0 ? (r[ix.sid]  || '') : '',
            attributes: ix.attr >= 0 ? (r[ix.attr] || '') : '',
          }));
        } else if (section === 'privileges') {
          const ix = {
            name:  headers.findIndex(h => /privilege name/i.test(h)),
            desc:  headers.findIndex(h => /description/i.test(h)),
            state: headers.findIndex(h => /\bstate\b/i.test(h)),
          };
          out.privileges = rows.map(r => ({
            name:        r[ix.name >= 0 ? ix.name : 0] || '',
            description: ix.desc  >= 0 ? (r[ix.desc]  || '') : '',
            state:       ix.state >= 0 ? (r[ix.state] || '') : '',
          }));
        }
        i = j;
      }
    }
    return out;
  }

  /* ── Classification ──────────────────────────────────────────────────── */
  function classifyGroup(g) {
    if (g.sid) {
      const wk = WELL_KNOWN_SIDS[g.sid];
      if (wk) return wk;
      const ridM = g.sid.match(/-(\d+)$/);
      if (ridM && DOMAIN_RIDS[ridM[1]] && /^S-1-5-21-/.test(g.sid)) {
        return DOMAIN_RIDS[ridM[1]];
      }
    }
    for (const ng of NAMED_GROUPS) {
      if (ng.re.test(g.name)) return { sev: ng.sev, label: g.name, note: ng.note };
    }
    return null;
  }

  function classifyPrivilege(p) {
    const info = PRIVS[p.name];
    if (!info) return null;
    const enabled = /enabled/i.test(p.state);
    if (info.sev === 'info' && !enabled) return null;
    if (!enabled && info.sev !== 'info') {
      const downgraded = info.sev === 'crit' ? 'high' : 'info';
      return { sev: downgraded, note: info.note + ' Currently disabled, but a token holder can enable it.' };
    }
    return { sev: info.sev, note: info.note };
  }

  /* ── Render helpers ───────────────────────────────────────────────────── */
  function h(s) {
    return String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function badge(sev) {
    const label = sev === 'crit' ? 'CRITICAL' : sev === 'high' ? 'HIGH' : 'INFO';
    return `<span class="badge b-${sev}">${label}</span>`;
  }

  function renderUserPanel(parsed) {
    if (!parsed.user || parsed.user.length === 0) return '';
    const rows = parsed.user.map(u => {
      const sidCell = u.sid
        ? `<a class="sid-link" href="../sid/?sid=${encodeURIComponent(u.sid)}" title="Encode this SID with /sid"><span class="mono">${h(u.sid)}</span><span class="sid-arrow"> → /sid</span></a>`
        : '';
      return `<div class="user-row"><span class="user-name">${h(u.user)}</span>${sidCell}</div>`;
    }).join('');
    return `<div class="card">
      <div class="card-title">User</div>
      <div class="card-inner">${rows}</div>
    </div>`;
  }

  // The canonical label from WELL_KNOWN_SIDS / DOMAIN_RIDS is worth
  // surfacing when it differs from the local part of the raw group name —
  // e.g. on a German Windows host "VORDEFINIERT\Sicherungsoperatoren" maps
  // to the canonical "BUILTIN\Backup Operators".
  function canonicalHint(rawName, label) {
    if (!label) return '';
    const localPart    = (rawName || '').split('\\').pop().trim().toLowerCase();
    const canonicalLoc = label.split('\\').pop().trim().toLowerCase();
    if (!localPart || !canonicalLoc) return '';
    if (localPart === canonicalLoc) return '';
    return label;
  }

  function renderGroupsPanel(parsed) {
    if (!parsed.groups || parsed.groups.length === 0) return '';
    const classified = parsed.groups.map(g => ({ g, c: classifyGroup(g) }));
    const flagged = classified.filter(x => x.c).sort((a, b) => sevRank(b.c.sev) - sevRank(a.c.sev));

    const flaggedHtml = flagged.length
      ? flagged.map(({ g, c }) => {
          const hint = canonicalHint(g.name, c.label);
          const hintHtml = hint ? `<span class="finding-canonical mono" title="Canonical name">≡ ${h(hint)}</span>` : '';
          return `
        <li class="finding sev-${c.sev}">
          <div class="finding-head">
            <span class="finding-name mono">${h(g.name)}</span>${hintHtml}${badge(c.sev)}
          </div>
          <div class="finding-meta mono">${h(g.sid || '')}</div>
          <div class="finding-note">${h(c.note)}</div>
        </li>`;
        }).join('')
      : '<li class="finding-empty">No high-value groups detected.</li>';

    const allRows = classified.map(({ g, c }) => {
      const hint = c ? canonicalHint(g.name, c.label) : '';
      const nameCell = hint
        ? `<span class="mono">${h(g.name)}</span> <span class="mono subtle" title="Canonical name">≡ ${h(hint)}</span>`
        : `<span class="mono">${h(g.name)}</span>`;
      return `
      <tr class="${c ? 'flagged sev-' + c.sev : ''}">
        <td>${nameCell}</td>
        <td class="mono">${h(g.sid)}</td>
        <td class="mono subtle">${h(g.type)}</td>
      </tr>`;
    }).join('');

    return `<div class="card">
      <div class="card-title">Groups <span class="card-count">${parsed.groups.length}</span></div>
      <div class="card-inner">
        <ul class="finding-list">${flaggedHtml}</ul>
        <details class="all-table">
          <summary>All groups (${parsed.groups.length})</summary>
          <table class="data-table">
            <thead><tr><th>Name</th><th>SID</th><th>Type</th></tr></thead>
            <tbody>${allRows}</tbody>
          </table>
        </details>
      </div>
    </div>`;
  }

  function renderPrivilegesPanel(parsed) {
    if (!parsed.privileges || parsed.privileges.length === 0) return '';
    const classified = parsed.privileges.map(p => ({ p, c: classifyPrivilege(p) }));
    const flagged = classified.filter(x => x.c).sort((a, b) => sevRank(b.c.sev) - sevRank(a.c.sev));

    const flaggedHtml = flagged.length
      ? flagged.map(({ p, c }) => `
        <li class="finding sev-${c.sev}">
          <div class="finding-head">
            <span class="finding-name mono">${h(p.name)}</span>${badge(c.sev)}
            <span class="finding-state mono ${/enabled/i.test(p.state) ? 'state-enabled' : 'state-disabled'}">${h(p.state)}</span>
          </div>
          <div class="finding-note">${h(c.note)}</div>
        </li>`).join('')
      : '<li class="finding-empty">No dangerous privileges detected.</li>';

    const allRows = classified.map(({ p, c }) => `
      <tr class="${c ? 'flagged sev-' + c.sev : ''}">
        <td class="mono">${h(p.name)}</td>
        <td class="mono ${/enabled/i.test(p.state) ? 'state-enabled' : 'state-disabled'}">${h(p.state)}</td>
        <td class="subtle">${h(p.description)}</td>
      </tr>`).join('');

    return `<div class="card">
      <div class="card-title">Privileges <span class="card-count">${parsed.privileges.length}</span></div>
      <div class="card-inner">
        <ul class="finding-list">${flaggedHtml}</ul>
        <details class="all-table">
          <summary>All privileges (${parsed.privileges.length})</summary>
          <table class="data-table">
            <thead><tr><th>Name</th><th>State</th><th>Description</th></tr></thead>
            <tbody>${allRows}</tbody>
          </table>
        </details>
      </div>
    </div>`;
  }

  function sevRank(sev) { return sev === 'crit' ? 3 : sev === 'high' ? 2 : sev === 'info' ? 1 : 0; }

  /* ── Main actions ─────────────────────────────────────────────────────── */
  const inp   = document.getElementById('inp');
  const errEl = document.getElementById('err');
  const sumEl = document.getElementById('summary');
  const outEl = document.getElementById('out');

  function showError(msg) {
    errEl.textContent = msg;
    errEl.classList.remove('hidden');
    sumEl.classList.add('hidden');
    outEl.innerHTML = '';
  }

  function parse() {
    const raw = inp.value.trim();
    errEl.classList.add('hidden');

    if (!raw) {
      showError('Please paste whoami /all output above.');
      return;
    }

    const parsed = parseWhoami(raw);
    if (!parsed.user && !parsed.groups && !parsed.privileges) {
      showError('No whoami sections recognised. Ensure you have pasted the output of whoami /all (or /user, /groups, /priv).');
      return;
    }

    let nCrit = 0, nHigh = 0, nInfo = 0;
    if (parsed.groups) for (const g of parsed.groups) {
      const c = classifyGroup(g); if (c) { if (c.sev === 'crit') nCrit++; else if (c.sev === 'high') nHigh++; else nInfo++; }
    }
    if (parsed.privileges) for (const p of parsed.privileges) {
      const c = classifyPrivilege(p); if (c) { if (c.sev === 'crit') nCrit++; else if (c.sev === 'high') nHigh++; else nInfo++; }
    }

    const sections = [];
    if (parsed.user)        sections.push('user');
    if (parsed.groups)      sections.push('groups');
    if (parsed.privileges)  sections.push('privileges');

    sumEl.innerHTML = `
      <div class="stat"><span class="stat-n ${nCrit?'red':'green'}">${nCrit}</span><span class="stat-l">critical</span></div>
      <div class="stat"><span class="stat-n ${nHigh?'orange':'green'}">${nHigh}</span><span class="stat-l">high</span></div>
      <div class="stat"><span class="stat-n ${nInfo?'blue':'green'}">${nInfo}</span><span class="stat-l">informational</span></div>
      <div class="summary-note">Sections parsed: ${sections.join(', ')}</div>`;
    sumEl.classList.remove('hidden');

    outEl.innerHTML = `<div class="cards">
      ${renderUserPanel(parsed)}
      ${renderGroupsPanel(parsed)}
      ${renderPrivilegesPanel(parsed)}
    </div>`;
  }

  function clearAll() {
    inp.value = '';
    outEl.innerHTML = '';
    errEl.classList.add('hidden');
    sumEl.classList.add('hidden');
  }

  const SAMPLE = `
USER INFORMATION
----------------

User Name        SID
================ =============================================
contoso\\jsmith   S-1-5-21-1004336348-1177238915-682003330-1234


GROUP INFORMATION
-----------------

Group Name                                                 Type             SID                                                           Attributes
========================================================== ================ ============================================================= ==================================================
Everyone                                                   Well-known group S-1-1-0                                                       Mandatory group, Enabled by default, Enabled group
BUILTIN\\Administrators                                     Alias            S-1-5-32-544                                                  Mandatory group, Enabled by default, Enabled group, Group owner
BUILTIN\\Backup Operators                                   Alias            S-1-5-32-551                                                  Mandatory group, Enabled by default, Enabled group
BUILTIN\\Users                                              Alias            S-1-5-32-545                                                  Mandatory group, Enabled by default, Enabled group
NT AUTHORITY\\INTERACTIVE                                   Well-known group S-1-5-4                                                       Mandatory group, Enabled by default, Enabled group
NT AUTHORITY\\Authenticated Users                           Well-known group S-1-5-11                                                      Mandatory group, Enabled by default, Enabled group
NT AUTHORITY\\This Organization                             Well-known group S-1-5-15                                                      Mandatory group, Enabled by default, Enabled group
CONTOSO\\Domain Users                                       Group            S-1-5-21-1004336348-1177238915-682003330-513                  Mandatory group, Enabled by default, Enabled group
CONTOSO\\DnsAdmins                                          Alias            S-1-5-21-1004336348-1177238915-682003330-1101                 Mandatory group, Enabled by default, Enabled group, Local Group
CONTOSO\\Group Policy Creator Owners                        Group            S-1-5-21-1004336348-1177238915-682003330-520                  Mandatory group, Enabled by default, Enabled group
Mandatory Label\\High Mandatory Level                       Label            S-1-16-12288


PRIVILEGES INFORMATION
----------------------

Privilege Name                  Description                                                       State
=============================== ================================================================= ========
SeIncreaseQuotaPrivilege        Adjust memory quotas for a process                                Disabled
SeSecurityPrivilege             Manage auditing and security log                                  Disabled
SeTakeOwnershipPrivilege        Take ownership of files or other objects                          Disabled
SeLoadDriverPrivilege           Load and unload device drivers                                    Disabled
SeSystemProfilePrivilege        Profile system performance                                        Disabled
SeSystemtimePrivilege           Change the system time                                            Disabled
SeProfileSingleProcessPrivilege Profile single process                                            Disabled
SeIncreaseBasePriorityPrivilege Increase scheduling priority                                      Disabled
SeCreatePagefilePrivilege       Create a pagefile                                                 Disabled
SeBackupPrivilege               Back up files and directories                                     Enabled
SeRestorePrivilege              Restore files and directories                                     Enabled
SeShutdownPrivilege             Shut down the system                                              Disabled
SeDebugPrivilege                Debug programs                                                    Disabled
SeSystemEnvironmentPrivilege    Modify firmware environment values                                Disabled
SeChangeNotifyPrivilege         Bypass traverse checking                                          Enabled
SeRemoteShutdownPrivilege       Force shutdown from a remote system                               Enabled
SeUndockPrivilege               Remove computer from docking station                              Disabled
SeManageVolumePrivilege         Manage the operating system volume                                Disabled
SeImpersonatePrivilege          Impersonate a client after authentication                         Enabled
SeCreateGlobalPrivilege         Create global objects                                             Enabled
SeIncreaseWorkingSetPrivilege   Increase a process working set                                    Disabled
SeTimeZonePrivilege             Change the time zone                                              Disabled
SeCreateSymbolicLinkPrivilege   Create symbolic links                                             Disabled
`.trim();

  function loadSample() {
    inp.value = SAMPLE;
    parse();
  }

  document.getElementById('parseBtn').addEventListener('click', parse);
  document.getElementById('sampleBtn').addEventListener('click', loadSample);
  document.getElementById('clearBtn').addEventListener('click', clearAll);
})();
