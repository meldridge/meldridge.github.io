---
layout: email
title: Using anti-virus for privilege escalation
---

Today's article is a neat trick discovered by Florian Bogner: a way to escalate privileges on Windows endpoints by abusing the quarantine feature on anti-virus software:

[**Getting Local Admin by Abusing the Anti-Virus Quarantine**](https://bogner.sh/2017/11/avgater-getting-local-admin-by-abusing-the-anti-virus-quarantine/)

>As shown in the above video, #AVGater can be used to restore a previously quarantined file to any arbitrary filesystem location. This is possible because the restore process is most often carried out by the privileged AV Windows user mode service. Hence, file system ACLs can be circumvented (as they don’t really count for the SYSTEM user). This type of issue is called a privileged file write vulnerability and can be used to place a malicious DLL anywhere on the system.

To summarise the attack:
1. He drops a malicious file on a Windows endpoint as a low-privileged user.
2. The anti-virus software detects it as malicious, and moves it into quarantine.
3. He creates a "folder junction" (similar to a symbolic link) pointing the original location to somewhere he doesn't normally have permissions to write, such as C:\Windows or C:\Program Files
4. As the low-privileged user, he tells the anti-virus to 'restore' the file from quarantine
5. The file is restored to the original folder, but gets redirected to the location Bogner chose in step 3

At this point it's possible to obtain admin privileges with known techniques like abusing the [DLL search order](https://msdn.microsoft.com/en-us/library/windows/desktop/ms682586%28v=vs.85%29.aspx?f=255&MSPPError=-2147217396). 

In general, if you can write to an arbitrary location on the disk, there's always a way to get admin privileges. The same is true on Linux (this is exactly how the DirtyCOW exploit worked).

Notably, Microsoft's Windows Defender anti-virus (also called Microsoft Security Essentials on Win 7) is not affected, because it doesn't allow Step 4 above: you need Admin privileges to restore files, so the attack doesn't work.