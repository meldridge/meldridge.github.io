---
layout: post
title: Supermicro, hardware trojans, and BMC security
image: "/images/supermicro-bmc-cropped.jpg"
excerpt: "We need to take two things much more seriously: the security of our supply-chain, and the security of our baseboard management controllers."
---

![supermicro-bmc-cropped](/images/supermicro-bmc-cropped.jpg)
<em class="caption">A Supermicro B1DRi board, showing the baseboard management controller (Source: <a href="https://img.alicdn.com/imgextra/i4/53172813/TB2KWHEAv5TBuNjSspcXXbnGFXa_!!53172813.jpg">Alibaba</a>)</em>

Bloomberg broke [this story](https://www.bloomberg.com/news/features/2018-10-04/the-big-hack-how-china-used-a-tiny-chip-to-infiltrate-america-s-top-companies) last week, and it's an incredible read. 

Citing 17 sources including six "current and former senior national security officials", the story states that server motherboards manufactured by Supermicro have been shipped with hardware trojans installed, and had been discovered in datacentres owned by Amazon and Apple:

>Nested on the servers’ motherboards, the testers found a tiny microchip, not much bigger than a grain of rice, that wasn’t part of the boards’ original design. Amazon reported the discovery to U.S. authorities, sending a shudder through the intelligence community. Elemental’s servers could be found in Department of Defense data centers, the CIA’s drone operations, and the onboard networks of Navy warships. And Elemental was just one of hundreds of Supermicro customers.
>
>During the ensuing top-secret probe, which remains open more than three years later, investigators determined that the chips allowed the attackers to create a stealth doorway into any network that included the altered machines. Multiple people familiar with the matter say investigators found that the chips had been inserted at factories run by manufacturing subcontractors in China.
>
>This attack was something graver than the software-based incidents the world has grown accustomed to seeing. Hardware hacks are more difficult to pull off and potentially more devastating, promising the kind of long-term, stealth access that spy agencies are willing to invest millions of dollars and many years to get.

The story would be enough of a bombshell on its own, but making things more interesting is the vehement denials of the story by both [Apple](https://www.apple.com/newsroom/2018/10/what-businessweek-got-wrong-about-apple/) and [Amazon](https://aws.amazon.com/blogs/security/setting-the-record-straight-on-bloomberg-businessweeks-erroneous-article/).

As a few people [pointed out](https://twitter.com/SwiftOnSecurity/status/1047946250035875841), this sort of direct and specific refutation isn't what you'd expect to see from SEC-regulated companies unless they're very sure that they'll be proven right by a subsequent investigation. It's a weird situation to be in.

<a href="https://twitter.com/TheRegister/status/1047952621762297857"><img src="/images/supermicro-register-antimatter.png" alt="Tweet by The Register" class="tweet"/></a>

The Register also published [this piece](https://www.theregister.co.uk/2018/10/04/supermicro_bloomberg/) on the Bloomberg claims which provides a good summary of the story and the significance of the Apple and Amazon denials. The grugq also has a good writeup of the story [here](https://medium.com/@thegrugq/supply-chain-security-speculation-b7b6357a5d05), and Patrick Gray released a Risky Business [feature interview](https://risky.biz/RB516_feature/) on the Bloomberg story and hardware attacks generally.

Since last week there have been a few more data points (including from [the UK's GCHQ and the U.S. DHS](https://www.theregister.co.uk/2018/10/08/super_micro_us_uk_intelligence/)) supporting Apple and Amazon's denials and suggesting that Bloomberg might have got specific parts of the story wrong. 

It's a fascinating standoff. Meanwhile, Supermicro's share price is down almost 50% from last Thursday.

### The feasibility of hardware backdoors

Until we get more information (or someone finds a compromised Supermicro motherboard and pulls it apart), it's worth talking about how feasible this sort of attack actually is. Supply-chain security has been an [active area of discussion](https://www.schneier.com/blog/archives/2018/05/supply-chain_se.html) for years, and this story was like dropping a grenade into the middle of it.

Nicholas Weaver has posted a good overview on [Lawfare](https://www.lawfareblog.com/china-supermicro-hack-about-bloomberg-report):

>This scheme is less crazy than it might seem. Modern circuit boards are filled with small support chips, and the backdoor chip would appear to be just another faceless component to all but the most detailed examination. And while the Bloomberg article doesn’t go into the mechanics of how this would work, there’s one likely culprit: the serial EEPROM chip or a serial FLASH chip, which is used to store program and other instructions used during the startup process. The BMC itself loads at least some data from such a chip, which itself needs only two wires to communicate—so it would only take two connections for a rogue chip to mask the contents of a SEEPROM or SPI FLASH, replacing the contents and thereby corrupting the BMC by installing the backdoor code.

It's worth expanding on this, as not many people will know what a BMC is or does unless they've spent some time administering or securing servers.

### Own the BMC, own the server

Modern servers come with a Baseboard Management Controller (BMC), which is a separate processor designed for managing the server hardware. The purpose of the BMC is to provide [out-of-band management](https://en.wikipedia.org/wiki/Out-of-band_management): allowing administrators to remotely control the server hardware independent of the operating system running on top of it. 

In the simplest case, if you have access to the BMC you can remotely interact with the server as if you were physically in front of it with a monitor and keyboard.

[This article by The Register](https://www.theregister.co.uk/2018/09/07/supermicro_bmcs_hole/) back in September (coincidentally also about Supermicro servers) gives a good summary:

>A BMC is typically installed directly onto the motherboard of a server where it is able to directly control and manage the various hardware components of the server independent of the host and guest operating systems. It can also repair, alter, or reinstall the system software, and is remotely controlled over a network or dedicated channel by an administrator. It allows IT staff to manage, configure, and power cycle boxes from afar, which is handy for people looking after warehouses of machines.
>
>Because BMCs operate at such a low level, they are also valuable targets for hackers.

Yep. We'll come back to that.

Many BMCs are also responsible for loading the firmware for other devices on the board such as network controllers, and they have the ability to directly interact with the host operating system via direct memory access (DMA) and hardware interrupts. This means that if you manage to compromise the BMC, you can inject malicious code into the actual host operating system running on the server itself.

With this much power over the server's hardware and the host operating system, access to the BMC is incredibly sensitive: if you own the BMC, you own the server. 

Unfortunately, BMC security has historically been... poor. As the grugq succinctly [put it](https://medium.com/@thegrugq/supply-chain-security-speculation-b7b6357a5d05):

>**"Baseboard Management Controllers (BMC) and the Intelligent Platform Management Interface (IPMI) protocol are a horrendous tire fire for cyber security."**

### The sordid history of BMC security

[This blog post](https://blog.rapid7.com/2013/07/02/a-penetration-testers-guide-to-ipmi/) by Rapid7's HD Moore was written over 5 years ago, and goes into detail about BMC security and the IPMI protocol which is an industry standard for communicating with BMCs. There are plenty of problems to highlight, but my favourite is this fundamental weakness in the IPMI 2.0 protocol specification:

>In short, the authentication process for IPMI 2.0 mandates that the server send a salted SHA1 or MD5 hash of the requested user's password to the client, prior to the client authenticating. You heard that right - the BMC will tell you the password hash for any valid user account you request. This password hash can broken using an offline bruteforce or dictionary attack. Since this issue is a key part of the IPMI specification, there is no easy path to fix the problem, short of isolating all BMCs into a separate network.

It gets worse. Back in 2014, it was made public that Supermicro's BMC [would send you the plaintext admin password](https://arstechnica.com/information-technology/2014/06/at-least-32000-servers-broadcast-admin-passwords-in-the-clear-advisory-warns/) if you just sent a particular HTTP GET request to a certain port:

<a href="https://twitter.com/cynicalsecurity/status/479743473344872448"><img src="/images/supermicro-psblock.png" alt="Tweet by Arrigo Triulzi" class="tweet"/></a>

That's right: send a GET request to a particular port on the BMC interface, and the server will dutifully send you the admin password.  I've had great fun with this one on previous engagements.

Finally, a group of researchers discovered this year that the login for HP's BMC software could be bypassed by simply [entering a 29 'A' characters in a connection header](https://www.bleepingcomputer.com/news/security/you-can-bypass-authentication-on-hpe-ilo4-servers-with-29-a-characters/). This also allowed them to obtain code execution in the BMC, and then use DMA to compromise the Linux host OS running on the server. (The full presentation is [here](https://airbus-seclab.github.io/ilo/SSTIC2018-Slides-EN-Backdooring_your_server_through_its_BMC_the_HPE_iLO4_case-perigaud-gazet-czarny.pdf).)

The list of security problems in BMC software is long, so to summarise: it's bad. We don't do a good enough job of securing this layer of our IT systems, and once it's compromised, it's very difficult to detect or remove.

### Intel Management Engine: the BMC you didn't even know you had

It's not limited to servers, either. Intel's own Management Engine (IME) acts as a BMC for desktop and laptop systems, and has had [plenty of](https://www.theregister.co.uk/2017/11/20/intel_flags_firmware_flaws/) [high-profile problems](https://www.theregister.co.uk/2018/10/03/intel_management_engine_hole/) of its own.

Last November, I wrote this in an [email update](https://markeldo.com/Email-update-Intel-Management-Engine-causes-everyone-headaches-again/):

>This is a big deal, and it’s likely to be causing headaches for a very long time, due to the combination of factors:
>- Successful exploitation gives the attacker an incredible amount of control over a system. Among other things, owning IME means you have the world’s best rootkit (you can persist in a system even after someone wipes or replaces the hard drive).
>- Patching is hard, and requires a reboot in most cases (not trivial on production infrastructure).
>- Many people don’t even know IME exists or what it does, and a lot of organisations might not be aware that they’re even using systems which have IME enabled.

That last point is arguably the biggest problem: many organisations aren't even aware that this is a risk they need to worry about. 

### An apocryphal story can still teach important lessons

Hardware trojans like those described in the Bloomberg article are probably outside the threat model for many enterprises, but software attacks against insecure BMC and IME installations are well within the skillset of sophisticated criminal groups.

We should know in a few week's time whether or not specific parts of the Bloomberg story were accurate, and at this point it's [not looking good](https://twitter.com/riskybusiness/status/1049083377733652480). 

Either way, it's important to remember that this type of hardware trojan is absolutely feasible, and that we need to take two things much more seriously: the security of our supply-chain, and the security of our BMCs.