---
layout: email
title: Cyber Operators, scoping penetration tests, and balancing Security with Productivity
---

Today's catfact starts with another great article by the grugq, listing the various types of "cyber operators" seen in the wild, and the differences between them:

[**Cyber Operators — Differences Matter**](https://medium.com/@thegrugq/cyber-operators-differences-matter-7cfba2ddb9a6)

>Penetration testers typically don’t aim for high levels of covertness, though they’re seldom detected by the Silver Bullet Boxes, or the SIEM, and they consistently refuse to use tools that should be detected by the “Tres Porsche” Threat Intel IOC stream. The pen testers also don’t use 0days against Office, phishing against the CFO, or autonomous cyber agents tunnelling in over trusted partner’s networks (“out of scope!”). Finally, those guys are fast. They have two weeks to work and they hardly need it before they have DA.
>
>The final operational phase of a pen tester involves emailing a report that strongly recommends segmenting networks and hardening Domain Admin systems. This report can be placed in a pride of place with all the previous reports saying the same thing… none of which bother to mention where to get the budget, headcount, time or sign off from corporate to drastically alter the “ain’t broken” critical business infrastructure.
>
>The plus side is that the penetration test audit requirement is passed for another year, and maybe someday there’ll be the opportunity, resources and a mandate to fix the legacy intranet.

Yep. The rest of the piece is well worth reading, but this one is close to home (and my new job description) so I want to look at it in a bit more detail.

It's still the norm for a "penetration test" to be scoped with social engineering techniques (phishing emails or similar) specifically excluded. I can sympathise with the reasoning - intentionally manipulating your own employees for the sake of security testing can feel like a HR nightmare waiting to happen - but this is cutting off the number 1 entry vector for modern cyber attacks.

Those of you who attended the "Hunting Persistent Threats" presentation by Joff Thyer might remember the section where he described the old way of viewing information security: a tough outer layer of firewalls, DMZ, and IPS' between your LAN and your WAN, and security in depth modelled in the same way as we design physical security for a building. 

As Thyer mentioned in his talk, the problem is that this isn't how modern attacks work: they don't occur from the outside in by hacking firewalls and routers[1], they occur from the inside out through social engineering techniques: emails with malicious Office macros, links to phishing websites to capture login credentials, or emails to the accounting team asking them to change account details for invoices. In this context, excluding social engineering from your pentest scope is excluding most of the things you should be worried about.

Ditto for supply-chain attacks such as the recent CCleaner infection: I've never seen a pentest scope where a "Valued Outsource Partner" or Managed Security Service Provider (MSSP) was included as part of the testing (again, there are usually good contractural reasons for this), and yet this sort of supply-chain attack is likely to be the number 1 risk (at least in terms of potential consequence) for many large organisations who have outsourced components of their IT. 

A lot of organisations now outsource everything up to and including their Active Directory management, which means the keys to the kingdom are quite literally sitting in someone else's datacentre, if not in another country entirely.[2] 

This can pose a very large risk which these companies don't properly appreciate, because each component of their IT is certified by various security tests and has regular penetration tests from a reputable firm. Unfortunately, everyone's testing includes the same scope exclusions (social engineering, supply-chain...), and when these exclusions line up, you end up with a [Swiss Cheese problem](https://en.wikipedia.org/wiki/Swiss_cheese_model).


### Security and Unit Testing

To take a short trip aside: one of the difficulties in explaining security to software engineers is that you have to get past the tendency for developers to see security in the same way as they see Unit Testing and quality assurance (QA) generally.

[Unit Testing](https://en.wikipedia.org/wiki/Unit_testing), for those who aren't familiar with it, involves testing individual components as building blocks and verifying that they operate correctly on their own before building them into a larger system. It's an extremely good idea, and is really the only way you can possibly ensure quality across large software projects, particularly if they involve lots of components built by other people. Note that almost every meaningful piece of software falls in this category.

Combined with other quality assurance methods (most software projects have a dedicated testing team), this leads many developers to think that they can write code without being super paranoid about getting everything right, because QA will pick up any problems. Even if QA misses it, you can fix bugs with a patch later on. This is the [*"move fast and break things"*](http://mashable.com/2014/04/30/facebooks-new-mantra-move-fast-with-stability/#CPLSkmLHDPqP) mindset made famous by Facebook, though it's common to almost every startup tech company.

To be clear, this is entirely the correct mindset for many modern software projects[3], especially in the consumer space, and I'm not trying to criticise it. Without this mindset a lot of everyday software would never have shipped, including everything you're currently using to read this email.

The problem is that security doesn't really work this way, for two significant reasons: Firstly, Unit Testing is focussed on **proving a positive**: that the unit under test does what it's supposed to do within the expected range of inputs. Testing security involves **proving a negative**: "this thing will never do anything it isn't supposed to do" - which is inherently more difficult.

Secondly, security is a system-wide consideration, and problems can manifest in weird ways when you start connecting individual components. For example, I can give you two components which both seem to be secure when tested individually, but when combined they interact in a way I wasn't intending, creating a security vulnerability. QA testing often won't catch this, because it's incredibly hard to exhaustively test a large system - this difficulty is why Unit Testing exists to begin with.

The moral of the story is that properly avoiding security vulnerabilities takes a very different mindset to avoiding bugs in functionality or usability. The latter are rarely catastrophic when they occur, and catastrophic functionality problems also tend to be easy to catch in unit testing, if not general QA. 

Security problems, on the other hand, have the habit of being catastrophic months or years after you've shipped a product, and the component with the security flaw never raised any problems in QA. Avoiding these requires developers to be aware of security from the start, and not assume that any issues they introduce will be caught in testing.

There's no silver bullet here, and getting security right is almost always going to work in opposition with shipping functional products quickly. Security and Productivity often tend to be on opposite ends of the scale, the important part is getting the balance right for your organisation.

*[1] With some notable exceptions which prove the rule, such as WannaCry (which relied on a recent exploit and only worked because a lot of companies don't have even the most basic security hygiene), and the [Phineas Phisher hacks against companies like Hacking Team](http://pastebin.com/raw/0SNSvyjJ), which the grugq mentions in the article.*

*[2] This last bit is highly relevant to [Sweden in particular](https://www.thelocal.se/20170717/swedish-authority-handed-over-keys-to-the-kingdom-in-it-security-slip-up), and is part of the reason that good security people are suddenly in high demand in Stockholm.*

*[3] Exceptions include anything mission-critical, such as if you're launching a space probe. You can't easily patch something once it's on Mars, especially if the bit of software containing the bug was your communications system. There's a reason military software is so mindbogglingly expensive and always runs late (and only part of the reason is because we suck at predicting software development schedules).*