---
layout: email
title: 
---


https://www.xkcd.com/2044/

### URLS are bad

http://www.abc.net.au/news/science/2018-09-16/google-time-to-reinvent-the-url-web-browser/10238296

https://www.youtube.com/watch?v=UD-ukjVoeLc&feature=youtu.be

### Security resiliance

“You also must test your ability to absorb the impact of an attack, and minimize the damage. One such test is through failure injection. Chaos Monkey, part of Netflix’s suite of tools called the “Simian Army,” is a service which randomly kills instances in order to test their ability to withstand failure. In fact, Chaos Monkey is described as a resiliency tool.

While it was designed with a performance use case in mind, it can be repurposed for security. If your infrastructure is continually fluctuating, with instances killed at random, it makes it exceptionally difficult for attackers to persist. Attackers would have to conduct whatever they needed within an uncertain time frame. This is, of course, not impossible, but it absolutely raises the attacker’s cost and level of skill required.

Netflix’s goal with Chaos Monkey is to “design a cloud architecture where individual components can fail without affecting the availability of the entire system.”[22] Defenders should make it their goal to design a security architecture where individual controls can fail without affecting the security of the entire system. As I mentioned earlier, if your system becomes completely compromised because a user clicks on a malicious link, you must rethink your security architecture.”

The Red Pill of Resilience in InfoSec – Kelly Shortridge – Medium
https://medium.com/@kshortridge/the-red-pill-of-resilience-in-infosec-65f2c5d5e863
via Instapaper

### Microsoft extends AMSI to include Office macros

This is a big deal. Microsoft has extended the Windows 10 "Antimalware Scan Interface" (AMSI) to include scripts executed by Microsoft Office programs, such as VBA macros. 

From the [Microsoft blog](https://cloudblogs.microsoft.com/microsoftsecure/2018/09/12/office-vba-amsi-parting-the-veil-on-malicious-macros/):

>Macro-based threats have always been a prevalent entry point for malware, but we have observed a resurgence in recent years. Continuous improvements in platform and application security have led to the decline of software exploits, and attackers have found a viable alternative infection vector in social engineering attacks that abuse functionalities like VBA macros.

Office macros are *incredibly* useful when it comes to obtaining an initial foothold on a network, because they're one of the only ways to guarantee reliable code execution. 

Other techniques typically require a [client-side exploit](https://www.offensive-security.com/metasploit-unleashed/client-side-exploits/): corrupting the memory of a program like the user's browser, Adobe Acrobat, or Microsoft Office. These are inherently unreliable (memory corruption exploits always run the risk of crashing the software they're attacking), and tend to be patched quickly once they're discovered. 

In contrast, Office macros are a *feature*. Assuming the target organisation hasn't locked them down ([as they should have](https://acsc.gov.au/publications/protect/essential-eight-explained.htm)), using a macro as your delivery mechanism is likely to be a lot more reliable, and you won't need to spend resources on discovering new exploits.

Of course, Office macros don't automatically execute when opened, but it's very easy to engineer users into enabling them for you. For example, below is one I prepared earlier:


According to Cofense (formerly PhishMe), Office documents containing malicious macros accounted for [45% of malware delivery mechanisms](https://cofense.com/microsoft-office-macros-still-leader-malware-delivery/) in the month prior.


### Scammers making money by pretending to have passwords from previous breach data

https://twitter.com/josephfcox/status/1031952745228460032

### TSMC and WannaCry

Apparently their egress filtering meant that the infected systems couldn’t access the killswotch domain

https://overcast.fm/+IbKwvJ7zA