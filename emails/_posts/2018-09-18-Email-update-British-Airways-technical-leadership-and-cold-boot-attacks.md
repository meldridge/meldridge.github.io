---
layout: email
title: British Airways, technical leadership, and cold boot attacks
---

Good morning.

Last week I attended the [SEC-T security conference](https://www.sec-t.org/) in Stockholm, and my employer was generous enough to send me to the "[Dark Side Ops](https://www.sec-t.org/trainings/dark-side-ops-custom-penetration-testing-workshop/)" penetration testing workshop run by the guys from Silent Break Security in the U.S.

The name is a bit corny, but the course itself was excellent. It uses the [Throwback and SlingShot](https://silentbreaksecurity.com/throwback-thursday-a-guide-to-configuring-throwback/) malware implants as a basis to teach students covert command & control methods, persistence, and how to add additional features.

It's a lot of content for two days, and it helps to have a development background, but I'd highly recommend it for anyone working in offensive security, or in a blue team with sophisticated threats.

### British Airways gets Ticketmaster'd

[Yet another supply-chain attack](https://markeldo.com/Email-update-The-Mueller-Indictments-NPM-Arch-Gentoo-and-Ticketmaster-UK/) against a major website. 

From [Ars Technica](https://arstechnica.com/information-technology/2018/09/british-airways-site-had-credit-card-skimming-code-injected/):

>As many as 38,000 British Airways customers may have had their contact and financial information stolen in the breach, which evidence suggests was the result of malicious JavaScript code planted within British Airway's website.
>
>According to a report by RiskIQ's Head Researcher Yonathan Klijnsma published Tuesday, RiskIQ detected the use of a script associated with a "threat group" RiskIQ calls Magecart. the same set of actors believed to be behind a recent credit card breach at Ticketmaster UK. While the Ticketmaster UK breach was the result of JavaScript being injected through a third-party service used by the Ticketmaster website, the British Airways breach was actually the result of a compromise of BA's own Web server, according to the RiskIQ analysis.

This is going to get worse before it gets better.

### Technical projects need technical leaders

I had to read this one a few times, because it fit my confirmation bias a little _too_ well.

From [The Conversation](http://theconversation.com/lack-of-technical-knowledge-in-leadership-is-a-key-reason-why-so-many-it-projects-fail-101889):

>We examined previous research alongside a case study of a large-scale public sector IT project failure. Reports on the project and documents obtained through freedom of information requests created a rich pool of data that allowed us to examine the life of the project as it unfolded over many years.
>
>One of our main findings was underpinned by the idea that leaders require more than a passing familiarity with the technical skills required to do the job if they are to identify competence in those carrying out the work. Without this, the projects have a poor chance of success.
>
>Technological competence needs to be specific, not generalised. The most senior executive with day-to-day accountability for the project, and who has a direct and material impact on project outcomes, must have experience with, and knowledge of, the technology being developed.
>
>An inexperienced project leader will be incapable of comprehending the advice being provided if they lack the specific experience in the technical domain being managed. That means that it’s not sufficient to surround an inexperienced manager with experts upon whom they would theoretically turn to for advice.

Yep. It's not enough to have a non-technical project manager with technical advisors—the person making the decisions needs to have the technical competence to weigh all of the options properly. 

In other words: if they're entirely reliant on their more technical advisors to make project decisions, what value are they adding?

Once again, this is going to get worse before it gets better. There are very few large projects which don't include a significant IT component (even non-IT projects are delivered using IT), and good managers with technical skills are hard to find.

I recently had a fairly candid discussion with a senior Swedish executive, who commented that they might be the last generation of executives who can get away without having a technical background. 

As I said, I have an obvious bias, but I think there's something to this. These days, _every_ large company is a tech company—it's just a question of degree.

### F-Secure demonstrates new cold boot mitigation bypass

One of the _cooler_ SEC-T talks (sorry) was by Olle Segerdahl and Pasi Saarinen from F-Secure. They introduced a new way to bypass modern protections against [cold boot attacks](https://en.wikipedia.org/wiki/Cold_boot_attack), allowing them to decrypt a laptop using full-disk encryption such as BitLocker if they were able to obtain the laptop while it was in sleep mode.

A cold boot attack relies upon two things:
1. While running, the operating system stores sensitive information (such as drive encyption keys) in physical memory.
2. Memory is usually wiped when it loses power, but can store its contents for a short time - especially if you cool it down.

If you're quick enough, you can power off a laptop while the keys are still in memory, and then either remove the memory entirely or boot back into a different operating system to extract the keys before they're erased.

If you're interested in the details, it's worth reading the [original paper](https://citp.princeton.edu/research/memory/) by Halderman et. al. back in 2008 which described cold boot attacks in detail. This paper prompted the modern BIOS/EFI protections which Segerdahl and Saarinen bypassed in their talk.

The full SEC-T presentation is available [here](https://www.youtube.com/watch?v=RqvPZnLkP70), and it's worth a watch if only for the physical demonstration of the attack (~16 minutes in). On the scale of _"gutsy things to demo in front of a live audience"_, this is right up there.