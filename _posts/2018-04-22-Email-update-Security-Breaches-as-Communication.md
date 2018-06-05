---
layout: email
title: Security breaches as communication
---

It's been a very long time since my last email, and I apologise - it's been a rough couple of months north of the wall!

In some excellent work news, I've officially commenced fortnightly "learn how to hack" sessions at Qliro for our developers and other employees. We've started with the [OverTheWire.org Bandit](http://overthewire.org/wargames/bandit/) wargame, and soon we'll be progressing to some basic Metasploit usage and hacking vulnerable Windows systems. It's a lot of fun, and the sessions are easily the best part of my week. (If you're interested in joining us, [we're hiring](https://emp.jobylon.com/jobs/20067-qliro-ab-it-security-specialist-offensive/).)

Spring has officially sprung in Stockholm, and we've had a balmy week of weather over 20C (!). It really is beautiful here in spring, and everyone seems to actively seek out the sun rather than avoiding it like the plague. As a very pale half-Scot who used to burn in Adelaide sun if I took too long walking to my car, I find this bizzare, but well, when in Rome...

### Security Breaches as Communication

This article from the UK National Cyber Security Centre was written way back in 2016, but it's still well worth having a read if you haven't already seen it:

[**Security breaches as communication: what are your users telling you?**](https://www.ncsc.gov.uk/blog-post/security-breaches-communication-what-are-your-users-telling-you)

>“Amy has her passwords written on a post-it note under her keyboard.
>
>Brian keeps backups of important data on his personal pen drive.
>
>Claire let David use her account – just for five minutes – while she went to make a cup of tea.
>
>Stories like this are commonplace in every large organisation, and lead to the popular refrain that 'people are the weakest link' in cyber security. But users aren't breaking the rules because they're bad people, or because they want to annoy their managers, or make life difficult for security staff. They know full well that they're breaking the rules, and they usually feel bad about it. But in the vast majority of cases, people break the rules because they need to get the job done, and they're taking what seems at the time like the best option available to them.”

This is particularly relevant given last year's news that UK Members of Parliament [share their login passwords with their staff](http://www.bbc.co.uk/news/uk-politics-42216622), a revelation which led to lots of hand wringing and gnashing of teeth by security experts.

To be clear, this *is* stupid, and the MPs should know better given the sort of information they have access to, but it's hard to change people's behaviour via ridicule - something which a large part of our industry has yet to learn.

As the NCSC argues, the best security improvements come from **making good practice convenient**. This means tools like password managers, automated backups, single-sign-on, and multi-factor authentication which isn't a pain to use. It's not always easy, but solving this is what we get paid for.

### The Specter Ops Adversary Resilience Methodology

This pair of articles was released by the [SpecterOps](https://specterops.io/) team back in February. They didn't seem to make a big splash at the time, but they're absolutely essential reads for anyone involved in modern enterprise security (read: Microsoft Active Directory networks).

[**Introducing the Adversary Resilience Methodology — Part One**](https://posts.specterops.io/introducing-the-adversary-resilience-methodology-part-one-e38e06ffd604)

>Over time, every Active Directory environment becomes an unwieldy, complex web of user rights, permissions, and behaviors. Adversaries (be they penetration testers, red teamers, or real attackers) commonly exploit that complexity, using accounts with permissions that defenders never meant to give them, or did not realize they had.
>
>[John Lambert](https://twitter.com/JohnLaTwC) has a fantastic blog post titled, [“Defenders think in lists. Attackers think in graphs. As long as this is true, attackers win.”](https://blogs.technet.microsoft.com/johnla/2015/04/26/defenders-think-in-lists-attackers-think-in-graphs-as-long-as-this-is-true-attackers-win/) In his blog post, he advises the reader to learn how to recognize “list-based” thinking. The fatal flaw of list-based thinking, of course, is in not recognizing the connections between seemingly discrete systems. “My list of Domain Admin users,” says the list-based thinker, “only log onto this list of computers; therefore, if those computers are secure, so are the Domain Admins.” Use BloodHound, and you’ll quickly see the fallibility of the list-based mindset.
>
>Many enterprises find themselves trapped in a seemingly inescapable loop of purely reactionary security remediation. Any organization that gets hacked, whether by a pentest firm that had permission or by a real attacker, will have the same question: how? Then either by reading the pentester’s report, or after performing a lengthy and thorough (read: expensive) investigation, the organization will obtain a breach narrative which describes the step-by-step actions the attackers took to complete their objective.

The team also presented a [webinar](https://www.brighttalk.com/webcast/15713/301931/how-to-build-adversary-resilience-into-your-active-directory-environment) which is worth watching in conjunction with the blog post. 

I've jokingly referred to Specter Ops in the past as the *"Hacker Avengers"*, and it's for good reason: they managed to hire some of the best security people in the industry (both offensive and defensive), and their blog posts are a goldmine of information.

The guys behind this post are also the ones who developed the [BloodHound](https://github.com/BloodHoundAD/BloodHound) tool for auditing Active Directory networks. If you're not familiar with BloodHound, I'd recommend starting with the presentation where it was released: [*DEF CON 24 - Six Degrees of Domain Admin*](https://www.youtube.com/watch?v=wP8ZCczC1OU&feature=youtu.be&t=2).

At Qliro I've been using BloodHound internally from a defensive perspective: to map out group memberships and domain trust relationships. It's an excellent tool both for finding problems and communicating them (and was recently given a [major update](https://wald0.com/?p=112)), and should be in the toolkit of anyone who works with Active Directory on a regular basis.