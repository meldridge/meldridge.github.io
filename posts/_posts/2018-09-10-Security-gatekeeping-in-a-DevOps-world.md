---
layout: post
title: Security gatekeeping in a DevOps world
redirect_from: "/Email-update-Security-gatekeeping-in-a-DevOps-world/"
image: "https://markeldo.com/images/security-gatekeeping.jpg"
excerpt: In a modern DevOps environment, development teams manage the security of their own systems. In an environment where deployments happen several times a day, this model scales far better than the historical practice of security acting as a gatekeeper to production. 
---

It's been a while since I last recommended a book, and today's is very topical.

### Zane Lackey and Secure DevOps

The book [Building a Modern Security Program](https://www.safaribooksonline.com/library/view/building-a-modern/9781492044680/ch01.html) is co-written by Zane Lackey and Rebecca Huehls, and describes the lessons learned by Lackey during his time as the CISO for Etsy:

>During the early days of the shift away from Waterfall development, I was incredibly fortunate to be in the position of building the security team at Etsy while it was one of the first companies pioneering DevOps. At the time, for most companies, production application changes were typically made every 6 to 18 months. However, as I learned on my first day as head of security, Etsy was making production code deployments 20 times per day and rising. As you can imagine—and I had to learn the hard way—most of the classic approaches to security simply weren’t going to survive in this environment.

Zane Lackey has been discussing this topic for quite a while, notably in a [Duo Tech Talk](https://www.youtube.com/watch?v=scQyykJwTsQ) back in 2014, as well in a [Security Conversations podcast](https://overcast.fm/+NvEIQ62xg) in April of this year.

As Lackey notes, the definition of 'DevOps' is rubbery (_"ask 10 people, get 11 answers"_), but in general use it tends to mean two things: 
1. Developers having direct access to production infrastructure, and
2. Rapid deployments of new software builds to production, sometimes dozens of times each day. 

This second component is related to the [Agile software development methodology](https://en.wikipedia.org/wiki/Agile_software_development) which sprang up in the early 2000's. At this point the word 'Agile' has become a corporate buzzword and bastardised to the point of meaninglessness, but in the context of software development it was popularised by the [Agile Manifesto](http://agilemanifesto.org/) back in 2001. The manifesto was itself a reaction to the methodologies in common use at the time: primarily the [waterfall model](https://en.wikipedia.org/wiki/Waterfall_model).

The waterfall model had been copy-pasted from other fields like civil engineering, where  changes to a design were highly expensive if not impossible (like building bridges), and was wholly unsuited to a world where changes were cheap even after the product had been delivered (like consumer software).

While stressing over the shift to DevOps and the rapid pace of production deployments at Etsy, which made his role as a security gatekeeper particularly difficult, Lackey had a lightbulb moment:

>After an embarrassingly long time, I realized this fundamental truth: No matter which development methodology you have, vulnerabilities occur in all of them. _But, with its focus on allowing frequent deployments to production, only DevOps gives you the speed to react to those vulnerabilities faster than your attackers._

The methodology of release and rapid iteration was developed to make it easier for software projects to react to what customers really wanted, because often they don't _know_ what they want until they have something in front of them. 

This applies just as much to security flaws as it does to anything else: unless you have a tiny codebase or the world's best security team, you simply can't cover every possible flaw in testing. 

If you're deploying multiple times each day, this at least gives you the _agility_ (sorry) to fix flaws when they're found, without waiting several weeks for your next deployment or delivering an out-of-band patch.

### Security as an enabler... for others to fix their own stuff

During the [podcast episode](https://overcast.fm/+NvEIQ62xg), Lackey also discusses the importance of making the rest of the organisation *security self-sufficient*, and the role of a modern CSO:

>_**"Enable the rest of the business to own their own security."**_

The status quo for security teams is to play whack-a-mole. There's a constant grind to maintain patches and keep ahead of the latest vulnerabilities and misconfigurations, a task made much more difficult when you're also the final hurdle for any new product release. There can be immense pressure to wave new releases through by other areas of the business, and at the end of the day, you're a cost centre.

In a modern DevOps environment, this works very differently: the development teams are in control of their own deployments, which includes the security of those systems. In an environment where deployments happen several times a day, this model scales far better than the historical practice of security acting as a gatekeeper to production. 

There's an obvious catch to this: your development teams need the skills and tools to secure things properly. This is easier said than done—good developers with security skills are sadly still quite rare.

Even so, you can get a long way with some basic training. To paraphrase [Robert Chesney](https://markeldo.com/Email-update-Technical-literacy-vs-fluency-blockchain-and-OSCP-proctoring/): you need developers who are security *literate*, but not necessarily *fluent*. 

Good developers don't want their stuff hacked any more than the security team does. They want to write more secure code, they just need to know where to look, and what sort of attacks they should be expecting. And this means that the job of the security team becomes advising and educating, not gatekeeping.

However...

### Sometimes, you only get to deploy once

Given my background, it'd be remiss of me not to point something which is often missed in these discussions: not every software project can or should use modern DevOps approaches. 

Sometimes the cost of software flaws is extremely high (failures might be life-threatening), or the cost of pushing a bug fix to production is prohibitive. Often, both are true.

The key benefit of DevOps is that you can deploy rapidly and iterate even after release, which lends itself extremely well to most of the consumer software we use every day. Software bugs happen, but if someone messes up a deployment and Netflix goes down, no one dies as a result.

This approach is much less appealing for mission-critical software, such as when writing the code for a satellite or an interstellar probe. A software bug might be [catastrophic to the mission](https://en.wikipedia.org/wiki/Mars_Climate_Orbiter), and it's hard to debug a problem and quickly push a new deployment when network communications have a round-trip-time measured in [tens of minutes](http://blogs.esa.int/mex/2012/08/05/time-delay-between-mars-and-earth/). 

For this sort of project,  ["move fast and break things"](https://www.brainyquote.com/quotes/mark_zuckerberg_453439) is _extremely_ literal.

Overall, DevOps is a great methodology for shipping  consumer software, but it's important to remember that not all software is consumer software.  Sometimes, you'll still need the gatekeeper.