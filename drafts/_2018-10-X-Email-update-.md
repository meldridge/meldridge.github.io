---
layout: email
title: 
---

Good morning.

What a week. It's becoming difficult to make these _weekly_ summaries, because there's just so much going on in the infosec world these days.

### Bloomberg reports that Supermicro servers had hardware trojans

Bloomberg broke [this story](https://www.bloomberg.com/news/features/2018-10-04/the-big-hack-how-china-used-a-tiny-chip-to-infiltrate-america-s-top-companies) yesterday, and it's an incredible read. Citing 17 sources including six "current and former senior national security officials", Bloomberg's story states that in 2015 it was discovered that server motherboards manufactured by Supermicro had hardware trojans installed during manufacture:

>Nested on the servers’ motherboards, the testers found a tiny microchip, not much bigger than a grain of rice, that wasn’t part of the boards’ original design. Amazon reported the discovery to U.S. authorities, sending a shudder through the intelligence community. Elemental’s servers could be found in Department of Defense data centers, the CIA’s drone operations, and the onboard networks of Navy warships. And Elemental was just one of hundreds of Supermicro customers.
>
>During the ensuing top-secret probe, which remains open more than three years later, investigators determined that the chips allowed the attackers to create a stealth doorway into any network that included the altered machines. Multiple people familiar with the matter say investigators found that the chips had been inserted at factories run by manufacturing subcontractors in China.
>
>This attack was something graver than the software-based incidents the world has grown accustomed to seeing. Hardware hacks are more difficult to pull off and potentially more devastating, promising the kind of long-term, stealth access that spy agencies are willing to invest millions of dollars and many years to get.

The story would be enough of a blockbuster on its own, but making things more interesting is the blanket denials 

<a href="https://twitter.com/TheRegister/status/1047952621762297857"><img src="/images/supermicro-register-antimatter.png" alt="Tweet by The Register" class="tweet"/></a>

### Own the BMC, own the server

Modern servers come with a Baseboard Management Controller (BMC), which provides out-of-band management: allowing administrators to remotely control the server hardware independent of the operating system running on top of it. In the simplest case, if you have access to the BMC you can remotely interact with the server as if you were physically in front of it with a monitor and keyboard.

[This article by The Register](https://www.theregister.co.uk/2018/09/07/supermicro_bmcs_hole/) back in September (coincidentally also about Supermicro servers) gives a good summary:

>A BMC is typically installed directly onto the motherboard of a server where it is able to directly control and manage the various hardware components of the server independent of the host and guest operating systems. It can also repair, alter, or reinstall the system software, and is remotely controlled over a network or dedicated channel by an administrator. It allows IT staff to manage, configure, and power cycle boxes from afar, which is handy for people looking after warehouses of machines.
>
>Because BMCs operate at such a low level, they are also valuable targets for hackers.

Many BMCs are also responsible for also have direct access to 

https://airbus-seclab.github.io/ilo/SSTIC2018-Slides-EN-Backdooring_your_server_through_its_BMC_the_HPE_iLO4_case-perigaud-gazet-czarny.pdf

With this much power over the underlying system, access to the BMC is incredibly sensitive: if you own the BMC, you own the server. 

Unfortunately, BMC security has historically been... poor. 

[This blog post](https://blog.rapid7.com/2013/07/02/a-penetration-testers-guide-to-ipmi/) by Rapid7's HD Moore goes into detail about BMC security and a fundamental weakness in the IPMI 2.0 protocol (an industry standard for BMCs). 

Back in 2014, it was made public that Supermicro's BMC [would send you the plaintext admin password](https://arstechnica.com/information-technology/2014/06/at-least-32000-servers-broadcast-admin-passwords-in-the-clear-advisory-warns/) if you just sent a particular HTTP GET request to a certain port. 

Earlier this year, a group of researchers discovered that the login for HP's BMC software could be bypassed by simply [entering a 29 'A' characters in a connection header](https://www.bleepingcomputer.com/news/security/you-can-bypass-authentication-on-hpe-ilo4-servers-with-29-a-characters/).

A group of researchers presented on exactly this topic earlier this year: [_Backdooring your server through its BMC: the HPE iLO4 case_]()


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

