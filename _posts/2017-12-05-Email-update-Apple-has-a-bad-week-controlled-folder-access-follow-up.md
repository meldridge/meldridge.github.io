---
layout: email
title: Apple has a bad week, Controlled Folder Access follow-up
---

I'm sure you would have all heard about Apple's extremely dumb bug in macOS last week, which would allow you to log in as the root user just by mashing your face on the keyboard.

That's a slight exaggeration, but not by much: the bug allowed anyone with local access (or remote access if VNC was enabled) to log in as 'root' by just leaving the password field empty and hitting enter a couple of times. 

On macOS, as with any Unix-based system, 'root' is effectively God (with some caveats - macOS [actually runs a limited root user](https://apple.stackexchange.com/questions/193368/what-is-the-rootless-feature-in-el-capitan-really)), so any authentication bypass which gets you root is a big deal.

Patrick Wardle has written up an excellent explanation of how the bug works and how it was likely introduced, which is worth a read:

[Why <blank> Gets You Root](https://objective-see.com/blog/blog_0x24.html)

>First, let's look what's happening at a high level. When a user (or attacker) attempts to log into an account that is not currently enabled (i.e. root), for some unknown reason, the system will naively create that account with whatever password the user specifies...even if that password is blank. Then the user (or attacker) can readily log into that account.


### Controlled Folder Access uses blacklisting for protected folder paths

My last email was all about Windows 10 Defender Controlled Folder Access, and the fun time I was having trying to explicitly whitelist every application I use day-to-day in order to get the feature to work correctly.

Well, it turns out that I needn't have bothered: the idea is still sound, but the actual implementation needs even more work than I thought.

It turns out that while applications must be *whitelisted* (explicitly approved) in order to bypass Defender and write to 'protected folders', the actual paths of these protected folders work on a *blacklist* (explicitly denied). 

That is, if a piece of malware is located at `C:\Temp\evil_ransomware.exe` it is prohibited from writing to a few protected locations, including this one with all of my very sensitive documents and photos of my family:
* `C:\Users\Mark\Pictures`

Unfortunately for me, it *can* write to these ones:
* `\\localhost\c$\Users\Mark\Pictures`
* `\\127.0.0.1\c$\Users\Mark\Pictures`
* `\\0::0:0:1\c$\Users\Mark\Pictures`

This is because the "can't write here" list works on a blacklisting approach: certain paths are explicitly prohibited for anything which hasn't been marked as trusted as the user. 

The problem is that on a Windows system there are half a dozen ways to represent a path on the filesystem (all of the above paths point to the same place on disk), and all the malware has to do is find one which isn't blocked.

This bug was raised by Project Zero's James Forshaw:

[**Windows Defender: Controlled Folder Bypass through UNC Path**](https://bugs.chromium.org/p/project-zero/issues/detail?id=1418)

>While I understand the rationale for this feature, to leave such a large hole (and then brag about how awesome it is) is a perfect demonstration of the AV fallacy that it blocks everything as long as no one actually tries to bypass the protection. Perhaps some better security testing before shipping it might have been in order as if I can find it so can the Ransomware authors, it wouldn’t take them long to adapt, and then you’d end up with egg on your face.

(If you detected snark in that post, it's because there isn't much love lost between Project Zero and Microsoft.)

This problem is familiar ground for people in security: the practice of blacklisting "known bad things" has been used for decades in security tools (signature-based antivirus, web-application firewalls, SQL injection and XSS defences, etc etc), and the common factor is that it never works well against attackers who know what they're doing.

It's just ironic the blacklisting problem is now showing up in Defender's Controlled Folder Access - a feature which, on the surface, is supposed to be the opposite approach - whitelisting.