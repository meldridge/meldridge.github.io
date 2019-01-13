---
layout: email
title: Cloud Hopper MSP hacks, NotPetya, cyber insurance and war exclusion clauses
---

Good evening.

I hope you all had a great break over the holidays, and happy New Year! My last update was sent back in November just before my wife and I moved back to Adelaide from Stockholm - unfortunately I didn't do as good a job of keeping up with my email updates this time around.

In any case I'm happy to report that we're settling in well, and I start a new position tomorrow. We'll sincerely miss Stockholm and all of the friends we made while living there (and the snow!), but it's good to be home.

### "Cloud Hopper" MSP hacks by China

A big story broke just before Christmas. From [ZDNet](https://www.zdnet.com/article/at-least-nine-global-msps-hit-in-apt10-attacks-acsc/):

>Nine global service providers are known to have been compromised in attacks by China's APT10 group, according to Alastair MacGibbon, head of the Australian Cyber Security Centre (ACSC).
>
>On Friday, the US formally attributed these attacks to China's Ministry of State Security (MSS) in its indictment of two Chinese nationals who it alleges are members of the group.

The main story here is the indictments and the public "calling out" of China by western governments. The actual campaign by APT10 has been publicly known for almost two years. PricewaterhouseCoopers released a report on these attacks way back in April of 2017, terming them ["Operation Cloud Hopper"](https://www.pwc.co.uk/issues/cyber-security-data-privacy/insights/operation-cloud-hopper.html):

>Since late 2016, PwC and BAE Systems have been collaborating to research the threat, brief the global security community and assist known victims. The threat actor behind the campaign is widely known within the security community as ‘APT10’, referred to within PwC UK as ‘Red Apollo’.
>
>The espionage campaign has targeted managed IT service providers (MSPs), allowing the APT10 group unprecedented potential access to the intellectual property and sensitive data of those MSPs and their clients globally. This indirect approach of reaching many through only a few targets demonstrates a new level of maturity in cyber espionage – so it’s more important than ever to have a comprehensive view of all the threats your organisation might be exposed to, either directly or through your supply chain.

A few months later I sent out an [email update](https://markeldo.com/Email-update-CCleaner-trojaned-supply-chain-attacks-and-an-intro-to-backdooring-software/) about the backdooring of popular software CCleaner, and how devastating this sort of supply-chain attack can be:

>It’s not just third-party applications, either. Managed Service Providers (MSPs) are ubiquitous in industry, and often the entire IT department of a given company is outsourced to a provider such as Fujitsu or HP Enterprise. If one of these MSPs is owned, the attacker gets the keys to the kingdom for many other organisations, many of whose employees may not even be aware that they’re using a MSP.

There is little detail in the reporting about these attacks, but it's safe to assume this is exactly what happened: the MSPs in question were compromised by APT10 using standard techniques, and the attackers then moved laterally through the network until they obtained administrative access to their actual target.

Many MSPs operate by managing the entire Microsoft Active Directory forest for their client's network, which means they have "god-mode" levels of privilege over the client's systems. If you compromise the MSP, you have that same access they do—and if you have this much power, there's little to no chance of your attack being detected by the client.

To put it bluntly: if a company's security team was mature enough that they could reliably detect a compromise via their own MSP, they probably wouldn't be outsourcing their entire AD forest to an MSP in the first place.

As always, you can outsource the work, but you can't outsource the risk.

From [the same ZDNet article](https://www.zdnet.com/article/at-least-nine-global-msps-hit-in-apt10-attacks-acsc/):

>The ACSC's website has posted [advice](https://cyber.gov.au/msp-global-hack/) for Australian businesses in the wake of the MSP breaches.
>
>"[MSPs] need to change the way they do their business, because if they are compromised it could potentially compromise all of their customers. Then those that consume those services, what can you do to architect this arrangement to still get the benefits of outsourced IT and reduce the risks," MacGibbon said.
>
>"So it's a wake-up call, and we're using, frankly, naming the MSS as a fulcrum to create leverage to change the way we behave domestically."

It's worth following the link to the ACSC advice, as the material is quite good. There's even a [list of questions](https://cyber.gov.au/business/publications/msp-questions-for-msps/MSP_Questionnaire.pdf) for clients of MSPs to ask before they sign a contract. 

As always, the problem here is that if the client doesn't have the technical competence to judge the answers, having better questions won't help. (It's far too easy to bullshit your way to victory in the security industry.)

### NotPetya, cyber insurance, and war exclusion clauses

We've covered the NotPetya attack [many times previously](https://www.google.com/search?q=site%3Amarkeldo.com+notpetya), but recall [this email in particular](https://markeldo.com/Email-update-NotPetya-attribution-cyber-insurance-and-inoculating-networks/) from last February:

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