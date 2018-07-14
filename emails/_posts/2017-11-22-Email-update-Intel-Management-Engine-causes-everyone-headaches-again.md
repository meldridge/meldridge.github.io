---
layout: email
title: Intel Management Engine causes everyone headaches again
---

Today's news may inspire some deja-vu: you might remember [Intel Management Engine](https://www.theregister.co.uk/2017/05/05/intel_amt_remote_exploit/) (IME), which has featured in a few emails by now. It's in the news again:

[**Intel finds critical holes in secret Management Engine hidden in tons of desktop, server chipsets**](https://www.theregister.co.uk/2017/11/20/intel_flags_firmware_flaws/)

>Intel today admitted its Management Engine (ME), Server Platform Services (SPS), and Trusted Execution Engine (TXE) are vulnerable to multiple worrying security flaws, based on the findings of external security experts.
>
>The firmware-level bugs allow logged-in administrators, and malicious or hijacked high-privilege processes, to run code beneath the operating system to spy on or meddle with the computer completely out of sight of other users and admins. The holes can also be exploited by network administrators, or people masquerading as admins, to remotely infect machines with spyware and invisible rootkits, potentially.

This is a big deal, and it's likely to be causing headaches for a very long time, due to the combination of factors:
* Successful exploitation gives the attacker an incredible amount of control over a system. Among other things, owning IME means you have the world's best rootkit (you can persist in a system even after someone wipes or replaces the hard drive).
* Patching is hard, and requires a reboot in most cases (not trivial on production infrastructure).
* Many people don't even know IME exists or what it does, and a lot of organisations might not be aware that they're even using systems which have IME enabled.

In summary, it's a mess. The biggest mitigating factor is that successful exploitation requires either local root access to the system, or remote access with IME admin credentials. This isn't something you can exploit over the internet - at least not without a lot of other things going wrong.

Still, obtaining root/admin on an office computer isn't particularly hard in a lot of environments, and this is going to be a problem for anyone who wants assurance that their systems are clean after a compromise - with IME, you'd probably be better off putting the whole system in the bin and buying a new one. ([Just be careful where you buy it from.](http://www.centrelawgroup.com/pentagon-issues-internal-warning-against-lenovo-equipment/))

A lot of people in the tech industry have been [calling](https://www.eff.org/deeplinks/2017/05/intels-management-engine-security-hazard-and-users-need-way-disable-it) for Intel to allow IME to be disabled entirely, but unfortunately current approaches to doing so aren't trivial - IME and its components are baked into a lot of things we use on a daily basis, such as support for BitLocker drive encryption. 

In the meantime, the best advice is the usual stuff: patch your devices, segment your networks, and limit how easy it is for attackers to get root on your systems in the first place.