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

>Australian public companies are investing in very large information systems projects and many of these are at risk. When these projects fail it can have a direct material impact on a company and its share price. And when projects are delivered with less than the required functionality, or at an inflated price, they negatively impact upon the performance and effectiveness of those businesses.
>
>Effective oversight requires competence and experience. This means that the boards need some measure of IT knowledge if they expect to provide effective governance, risk management and strategic oversight of IT projects.

I recently had a fairly candid discussion with a senior Swedish executive, who commented that they might be the last generation of executives who can get away without having a technical background. 

As I said, I have an obvious bias, but I think there's something to this. These days, _every_ large company is a tech company—it's just a question of degree.

### F-Secure demonstrates new cold boot mitigation bypass

One of the _cooler_ SEC-T talks (sorry) was by Olle Segerdahl and Pasi Saarinen from F-Secure. They introduced a new way to bypass modern protections against [cold boot attacks](https://en.wikipedia.org/wiki/Cold_boot_attack), allowing them to decrypt a laptop using full-disk encryption such as BitLocker if they were able to obtain the laptop while it was in sleep mode.

A cold boot attack relies upon two things:
1) While running, the operating system stores sensitive information (such as drive encyption keys) in physical memory.
2) Memory is usually wiped when it loses power, but can store its contents for a short time - especially if you cool it down.

If you're interested in the details, it's worth reading the [original paper](https://citp.princeton.edu/research/memory/) by Halderman et. al. back in 2008 which described cold boot attacks in detail. This paper prompted the modern BIOS/EFI protections which Segerdahl and Saarinen bypassed in their talk.

The full SEC-T presentation is available [here](https://www.youtube.com/watch?v=RqvPZnLkP70), and it's worth a watch if only for the physical demonstration of the attack (~16 minutes in). On the scale of _"gutsy things to demo in front of a live audience"_, this is right up there.