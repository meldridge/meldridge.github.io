---
layout: email
title: 
---

### Microsoft extends AMSI to include Office macros

This is a big deal. Microsoft has extended the Windows 10 "Antimalware Scan Interface" (AMSI) to include scripts executed by Microsoft Office programs, such as VBA macros. 

From the [Microsoft blog](https://cloudblogs.microsoft.com/microsoftsecure/2018/09/12/office-vba-amsi-parting-the-veil-on-malicious-macros/):

>Macro-based threats have always been a prevalent entry point for malware, but we have observed a resurgence in recent years. Continuous improvements in platform and application security have led to the decline of software exploits, and attackers have found a viable alternative infection vector in social engineering attacks that abuse functionalities like VBA macros.

Office macros are *incredibly* useful when it comes to obtaining an initial foothold on a network, because they're one of the only ways to guarantee reliable code execution. 

Other techniques typically require a [client-side exploit](https://www.offensive-security.com/metasploit-unleashed/client-side-exploits/): corrupting the memory of a program like the user's browser, Adobe Acrobat, or Microsoft Office. These are inherently unreliable (memory corruption exploits always run the risk of crashing the software they're attacking), and tend to be patched quickly once they're discovered. 

In contrast, Office macros are a *feature*. Assuming the target organisation hasn't locked them down ([as they should have](https://acsc.gov.au/publications/protect/essential-eight-explained.htm)), using a macro as your delivery mechanism is likely to be a lot more reliable, and you won't need to spend resources on discovering new exploits.

Of course, Office macros don't automatically execute when opened, but it's very easy to engineer users into enabling them for you. For example, below is one I prepared earlier:



According to Cofense (formerly PhishMe), Office documents containing malicious macros accounted for [45% of malware delivery mechanisms](https://cofense.com/microsoft-office-macros-still-leader-malware-delivery/) in the month prior.