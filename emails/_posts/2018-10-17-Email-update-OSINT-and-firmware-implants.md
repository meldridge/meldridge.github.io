---
layout: email
title: OSINT and firmware implants
---

Good morning.

Before we get into the news, something worth bookmarking: [this site](https://tls.ulfheim.net/) provides a visualisation of every byte of a connection using Transport Layer Security (TLS). This is what happens under the hood whenever you connect to a website over HTTPS, which these days is probably the majority of sites you visit.

### Facebook follow-up

Some more details on the [Facebook breach story](https://markeldo.com/Facebook-and-the-trade-off-of-centralised-authentication/) from last month. Facebook has published [this update](https://newsroom.fb.com/news/2018/10/update-on-security-issue/), which provides another good summary of what happened:

>The attackers exploited a vulnerability in Facebook’s code that existed between July 2017 and September 2018. The vulnerability was the result of a complex interaction of three distinct software bugs and it impacted “View As,” a feature that lets people see what their own profile looks like to someone else. It allowed attackers to steal Facebook access tokens, which they could then use to take over people’s accounts. Access tokens are the equivalent of digital keys that keep people logged in to Facebook so they don’t need to re-enter their password every time they use the app.

The rest of the post goes into detail about what the attackers actually accessed: only 30 million accounts, not the 50 million which was originally reported, and no accounts on third-party services. This could have been far worse.

### OSINT and the importance of reconnaissance

Christopher Maddalena from SpecterOps has published an excellent blog post on [the use of open source intelligence](https://posts.specterops.io/gathering-open-source-intelligence-bee58de48e05):

>One constant throughout my career has been my fascination with what can be learned about an organization from basic public records. The aggregation of a multitude of small pieces of information can paint a picture that is sometimes startling in its completeness. Then some holes can be filled-in with small logical leaps and inferences.
>
>This always interested me as an defender because I wanted to know what an outsider could learn without ever touching infrastructure or engaging an insider. Now, I am most often looking to make use of this sort of data to prepare a collection of insider knowledge that I might use as a foundation for social engineering or, once inside the network, to better understand the network in which I am operating.

There is a *lot* of information which can be obtained about a target organisation without sending a single packet to their infrastructure. Username format, email addresses, the sort of software used internally, [passwords from previous data breaches](https://haveibeenpwned.com/), old mothballed servers on [forgotten subdomains](https://www.bugcrowd.com/discovering-subdomains/), sensitive documents which have accidentally been [indexed by Google](https://www.v3.co.uk/v3-uk/news/3007452/microsoft-office-365-documents-leaked-onto-google-and-bing-over-users-misunderstanding-of-document-sharing) or [uploaded to other services](https://support.virustotal.com/hc/en-us/articles/115002093689-I-accidentally-uploaded-a-file-with-confidential-or-sensitive-information-to-VirusTotal-can-you-please-delete-it-), etc etc.

People are often surprised to see just how easy this is, and it's an important lesson: your security should never depend on things such as email addresses or usernames being hidden from attackers, and if you rely on single-factor authentication like a password, there's a good chance at least some of your employees have used the same password (or a minor variant) on [LinkedIn](https://www.troyhunt.com/observations-and-thoughts-on-the-linkedin-data-breach/).

This sort of reconnaissance work is also what separates opportunistic attacks from targeted ones: if someone is intent on getting into your network, they're likely to end up knowing more about the dark corners of your IT environment than your sysadmins do.

Maddalena has open-sourced a tool called [ODIN](https://github.com/chrismaddalena/ODIN) which automates a lot of these intelligence gathering techniques and also presents the results in a nice Neo4j graph for visualisation. If you're a red-teamer it'll be invaluable on engagements, and if you're a blue-teamer it's very likely to help you with your asset discovery efforts!

### Fancy Bear re-uses commercial tool for firmware implants

This is another big story which was unfortunately lost in all of the Facebook and Supermicro news over the past few weeks.

The story is courtesy of [ESET Research](https://www.welivesecurity.com/2018/09/27/lojax-first-uefi-rootkit-found-wild-courtesy-sednit-group/), and Wired has a good summary [here](https://www.wired.com/story/fancy-bear-hackers-uefi-rootkit/?mbid=social_twitter):

>If “LoJax” sounds vaguely familiar, it’s because you might recall LoJack—formerly known as Computrace—security software that lets you track your laptop in the event of theft. LoJack turns out to be potent stuff. It sits in a computer’s firmware, making regular calls back to a server to announce its location. Crucially, that also means you can’t get rid of it by reinstalling your operating system or swapping in a new hard drive.
>
>That’s an intentional security feature: If someone steals your computer, you want to make it as hard as possible for them to evade detection. But it also presents a unique opportunity to bad actors, as outlined in a 2016 presentation at a security conference called Zero Nights, and again in more detail this May by researchers at security firm NetScout. Essentially, Fancy Bear figured out how to manipulate code from a decade-old version of LoJack to get it to call back not to the intended server, but one manned instead by Russian spies. That’s LoJax. And it’s a devil to get rid of.

When it comes to [persistence mechanisms](https://attack.mitre.org/wiki/Persistence), this is the gold standard. The firmware of a laptop or desktop sits in a trusted position with respect to the operating system: if you compromise the firmware, you can inject your malware into the operating system whenever it boots, and because you're sitting below the OS, you can survive a reinstall of the OS and even complete replacement of the hard drive.

It's worth pointing out that Anibal Sacco and Alfredo Ortega presented on exactly this topic (UEFI rootkits generally, and LoJack/Computrace specifically) [way back in 2009](https://twitter.com/ortegaalfredo/status/1045449915827212290), and their presentation is worth a look (slides [here](https://www.blackhat.com/presentations/bh-usa-09/ORTEGA/BHUSA09-Ortega-DeactivateRootkit-SLIDES.pdf), paper [here](https://www.blackhat.com/presentations/bh-usa-09/ORTEGA/BHUSA09-Ortega-DeactivateRootkit-PAPER.pdf)).
