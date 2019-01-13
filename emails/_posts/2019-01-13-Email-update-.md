---
layout: email
title: DTA blockchain report, Phineas Fisher investigation dropped
---

Good evening.

I hope you all had a great break over the holidays, and happy New Year! My last update was sent back in November just before my wife and I moved back to Adelaide from Stockholm - unfortunately I didn't do as good a job of keeping up with my email updates this time around.

In any case I'm happy to report that we're settling in well. We'll sincerely miss Stockholm and all of the friends we made while living there, but it's good to be home.

### Global MSP hacks by China

Big news just before Christmas. From [ZDNet](https://www.zdnet.com/article/at-least-nine-global-msps-hit-in-apt10-attacks-acsc/):

>It’s not just third-party applications, either. Managed Service Providers (MSPs) are ubiquitous in industry, and often the entire IT department of a given company is outsourced to a provider such as Fujitsu or HP Enterprise. If one of these MSPs is owned, the attacker gets the keys to the kingdom for many other organisations, many of whose employees may not even be aware that they’re using a MSP.

There is little detail in the reporting about these attacks, but it's safe to assume this is exactly what happened: the MSPs in question were compromised, and the attackers then used standard lateral movement techniques until they obtained administrative access to their actual target. 

Remember: once you have this level of access, there's little to no chance of being detected by the target company. To put it bluntly: if the target organisation is mature enough that their internal security team can spot malicious insiders with God-mode levels of access to their own systems, they wouldn't be outsourcing to an MSP in the first place.

This sort of set-up is quite common in modern enterprise networks. It's very common for a company to outsource their entire IT infrastructure to an MSP, to the point that all of the highly privileged administrator accounts (such as Domain Administrators in Windows environments) are employees of the MSP.

In financial terms, this is a bit like outsourcing your entire finance team, but without any controls in place. It'll work, and it might save you some money, but you're running a risk in doing so. You can outsource the work, but you can't outsource the risk.

### NotPetya, cyber insurance, and war exclusion clauses

We've covered the NotPetya attack [many times previously](https://www.google.com/search?q=site%3Amarkeldo.com+notpetya), but recall [this one in particular](https://markeldo.com/Email-update-NotPetya-attribution-cyber-insurance-and-inoculating-networks/) from last February:

>As a side-note, one of the interesting aspects of the NotPetya story is its implications for insurance.
>
>I’m *far* from an expert on cyber security insurance, but it’s fairly typical for insurance policies to contain a War Exclusion Clause, which means that damages caused by “acts of war” will not be covered by the insurer.
>
>When it comes to kinetic warfare this is reasonably well-defined, but when it comes to the cyber domain it’s still an open question. One could very easily make the argument that NotPetya was an act of cyber warfare by Russia against Ukraine, which would not be very fun if you were counting on your insurance to cover $300 million worth of losses.
>
>Cyber security is still a very new field, and it will be interesting to see how this plays out.

Sure enough, from [ZDNet](https://www.zdnet.com/article/notpetya-an-act-of-war-cyber-insurance-firm-taken-to-task-for-refusing-to-pay-out/) again:

>It is reported that Mondelez attempted to claim $100 million on its insurance policy due to the damage NotPetya caused to thousands of servers and laptops, not to mention the theft of credentials, abandoned customer orders and other losses caused by the malware outbreak. 
>
>While the insurance policy covered "physical loss or damage to electronic data, programs, or software" by way of "the malicious introduction of a machine code or instruction," Zurich apparently chose not to pay up, citing the NotPetya spread as "hostile or warlike action in time of peace or war," which, therefore, voided the claim.

I find this situation fascinating, because it sits at the intersection of so many problems in the field of cyber security: the difficulty of attributing attacks, the ability to cause massive economic damages with no direct loss of life, and a general lack of technical literacy on all sides making it hard to even agree on a basic set of facts around what has happened during an attack. It's worth keeping an eye on this story.