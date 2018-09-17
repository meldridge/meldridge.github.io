---
layout: post
title: My Health Record and trust in government
image: 
excerpt: 
---

https://twitter.com/philkernick/status/1030722007518695424

“Concerns were raised about the logging of organisations that have accessed people’s My Health Records rather than the individuals who have done so, with the ADHA advising that people can contact the agency or the organisation listed in the audit log to help determine the source of any activity.

“We understand the challenges to consumers around monitoring access by organisation rather than individual healthcare providers. If a consumer has a concern with information provided in their record’s audit log, they can contact the System Operator or the organisation directly to understand who has accessed their record,” the ADHA said.”

Exclusive: Leaked ADHA document shows the agency grappling with My Health Record concerns
https://www.healthcareit.com.au/article/exclusive-leaked-adha-document-shows-agency-grappling-my-health-record-concerns
via Instapaper

http://www.abc.net.au/news/health/2018-08-21/lax-hospital-security-culture-could-undermine-my-health-record/10128274

**mention breach fatigue**

This story has been major news in Australia for the last few weeks, ever since the [opt-out period started](https://www.computerworld.com.au/article/643821/my-health-record-opt-out-window-opens/) on July 16.

I'll avoid going into too much detail here, but to briefly summarise: the My Health Record system is a major Australian Government IT project which aims to consolidate every citizen's healthcare information into an electronic record which can be accessed by any healthcare provider they might use.

It's a great idea in principle, and many countries already have similar systems. In Sweden for example, all of my healthcare information is linked to my government-issued *personnummer*, which means I can pick up any prescription simply by showing my ID at the pharmacist. It's extremely convenient - no more printed scripts! 

Similarly, 

The problem is that good ideas don't always translate into good implementations. In [previous](/Email-update-Australian-Digital-Government-Report-and-myGovID/) [emails](/Email-update-CentrelinkFail-and-IBM-wins-billion-dollar-contract/) I've touched on the long history of Australian Government IT failures:

>Part of the problem is that the repeated failure of large government IT projects has made the Australian public extremely jaded when it comes to what might otherwise be understandable technical outages, and the government doesn’t do itself any favours by creating situations where website downtime can have large real-world financial consequences.
>
>This tendency to tar all systems with the same brush was something I noted in the survey results for my [Master’s thesis](/docs/Thesis-Final.pdf): when describing their concerns about the security of electronic voting systems, a large number of respondents specifically called out the failure of the 2016 eCensus as evidence that the Australian government couldn’t operate an online voting system securely.
>
>People can have long memories when tech fails them, and annoyance can quickly turn to contempt. It doesn’t take much to shift an attitude from “this government IT system sucks” to “the government sucks at IT systems”.


"Security is only as good as your weakest link," said Alexandra Wedutenko, a partner at law firm Clayton Utz.

"Even if the Commonwealth department that looks after My Health Record is locked down to the nth degree, and it probably is, a GP in any GP office throughout Australia can access that data and do whatever they want with it."

My Health Record: Canberra is still missing the point | ZDNet
https://www.zdnet.com/article/my-health-record-canberra-is-still-missing-the-point/

https://www.afr.com/technology/why-my-health-record-cant-have-militarygrade-security-20180720-h12xi7

Another good summary.

“The Australian government has lost the public's trust when it comes to protecting their data. That trust needs to be earned back.”

Yep. In theory I love the idea behind MyHealthRecord, but the track record of the Australian government delivering systems like this is... well, woeful. If they were a vendor selling a product, you definitely would not want to be an early adopter.

A few commentators have argued that this system is no worse than the existing practice of records sitting in a local GP clinic. This criticism is correct in one sense (GP clinics typically aren’t amazing at cyber security) but this is also completely missing the point.

Under the new system, a huge number of medical centres around the country—including your GP clinic—have access to your MyHealthRecord data. They’re the gatekeepers, and if they go rogue or get compromised, your data is gone. So if you’re worried about your GP’s cyber security maturity (and you should be), MyHealthRecord makes this an even bigger risk.

Most importantly, remember that personal data like your medical history isn’t like stealing credit card numbers. Credit cards can be changed, passwords can be reset, and even if money is stolen, it’s usually covered by the Bank in question. None of this is true of the data stored in MyHealthRecord.

Doing this stuff right is bloody hard, and there’s no take-backsies if you lose personal information like your medical history.

### Links

>One of the most devastating and under-discussed flaws in the scheme is that it opens access to health data to a slew of parties beyond primary care providers. To understand this, it is important to know something about the scheme’s principal proponent, Tim Kelsey, who led a remarkably similar initiative in England, care.data, which collapsed spectacularly for failing to bring along the public, destroyed institutional trust, and was subject to a series of damning independent reviews.

There is no social license for My Health Record. Australians should reject it | Julia Powles
http://www.theguardian.com/commentisfree/2018/jul/20/there-is-no-social-license-for-my-health-record-australians-should-reject-it
via Instapaper

https://www.zdnet.com/article/my-health-record-opt-out-debate-is-getting-silly-but-government-is-at-fault/
https://www.canberratimes.com.au/politics/act/bungled-my-health-record-launch-represents-a-missed-opportunity-20180718-p4zs6z.html
https://mobile.twitter.com/paul_shetler/status/1020139903768657920
https://mobile.twitter.com/DrCassCross/status/1019429997734342656
https://mobile.twitter.com/carlfish/status/1018809833259036673
https://mobile.twitter.com/abcnews/status/1019911246903066624
https://mobile.twitter.com/Epigrammist/status/1019451711155367936
https://mobile.twitter.com/alliecoyne/status/1018660419576066048
http://theconversation.com/my-health-record-the-case-for-opting-out-99302
https://yarwood.id.au/myhr-digest

### SingHealth Hacked

Personal info of 1.5m SingHealth patients, including PM Lee, stolen in Singapore's most serious cyber attack
https://www.straitstimes.com/singapore/personal-info-of-15m-singhealth-patients-including-pm-lee-stolen-in-singapores-most

Time for some examination of what “sophisticated” means in an offensive cyber security context.

First they say this:

>Mr David Koh, chief executive of the Cyber Security Agency of Singapore, said that “this was a deliberate, targeted and well-planned cyber attack”.
>
> “It was not the work of casual hackers or criminal gangs,” he added.”

Then this:

>Initial investigations showed that one SingHealth front-end workstation was infected with malware through which the hackers gained access to the data base. The data theft happened between June 27, 2018 and July 4, 2018. 
>
>SingHealth has imposed a temporary Internet surfing separation on all of its 28,000 staff's work computers. Other public healthcare institutions will do the same.

So the initial vector was through a compromised workstation which could browse the web and also had access to the SingHealth database.

Let’s be clear about this: the attackers MIGHT have been sophisticated, but with a network designed like this, they didn’t need to be. If I can pop one of your workstations with a phishing email or a drive-by browser exploit/download, and then use this access to pull out 1.5 million records without being detected and stopped, that’s not a sophisticated attack. That’s well within the capability of a casual hacker, let alone a criminal gang.

### Health providers’ security flaws will leave My Health Record open for hacking | The Strategist

“In addition to hospitals and large health providers, a range of small providers will be able to access My Health Record. These include not only general practitioners and medical specialists, but also allied health professionals such as physiotherapists, speech pathologists, osteopaths, optometrists and dentists, who can also register to access My Health Record. There are many thousands of these small health providers across Australia and most are small clinics with only a handful of staff.

What this amounts to is an attack surface comprising hundreds of thousands of endpoints, most of which have a level of cybersecurity that is virtually non-existent. This is further compounded by staff who have little or no cybersecurity awareness. As an IT service provider with over 14 years’ experience working exclusively with small businesses, including small health providers, I believe these organisations are ill-equipped to provide an acceptable level of security. .....

“My Health Record will put vast amounts of confidential health data into a single online database, and no matter how well the central repository itself is protected, it can only ever be as secure as the weakest link. With thousands of small health providers that have only minimal cybersecurity arrangements accessing My Health Record, it has the potential to leak like the proverbial sieve.”

Health providers’ security flaws will leave My Health Record open for hacking | The Strategist
https://www.aspistrategist.org.au/health-providers-security-flaws-will-leave-my-health-record-open-for-hacking/
via Instapaper