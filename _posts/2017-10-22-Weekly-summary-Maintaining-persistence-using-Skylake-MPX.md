---
layout: email
title: Maintaining persistence using Skylake MPX 
---

Happy Monday, everyone!

This story landed last week: it's an interesting new technique for maintaining persistence on Windows systems which use an Intel Skylake CPU or later:

[**BoundHook Attack Exploits Intel Skylake MPX Feature**](https://threatpost.com/boundhook-attack-exploits-intel-skylake-mpx-feature/128517/)

>Dekel said the prerequisite for its proof-of-concept attack are the presence of an Intel CPU (Skylake or after) running MPX concurrently with Windows 10 (64-bit or 32-bit). Adversaries must also have already fully compromised the targeted system.
>
>“The beauty of these type attacks is that an adversary’s actions can go undetected,” said Doron Naim, senior security researcher at CyberArk.
>
>Researchers said the BoundHook technique, explained in a technical report released Wednesday, is able to cause an exception in a specific memory location in a user-mode context. Next, it is able to catch the exception and gain control over the thread execution used by a specific application. For example, the technique could allow for the interception of a keyboard event message passed between Windows and a specific service, allowing an attacker to capture or manipulate a victim’s keystrokes.

To recap: persistence is the art of ensuring that once you've owned a system, the system stays owned. It's a lot harder than it sounds, because modern attack techniques tend to avoid touching non-volatile storage ('disk') by running malware implants in memory as much as possible. 

The problem: running in memory means that whenever the system is rebooted, your implant disappears. If you want your implant to persist across reboots, you need to use other means. There's a trade-off between reliably maintaining persistent access while also ensuring that you remain undetected.

As the article notes, Microsoft's response to this sort of attack is generally "you've already rooted the system, this isn't a vulnerability". Which is fair enough in a lot of ways: if you have SYSTEM on a Windows endpoint, there are endless ways to maintain persistent access (such as [hard drive rootkits](https://hackaday.com/2015/06/08/hard-drive-rootkit-is-frighteningly-persistent/)), and if you're running with that level of privileges you should be able to bypass or disable any endpoint protection software on the system.

Still, it's an interesting technique, and because it's so new (and only works from on Skylake and later Intel CPUs), it's likely to go completely undetected by most AV or even forensics tools.