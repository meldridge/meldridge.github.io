---
title: Blah
---


https://www.zdnet.com/article/at-least-20-texas-local-governments-hit-in-coordinated-ransomware-attack/

### Imperva Incapsula breach

https://www.zdnet.com/article/imperva-discloses-security-incident-impacting-cloud-firewall-users/

https://krebsonsecurity.com/2019/08/cybersecurity-firm-imperva-discloses-breach/

https://www.imperva.com/blog/ceoblog/


https://www.themandarin.com.au/114746-wheres-the-proof-internet-voting-is-secure-a-response-to-victorias-electoral-commissioner/


### Webmin utility backdoored

Yet another software supply-chain attack. This time, it's [Webmin](http://www.webmin.com/): a fairly popular web-application for managing Unix-like systems (including Linux).

The attack was discovered accidentally, by a security researcher who thought it was a vulnerability in the Webmin code. As it turned out, it was a deliberate backdoor which had been in place for more than a year, allowing anyone who knew of its existence to remotely run commands as the root user.

From Catalin Cimpanu at [ZDNet](https://www.zdnet.com/article/backdoor-found-in-webmin-a-popular-web-based-utility-for-managing-unix-servers/):

>According to one of the Webmin developers, the vulnerability was not the result of a coding mistake, but was actually "malicious code injected into compromised build infrastructure." [...]
>
>The Webmin team also didn't specify if the "compromised build infrastructure" was referring to a compromised developer machine where the code was created, or to a compromised SourceForge account, which the hacker might have used to upload their own malicious Webmin version on SourceForge.

It's an interesting story, and worth reading in full.

ALSO ARS TECHNICA ARTICLE: [The year-long rash of supply chain attacks against open source is getting worse | Ars Technica](https://arstechnica.com/information-technology/2019/08/the-year-long-rash-of-supply-chain-attacks-against-open-source-is-getting-worse/)

### Bluetooth encryption design flaw

https://arstechnica.com/information-technology/2019/08/new-attack-exploiting-serious-bluetooth-weakness-can-intercept-sensitive-data/

### Consumer device security continues to be awful

A lesson in incentives:

https://cyber-itl.org/2019/08/26/iot-data-writeup.html

https://securityledger.com/2019/08/huge-survey-of-firmware-finds-no-security-gains-in-15-years/

(also via Zack Whittaker's excellent [~this week in security~](https://twitter.us18.list-manage.com/subscribe?u=e1ad6038c994abec17dafb116&id=a2457dc8ad) newsletter, which is much more regular than mine!)

>A survey of more than 6,000 firmware images spanning more than a decade finds no improvement in firmware security and lax security standards for the software running connected devices by Linksys, Netgear and other major vendors. [...]
>
>“Nobody is trying,” said Sarah Zatko, the Chief Scientist at the Cyber Independent Testing Lab (CITL), a non-profit organization that conducts independent tests of software security. “We found no consistency in a vendor or product line doing better or showing improvement. There was no evidence that anybody is making a concerted effort to address the safety hygiene of their products,” she said.

This outcome shouldn't be surprising, given the incentives involved. 

<a href="https://twitter.com/SwiftOnSecurity/status/920078661235089408"><img src="/images/swiftonsecurity-consumer-electronics.png" alt="Tweet by SwiftOnSecurity" class="tweet"/></a>

### Red Team, Blue Team, and feedback loops

The most recent [Risky Business podcast](https://risky.biz/) included an interview with Haroon Meer from Thinkst, and I wanted to call out [this quote](https://overcast.fm/+IbKxWEnpo/44:20) in particular: 

>I think one of the big advantages that Red Teams have is that they have super tight feedback loops. 
>
>Like—it's possible to be a defender for a *really long time* and not know that you suck, or not know that you're spending time on the wrong things. If you're an attacker and you're sucking at it, you know pretty quickly that you're not breaking into things. And this tight feedback loop is missing for lots of people who are in defence.

It's a great point, and something which also impacts on training and gamification: it's extremely easy to make a Red Team "Capture The Flag" event, because there are obvious victory conditions for someone attacking a network. It's a lot harder to do the same on the defensive side, because defence is always proving a negative.

This came up in conversation recently with a co-worker, and I mentioned that it would be interesting to have a Blue Team CTF event where there is a clear goal in mind. For example: give teams a representative corporate network with simulated business processes and a bunch of pre-existing security problems. Have them make as many improvements as possible before a certain deadline, on the condition that if they disrupt any of the simulated business processes they'll receive a scoring penalty. Once the deadline is hit, have the Red Team come in and see who did the best job.

It's a fairly obvious concept, but I haven't heard of any existing challenges which include the "don't break the business" component. If you know of any, please let me know.