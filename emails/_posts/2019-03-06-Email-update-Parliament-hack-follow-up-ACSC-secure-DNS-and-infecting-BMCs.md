---
layout: email
title: Parliament hack follow-up, ACSC secure DNS, and infecting BMCs
---

Good evening.

I've had persistent issues getting these emails to render properly in Outlook 2016, so my apologies to those affected. If you have any issues, the easiest workaround is to click the "view in browser" link at the top of the email.

I'm pleased to report that one of my articles was accepted into the 2019 mnemonic [Security Report](https://www.mnemonic.no/security-report/): a lightly edited version of my [secure DevOps](https://markeldo.com/Security-gatekeeping-in-a-DevOps-world/) post from last September.

The [full report](https://www.mnemonic.no/security-report/) is worth a read, although you will need to provide your details to download the PDF. (Fortunately you can at least rest knowing that Norway is under the GDPR, so any subsequent spam should be easier to deal with!)

### Australian Parliament attack follow-up

Some follow-up on the [Australian Parliament hack](https://www.abc.net.au/news/2019-02-18/prime-minister-scott-morrison-cyber-attack-hackers/10821170): Italian security company Yoroi has quite a good analysis of some of the declassified samples from the attack. It's quite technical, but worth a read if you're interested.

[**The Arsenal Behind the Australian Parliament Hack**](https://blog.yoroi.company/research/the-arsenal-behind-the-australian-parliament-hack/)

>Contextually to the cyber incident disclosure to the public, the ACSC declassified some of the samples involved in the parliament hack, so the Cybaze-Yoroi ZLab team decided to investigate these artifacts to have an insight of Tools and Capabilities of part of this APT cyber arsenal.

Apparently the implant modules were written in C#, which makes sense. Some of you might recall [this email](https://markeldo.com/Email-update-WireGuard-complexity-security-education-and-C-sharp-for-post-exploitation/) from back in September where we discussed the move to C# for post-exploitation tooling.

### ACSC to deploy secure DNS service for government and critical infrastructure

This is an interesting story. From [itnews](https://www.itnews.com.au/news/acsc-to-deploy-protective-dns-service-for-govt-critical-infrastructure-520138):

>The Australian Cyber Security Centre is preparing to deploy a protective domain name system (DNS) service that it hopes could be adopted by all level of the Australia government and critical infrastructure.
>
>Yesterday the government’s lead cyber security agency approached the market for the defensive capability to cover both its internal and external customers, under a project it has dubbed WINTEROSE.
>
>The capability will block known and likely malicious threats based on threat feeds and provide information to customers and the ACSC to “uplift the whole of Australia security posture”.

DNS is one of those critical web technologies we tend to take for granted. At it's most basic, DNS is what your device uses to turn a domain name (such as `markeldo.com`) into an IP address (such as `185.199.108.153`). This translation is the first step in any web request you make. Without DNS, this translation isn't possible, and [everything breaks](https://en.wikipedia.org/wiki/2016_Dyn_cyberattack).

DNS is just as critical to cyber attacks: attackers need to choose a domain name for phishing pages or any malware command & control channels, and will often [carefully maintain fresh domains](https://posts.specterops.io/being-a-good-domain-shepherd-57754edd955f), or hijack legitimate ones, in order to bypass reputation blacklists in corporate internet filters.

This makes DNS an extremely useful tool for defenders: nearly all attacks start with a DNS request for a malicious domain. The trick is knowing which domains are malicious - which is exactly what the ACSC is tasked with.

This is something the UK National Cyber Security Centre has been doing [for a while](https://www.zdnet.com/article/uks-ncsc-to-monitor-internet-routing-to-stop-ddos-and-hijacks/):

>The NCSC is also collecting statistics on the usage of the domain name system (DNS) across the .gov.uk domain space. Levy had previously described his intention to build a single anycast DNS system for all of the UK public sector, "and I'm going to force everyone to use it". As of August 31 this year, 216 UK government agencies have been fully converted to using that DNS.
>
>"During that month, we served about 6 billion requests off our DNS resolver. We blocked about a million things, for about 21,000 reasons," Levy said.

Those quotes are from NCSC technical director Dr Ian Levy, and it's worth having a read of that [article](https://www.zdnet.com/article/uks-ncsc-to-monitor-internet-routing-to-stop-ddos-and-hijacks/) in full. Particularly for this quote:

>'Simple things done at scale can have a difference,' says NCSC technical director Dr Ian Levy. 'My job is not to beat cybercrime. It's to send it to France.'

Nice.

### Infecting the BMC on baremetal servers

We've covered the security of server Baseboard Mangement Controllers (BMCs) [previously](https://markeldo.com/Supermicro-hardware-trojans-and-BMC-security/), and they're in the news again: researchers from Eclypsium have shown that it's possible to rent a physical server from a so-called "bare-metal" provider (like IBM SoftLayer), modify the BMC firmware, and then have this modification persist for another customer.

From [ZDNet](https://www.zdnet.com/article/hackers-can-hijack-bare-metal-cloud-servers-by-corrupting-their-bmc-firmware/):

>The Eclypsium team says it was able to make modifications to a server's BMC firmware, which they say an attacker can abuse to access the server after it was wiped and reassigned to another customer.
>
>BMC stands for baseboard management controller, and is a computer/server component that contains its own CPU, storage system, and LAN interface that allows a remote admin to connect to or send instructions to the PC/server to perform various operations, such as modify OS settings, reinstall the OS, or update drivers.

As I stated in my post back in October last year, having control of the BMC is incredibly powerful:

>Many BMCs are also responsible for loading the firmware for other devices on the board such as network controllers, and they have the ability to directly interact with the host operating system via direct memory access (DMA) and hardware interrupts. This means that if you manage to compromise the BMC, you can inject malicious code into the actual host operating system running on the server itself.
>
>With this much power over the server’s hardware and the host operating system, access to the BMC is incredibly sensitive: if you own the BMC, you own the server.

One of the interesting twists to this story is that last year's [_Spectre_ and _Meltdown_ vulnerabilities](https://markeldo.com/Email-update-Meltdown-and-Spectre/) have caused security conscious users to (justifiably) avoid sharing a physical CPU with other virtual tenants. As a result, some of these users have switched away from providers like AWS and Azure to bare-metal hosting. As with many areas of security, this might be a case of avoiding one high-profile threat, only to increase the risk of a much simpler one.

As always, the first step is to understand your threat model, and then act accordingly.