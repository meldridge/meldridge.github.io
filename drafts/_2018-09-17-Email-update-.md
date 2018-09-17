---
layout: email
title: 
---

Good morning.

Last week I attended the [SEC-T security conference](https://www.sec-t.org/) in Stockholm, and my employer was generous enough to send me to the "[Dark Side Ops](https://www.sec-t.org/trainings/dark-side-ops-custom-penetration-testing-workshop/)" penetration testing workshop run by the guys from Silent Break Security in the U.S.

The name is a bit corny, but the course itself was excellent. It covered malware development using Throwback and SlingShot (developed by Silent Break), and customising both implants to perform covert command & control and add additional features.

Given that I spent the first 6 years of my career writing C++ for communications software, this was right up my alley (Throwback and SlingShot are both written in C++).

### Microsoft extends AMSI to include Office macros

This is a big deal. Microsoft has extended the Windows 10 "Antimalware Scan Interface" (AMSI) to include scripts executed by Microsoft Office programs, such as VBA macros. 

From the [Microsoft blog](https://cloudblogs.microsoft.com/microsoftsecure/2018/09/12/office-vba-amsi-parting-the-veil-on-malicious-macros/):

>Macro-based threats have always been a prevalent entry point for malware, but we have observed a resurgence in recent years. Continuous improvements in platform and application security have led to the decline of software exploits, and attackers have found a viable alternative infection vector in social engineering attacks that abuse functionalities like VBA macros.

Office macros are *incredibly* useful when it comes to obtaining an initial foothold on a network, because they're one of the only ways to guarantee reliable code execution. 

Other techniques typically require a [client-side exploit](https://www.offensive-security.com/metasploit-unleashed/client-side-exploits/): corrupting the memory of a program like the user's browser, Adobe Acrobat, or Microsoft Office. These are inherently unreliable (memory corruption exploits always run the risk of crashing the software they're attacking), and tend to be patched quickly once they're discovered. 

In contrast, Office macros are a *feature*. Assuming the target organisation hasn't locked them down ([as they should have](https://acsc.gov.au/publications/protect/essential-eight-explained.htm)), using a macro as your delivery mechanism is likely to be a lot more reliable, and you won't need to spend resources on discovering new exploits.

Of course, Office macros don't automatically execute when opened, but it's very easy to engineer users into enabling them for you. For example, below is one I prepared earlier:


According to Cofense (formerly PhishMe), Office documents containing malicious macros accounted for [45% of malware delivery mechanisms](https://cofense.com/microsoft-office-macros-still-leader-malware-delivery/) in the month prior.

### F-Secure demonstrates new cold boot mitigation bypass

One of the cooler presentations (sorry) was by Olle Segerdahl and Pasi Saarinen from F-Secure. They introduced a new way to bypass modern protections against [cold boot attacks](https://en.wikipedia.org/wiki/Cold_boot_attack), allowing them to decrypt a laptop using full-disk encryption if they were able to obtain the laptop while it was in sleep mode.

A cold boot attack relies upon two things:
1) While running, the operating system stores sensitive information (such as drive encyption keys) in physical memory.
2) Memory is usually wiped when it loses power, but can store its contents for a short time - especially if you cool it down.

If you're interested in the details, it's worth reading the [original paper](https://citp.princeton.edu/research/memory/) by Halderman et. al. back in 2008 which described cold boot attacks in detail. This paper prompted the modern BIOS/EFI protections which Segerdahl and Saarinen bypassed in their presentation.

The full talk is available [here](https://www.youtube.com/watch?v=RqvPZnLkP70), and it's worth a watch if only for the physical demonstration of the attack (~16 minutes in). On the scale of "gutsy things to demo in front of a live audience", this is right up there.



https://www.theregister.co.uk/2018/09/17/gao_report_equifax_mega_breach/