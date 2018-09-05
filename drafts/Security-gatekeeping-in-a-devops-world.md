---
layout: post
title: Security Gatekeeping in a DevOps world
image: ""
---

[Building a Modern Security Program](https://www.safaribooksonline.com/library/view/building-a-modern/9781492044680/ch01.html) is co-written by Zane Lackey and Rebecca Huehls, and describes the lessons learned by Lackey during his time as the CISO for Etsy:

>During the early days of the shift away from Waterfall development, I was incredibly fortunate to be in the position of building the security team at Etsy while it was one of the first companies pioneering DevOps. At the time, for most companies, production application changes were typically made every 6 to 18 months. However, as I learned on my first day as head of security, Etsy was making production code deployments 20 times per day and rising. As you can imagine—and I had to learn the hard way—most of the classic approaches to security simply weren’t going to survive in this environment.

The intro is worth reading in full (and features a very well placed cat picture).

Zane Lackey has been discussing this topic for quite a while, notably in a [Duo Tech Talk](https://www.youtube.com/watch?v=scQyykJwTsQ) back in 2014, as well in a [Security Conversations podcast](https://overcast.fm/+NvEIQ62xg) in April of this year. (If you don't have time for the book, I'd highly recommend the podcast episode - it's well worth the time.)

One of my favourite points is when he discusses the importance of making the rest of the organisation *security self-sufficient*:

>You've gotta really focus on: what are the things that you can direct your efforts to that start to **enable the rest of the business to own their own security**.

He goes on to describe the familiar feeling of "whack-a-mole" for security teams: the constant grind to maintain patches and keep ahead of the latest vulnerabilities and misconfigurations.

In a modern DevOps environment, this is flipped on its head: the development teams are in control of their own deployments, which can and should include the security of those systems. In a modern enterprise setting, this is unquestionably an improvement over the status quo of security acting as a gatekeeper to production. 

There's an obvious catch to this: your development teams need the skills and tools to do this properly. This means the responsibility of the security team shifts to advising and educating, not gatekeeping.

## The limitations of DevOps

Given my background, it'd be remiss of me not to point something which is often missed in these discussions: *not everything can be DevOps'd*. 

At this point the word 'Agile' has become a corporate buzzword and bastardised to the point of meaninglessness. In the context of software, it was popularised by [the Agile Manifesto](http://agilemanifesto.org/) back in 2001, which was itself a reaction to the software development methodologies in common use at the time: primarily the [waterfall model](https://en.wikipedia.org/wiki/Waterfall_model), which had been copy-pasted from other engineering fields (such as building bridges) where late changes were highly expensive if not impossible, and was wholly unsuited to a world where changes were cheap even after the product had been delivered.

The key benefit of a DevOps approach to software delivery is that you can deploy rapidly and iterate, which lends itself extremely well to most of the consumer software we use every day. 

It works much less well on a satellite or an interstellar probe—you can't deploy 20 times a day if your deployment time is measured in hours, and it's hard to speed up the laws of physics.