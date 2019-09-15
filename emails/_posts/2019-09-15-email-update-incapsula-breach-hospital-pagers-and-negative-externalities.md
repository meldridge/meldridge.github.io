---
title: Incapsula breach, hospital pagers, and negative externalities
---

Good evening.

On the 8th of next month I'll be presenting at [SecTalks Adelaide](https://www.meetup.com/en-AU/SecTalks-Adelaide/), covering the iVote WA work I conducted as part of my [Master's Thesis](https://markeldo.com/Email-update-Microsoft-manually-patches-17yo-executable-and-Mark's-thesis/) in 2017. For those of you who are regular SecTalks attendees, I look forward to seeing you there!

### Imperva Incapsula breach

Given that I'm about to perform a talk on Imperva and it's Incapsula DDoS mitigation service, this story was incredibly convenient timing.

From [Krebs on Security](https://krebsonsecurity.com/2019/08/cybersecurity-firm-imperva-discloses-breach/):

>Imperva, a leading provider of Internet firewall services that help Web sites block malicious cyberattacks, alerted customers on Tuesday that a recent data breach exposed email addresses, scrambled passwords, API keys and SSL certificates for a subset of its firewall users.

There is a disappointing lack of detail regarding exactly how the attackers got into Imperva's systems, but the information provided is bad enough. To put it mildly, allowing customer SSL certificates to be compromised is in the "catastrophic failure" category for a service like Incapsula.

Dr Chris Culnane, a co-author on the paper I wrote as part of the iVote work, tweeted this (entirely justified) *"I told you so"*:

<a href="https://twitter.com/chrisculnane/status/1166567064162709504"><img src="/images/culnane-incapsula-breach.PNG" alt="Tweet by Chris Culnane" class="tweet"/></a>

In related news, Dr Vanessa Teague recently penned a [detailed response](https://www.themandarin.com.au/114746-wheres-the-proof-internet-voting-is-secure-a-response-to-victorias-electoral-commissioner/) to Victoria's Electoral Commissioner regarding online voting (written before this latest Imperva breach was made public), which is worth reading in full.  

### Hospital pager systems

[This story](https://www.citynews1130.com/2019/09/09/its-angering-bcs-privacy-watchdog-investigating-claims-patient-info-compromised-at-vancouver-hospitals/) made news in Canada last week:

>Some of your most private and sensitive health information may be compromised when you visit Vancouver hospitals, according to a non-profit privacy advocacy group. The allegations are serious and legitimate enough that the Office of the Information and Privacy Commissioner has opened an investigation.
>
>Open Privacy Research Society says the problem is the way hospitals and departments are sharing patient information with each other. Executive Director Sarah Jamie Lewis says they use paging systems which essentially broadcast the data — unencrypted — through radio waves.
>
>“Patient names, gender, date of birth, diagnosis, their doctor, the room number that they’re in, is being broadcast by paging messages,” she tells NEWS 1130. “Anybody with a laptop and a $20 [device] can effectively get a livestream of patient health information from Vancouver hospitals.”
>
>The device is a software defined radio, which can be the size of a USB drive and plugged into a laptop.

This has been a long time coming. I've previously mentioned the impact of cheap software defined radio (SDR) in terms of [radio jamming attacks](https://markeldo.com/Email-update-ASDs-responsibilities-wireless-deauth-attacks-and-radio-jamming/) against commercial wireless networks:

>The widespread adoption of SDR has massively decreased the barrier of entry to anyone who wants to play with radio signals, and it no longer requires thousands of dollars in specialised equipment if you want to do something (again, very illegal) such as [jamming or spoofing nearby GPS receivers](https://www.rtl-sdr.com/spoofing-gps-locations-with-low-cost-tx-sdrs/).

When it comes to sniffing information from hospital pagers, the barrier is even lower—you only need to receive the signal, and it's not particularly difficult. 

Balint Seeber has been presenting on this topic for [almost a decade now](https://www.youtube.com/watch?v=pbgeLRvjirI&t=9m48s) (I've mentioned his work [previously](https://markeldo.com/Email-update-Aircraft-hacking-using-software-defined-radio/)):

[<img alt="Hospital Pager Systems" src="/images/balint-seeber-all-your-RFz_pagers.png" width="600">](https://www.youtube.com/watch?v=pbgeLRvjirI&t=9m48s)

The proper solution is for hospitals to move to a secure pager/messaging system which includes proper encryption and authentication of messages, but this is just one more item on [long list](https://www.theverge.com/2019/4/4/18293817/cybersecurity-hospitals-health-care-scan-simulation) of security issues plaguing the healthcare industry.

### Consumer device security continues to be awful

From [Security Ledger](https://securityledger.com/2019/08/huge-survey-of-firmware-finds-no-security-gains-in-15-years/):

>A survey of more than 6,000 firmware images spanning more than a decade finds no improvement in firmware security and lax security standards for the software running connected devices by Linksys, Netgear and other major vendors. [...]
>
>“Nobody is trying,” said Sarah Zatko, the Chief Scientist at the Cyber Independent Testing Lab (CITL), a non-profit organization that conducts independent tests of software security. “We found no consistency in a vendor or product line doing better or showing improvement. There was no evidence that anybody is making a concerted effort to address the safety hygiene of their products,” she said.

This outcome shouldn't be surprising, given the incentives involved. Consumers don't really prioritise security when purchasing tech devices, especially cheap ones. Until they do, manufacturers have zero reason to bother spending the money hardening them.

As [SwiftOnSecurity](https://twitter.com/SwiftOnSecurity/status/920078661235089408) aptly put it:

<a href="https://twitter.com/SwiftOnSecurity/status/920078661235089408"><img src="/images/swiftonsecurity-consumer-electronics.png" alt="Tweet by SwiftOnSecurity" class="tweet"/></a>

This is a classic *negative externality*: millions of insecure  devices with internet connectivity which will inevitably be owned and [used to attack others](https://www.csoonline.com/article/3258748/the-mirai-botnet-explained-how-teen-scammers-and-cctv-cameras-almost-brought-down-the-internet.html). 

It's a complicated problem, and there are no easy solutions.


### Red Team, Blue Team, and feedback loops

A recent [Risky Business podcast](https://risky.biz/) included an interview with Haroon Meer from Thinkst, and I wanted to call out [this quote](https://overcast.fm/+IbKxWEnpo/44:20) in particular: 

>I think one of the big advantages that Red Teams have is that they have super tight feedback loops. 
>
>Like—it's possible to be a defender for a *really long time* and not know that you suck, or not know that you're spending time on the wrong things. If you're an attacker and you're sucking at it, you know pretty quickly that you're not breaking into things. And this tight feedback loop is missing for lots of people who are in defence.

It's a great point, and something which also impacts on training and gamification: it's extremely easy to make a Red Team "Capture The Flag" event, because there are obvious victory conditions for someone attacking a network. It's a lot harder to do the same on the defensive side, because defence is always proving a negative.

This came up in conversation recently with a co-worker, and I mentioned that it would be interesting to have a Blue Team CTF event where there is a clear goal in mind. For example: give teams a representative corporate network with simulated business processes and a bunch of pre-existing security problems. Have them make as many improvements as possible before a certain deadline, on the condition that if they disrupt any of the simulated business processes they'll receive a scoring penalty. Once the deadline is hit, have the Red Team come in and see who did the best job.

It's not a new concept, but I haven't heard of any existing challenges which include a simulated *"don't break the business"* component. If you know of any, please let me know.