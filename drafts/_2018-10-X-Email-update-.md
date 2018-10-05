---
layout: email
title: 
---

Good morning.

What a week. It's becoming difficult to make these _weekly_ summaries, because there's just so much going on in the infosec world these days.

### Dutch intelligence breaks up GRU cyber operation

In any normal week... https://twitter.com/gordoncorera/status/1047788913690140673

### Bloomberg reports that Supermicro servers had hardware trojans

Bloomberg broke [this story](https://www.bloomberg.com/news/features/2018-10-04/the-big-hack-how-china-used-a-tiny-chip-to-infiltrate-america-s-top-companies) yesterday, and it's an incredible read. 

Citing 17 sources including six "current and former senior national security officials", the story states that server motherboards manufactured by Supermicro have been shipped with hardware trojans installed, and had been discovered in datacentres owned by Amazon and Apple:

>Nested on the servers’ motherboards, the testers found a tiny microchip, not much bigger than a grain of rice, that wasn’t part of the boards’ original design. Amazon reported the discovery to U.S. authorities, sending a shudder through the intelligence community. Elemental’s servers could be found in Department of Defense data centers, the CIA’s drone operations, and the onboard networks of Navy warships. And Elemental was just one of hundreds of Supermicro customers.
>
>During the ensuing top-secret probe, which remains open more than three years later, investigators determined that the chips allowed the attackers to create a stealth doorway into any network that included the altered machines. Multiple people familiar with the matter say investigators found that the chips had been inserted at factories run by manufacturing subcontractors in China.
>
>This attack was something graver than the software-based incidents the world has grown accustomed to seeing. Hardware hacks are more difficult to pull off and potentially more devastating, promising the kind of long-term, stealth access that spy agencies are willing to invest millions of dollars and many years to get.

The story would be enough of a bombshell on its own, but making things more interesting is the vehement denials of the story by both [Apple](https://www.apple.com/newsroom/2018/10/what-businessweek-got-wrong-about-apple/) and [Amazon](https://aws.amazon.com/blogs/security/setting-the-record-straight-on-bloomberg-businessweeks-erroneous-article/).

As a few people [pointed out](https://twitter.com/SwiftOnSecurity/status/1047946250035875841), this sort of direct and specific refutation isn't what you'd expect to see from SEC-regulated companies unless they're very sure that they'll be proven right by a subsequent investigation. It's a weird situation to be in.

<a href="https://twitter.com/TheRegister/status/1047952621762297857"><img src="/images/supermicro-register-antimatter.png" alt="Tweet by The Register" class="tweet"/></a>

Until we get more information (or someone finds a compromised Supermicro motherboard and pulls it apart), the grugq has a good writeup of the story [here](https://medium.com/@thegrugq/supply-chain-security-speculation-b7b6357a5d05), and Patrick Gray released a Risky Business [feature interview](https://risky.biz/RB516_feature/) on the Bloomberg story and hardware attacks generally. Both are well worth the time.

Joe FitzPatrick from SecuringHardware.com also posted a [set of tweets](https://twitter.com/securelyfitz/status/1047942844738981889) (unrolled [here](https://securinghardware.com/articles/hardware-implants/)) detailing how such an attack might be performed:

>With hardware access, there are plenty of ways to backdoor a server. Someone knowledgable could quickly pick out a dozen well marked places malicious firmware could hide on a board and dozens of more components large enough to contain a capable implant inside them.
>
>The biggest target is the BMC. It’s trivial to modify the firmware of most BMCs, and many of them are trivial to exploit remotely because of the poor quality, outdated software they run.

It's worth expanding on this, as not many people will know what a BMC does unless they've spent some time administering or securing servers.

### Own the BMC, own the server

Modern servers come with a Baseboard Management Controller (BMC), which provides something called [out-of-band management](https://en.wikipedia.org/wiki/Out-of-band_management): allowing administrators to remotely control the server hardware independent of the operating system running on top of it. 

In the simplest case, if you have access to the BMC you can remotely interact with the server as if you were physically in front of it with a monitor and keyboard.

[This article by The Register](https://www.theregister.co.uk/2018/09/07/supermicro_bmcs_hole/) back in September (coincidentally also about Supermicro servers) gives a good summary:

>A BMC is typically installed directly onto the motherboard of a server where it is able to directly control and manage the various hardware components of the server independent of the host and guest operating systems. It can also repair, alter, or reinstall the system software, and is remotely controlled over a network or dedicated channel by an administrator. It allows IT staff to manage, configure, and power cycle boxes from afar, which is handy for people looking after warehouses of machines.
>
>Because BMCs operate at such a low level, they are also valuable targets for hackers.

Yep. We'll come back to that.

Many BMCs are also responsible for loading the firmware for other devices on the board such as network controllers, and they often have the ability to directly interact with the host operating system via Direct Memory Access (DMA). This means that if you manage to compromise the BMC, you can inject malicious code into the actual host operating system running on the server itself.

With this much power over the server's hardware and the host operating system, access to the BMC is incredibly sensitive: if you own the BMC, you own the server. 

Unfortunately, BMC security has historically been... poor.  As the grugq put it:

>**"Baseboard Management Controllers (BMC) and the Intelligent Platform Management Interface (IPMI) protocol are a horrendous tire fire for cyber security."**

### A long history of poor security practices

[This blog post](https://blog.rapid7.com/2013/07/02/a-penetration-testers-guide-to-ipmi/) by Rapid7's HD Moore goes into detail about BMC security and the IPMI protocol which is an industry standard for communicating with BMCs. There are plenty of problems to highlight, but my favourite is this fundamental weakness in the IPMI 2.0 protocol specification:

>In short, the authentication process for IPMI 2.0 mandates that the server send a salted SHA1 or MD5 hash of the requested user's password to the client, prior to the client authenticating. You heard that right - the BMC will tell you the password hash for any valid user account you request. This password hash can broken using an offline bruteforce or dictionary attack. Since this issue is a key part of the IPMI specification, there is no easy path to fix the problem, short of isolating all BMCs into a separate network.

It gets worse. Back in 2014, it was made public that Supermicro's BMC [would send you the plaintext admin password](https://arstechnica.com/information-technology/2014/06/at-least-32000-servers-broadcast-admin-passwords-in-the-clear-advisory-warns/) if you just sent a particular HTTP GET request to a certain port:

<a href="https://twitter.com/cynicalsecurity/status/479743473344872448"><img src="/images/supermicro-psblock.png" alt="Tweet by Arrigo Triulzi" class="tweet"/></a>

That's right - send a GET request to a particular port on the BMC interface, and the server will dutifully send you the admin password.  I've had great fun with this one on previous engagements.

Finally, a group of researchers discovered this year that the login for HP's BMC software could be bypassed by simply [entering a 29 'A' characters in a connection header](https://www.bleepingcomputer.com/news/security/you-can-bypass-authentication-on-hpe-ilo4-servers-with-29-a-characters/). This also allowed them to obtain code execution in the BMC, and then use DMA to compromise the Linux host OS running on the server. The full presentation is here: [_Backdooring your server through its BMC: the HPE iLO4 case_](https://airbus-seclab.github.io/ilo/SSTIC2018-Slides-EN-Backdooring_your_server_through_its_BMC_the_HPE_iLO4_case-perigaud-gazet-czarny.pdf).

The list of security problems in BMC software is long, so to summarise: it's bad. We don't do a good enough job of securing this part of the software stack, and once it's compromised, it's very difficult to detect or remove.


### Facebook follow-up: third-party website SSO implementations

Some follow-up to my [Facebook post](https://markeldo.com/Facebook-and-the-trade-off-of-centralised-authentication/) from earlier in the week: https://twitter.com/jpolakis/status/1046094369831485440

### PAC bypass

In a [previous email](https://markeldo.com/Email-update-AMSI-for-macros-iPhone-PACs-reinventing-the-URL-and-infosec-resilience/) we discussed the use of authenticated pointers (PAC) in the latest iPhones, and how the technology is likely to make iOS exploit development significantly more difficult. Of course, no mitigation is perfect. Apparently a Chinese team has [already written an iOS 12 jailbreak](https://twitter.com/SparkZheng/status/1045265728318754816) which bypasses PAC.

### Office kills DDE by default

- https://twitter.com/secbughunter/status/1047230349732864000
- https://support.office.com/en-us/article/disabling-dynamic-data-exchange-dde-with-group-policy-1cad6409-5c06-485d-bbed-614b3195b091


### Reconnaissance and open-Source intelligence

OSINT

https://posts.specterops.io/gathering-open-source-intelligence-bee58de48e05
https://github.com/chrismaddalena/ODIN



### Fancy bear and firmware implants

https://www.welivesecurity.com/2018/09/27/lojax-first-uefi-rootkit-found-wild-courtesy-sednit-group/

https://www.wired.com/story/fancy-bear-hackers-uefi-rootkit/?mbid=social_twitter

https://twitter.com/ortegaalfredo/status/1045449915827212290
https://www.theregister.co.uk/2018/09/28/uefi_rootkit_apt28/
https://2016.zeronights.ru/wp-content/uploads/2016/12/1_2_UEFI_Rootkits_ZN_2016.pdf

When it comes to [persistence mechanisms](https://attack.mitre.org/wiki/Persistence), this is the gold standard - your implant will survive a reinstall of the OS and even complete replacement of the hard drive.

