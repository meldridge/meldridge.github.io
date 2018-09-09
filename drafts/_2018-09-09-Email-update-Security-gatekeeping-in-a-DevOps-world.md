---
layout: email
title: Security gatekeeping in a DevOps world
---

Good morning.

It's been a while since I last recommended a book, and today's is very topical.

### Zane Lackey and Secure DevOps

[Building a Modern Security Program](https://www.safaribooksonline.com/library/view/building-a-modern/9781492044680/ch01.html) is co-written by Zane Lackey and Rebecca Huehls, and describes the lessons learned by Lackey during his time as the CISO for Etsy:

>During the early days of the shift away from Waterfall development, I was incredibly fortunate to be in the position of building the security team at Etsy while it was one of the first companies pioneering DevOps. At the time, for most companies, production application changes were typically made every 6 to 18 months. However, as I learned on my first day as head of security, Etsy was making production code deployments 20 times per day and rising. As you can imagine—and I had to learn the hard way—most of the classic approaches to security simply weren’t going to survive in this environment.

Zane Lackey has been discussing this topic for quite a while, notably in a [Duo Tech Talk](https://www.youtube.com/watch?v=scQyykJwTsQ) back in 2014, as well in a [Security Conversations podcast](https://overcast.fm/+NvEIQ62xg) in April of this year.

While stressing over the rapid pace of deployments at Etsy, Lackey had a lightbulb moment:

>After an embarrassingly long time, I realized this fundamental truth: No matter which development methodology you have, vulnerabilities occur in all of them. _But, with its focus on allowing frequent deployments to production, only DevOps gives you the speed to react to those vulnerabilities faster than your attackers._

The methodology of release and rapid iteration was developed to make it easier for software projects to react to what customers really wanted, because often they don't _know_ what they want until they have something in front of them. This applies just as much to security flaws as it does to anything else: unless you have a tiny codebase or the world's best security team, you simply can't cover every possible flaw in testing.

During the podcast episode, Lackey also discusses the importance of making the rest of the organisation *security self-sufficient*, and the role of a modern CSO:

>_**"Enable the rest of the business to own their own security."**_

The status quo for security teams is to play whack-a-mole. There's a constant grind to maintain patches and keep ahead of the latest vulnerabilities and misconfigurations, a task made much more difficult when you're also the final hurdle for any new product release. There's immense pressure to wave new releases through by other areas of the business, and at the end of the day, you're a cost centre.

In a modern DevOps environment, this works very differently: the development teams are in control of their own deployments, which includes the security of those systems. When deployments happen several times daily, this scales far better than the historical practice of security acting as a gatekeeper to production. 

There's an obvious catch to this: your development teams need the skills and tools to do this properly. 

This is harder than it sounds (good developers with security skills are sadly still quite rare) but you can get a long way with some basic training. To paraphrase [Robert Chesney](https://markeldo.com/Email-update-Technical-literacy-vs-fluency-blockchain-and-OSCP-proctoring/): you need developers who are security *literate*, but not necessarily *fluent*. 

Good developers don't want their stuff hacked any more than the business does. They want to write more secure code, they just need to know where to look. All of this means that the job of the security team becomes advising and educating, not gatekeeping.

Note, however...

### Sometimes, you only get to deploy once

Given my background, it'd be remiss of me not to point something which is often missed in these discussions: not every software project can or should use modern DevOps approaches. Sometimes the cost of mistakes is extremely high (failures might be life-threatening), or the cost of pushing a bug fix to production is prohibitive. Often, you get both.

At this point the word 'Agile' has become a corporate buzzword and bastardised to the point of meaninglessness. In the context of software, it was popularised by [the Agile Manifesto](http://agilemanifesto.org/) back in 2001, which was itself a reaction to the software development methodologies in common use at the time: primarily the [waterfall model](https://en.wikipedia.org/wiki/Waterfall_model), which had been copy-pasted from other engineering fields (such as building bridges) where late changes were highly expensive if not impossible, and was wholly unsuited to a world where changes were cheap even after the product had been delivered.

The key benefit of a DevOps approach to software delivery is that you can deploy rapidly and iterate, which lends itself extremely well to most of the consumer software we use every day. 

It works much less well on a satellite or an interstellar probe—you can't deploy 20 times a day if your deployment time is measured in hours, and it's hard to speed up the laws of physics.

in these sorts of situations, the sorts of development approaches we've been discussing—code fast, deploy fast, fix fast—just aren't possible. 

This doesn't mean you can't do DevOps, if by that term you simply mean developers having ownership of their deployments.