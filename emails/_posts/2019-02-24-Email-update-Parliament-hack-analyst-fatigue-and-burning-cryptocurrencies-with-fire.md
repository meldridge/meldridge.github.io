---
layout: email
title: Parliament hack, analyst fatigue, and burning cryptocurrencies with fire
---

Good evening.

It's again been a crazy few weeks for security, but rather than just repeating news you've likely already seen, I wanted to pick out a few pieces you may have missed among all the rest of the noise.

I should however acknowledge the biggest story close to home: the [recent cyber attack](https://www.abc.net.au/news/2019-02-18/prime-minister-scott-morrison-cyber-attack-hackers/10821170) on the Australian Parliament and our major political parties. This one has been widely covered in the Australian press, and I'd recommend the [latest Risky Business episode](https://risky.biz/RB531/), which covers it as well as can be expected given the lack of detailed information which has been made public.

### More BMC hardware implant follow-up

We've spent a lot of time on [that Bloomberg Supermicro story](https://markeldo.com/Supermicro-hardware-trojans-and-BMC-security/), but this bit of follow-up is worth the time.

Trammell Hudson presented at December's Chaos Communication Congress in Leipzig, and his talk was based on a simple premise: assume the supposed hardware supply chain hack *was* real, and see how hard it would be to implement in practice.

**[35C3 - Modchips of the State](https://www.youtube.com/watch?v=C7H3V7tkxeA)**

>Hardware implants and supply chain attacks have been in the news recently, but how feasible are they and what can we do about them? In this talk we'll examine the design of a proof of concept SPI bus hardware implant that has similar capabilities to those described in the Bloomberg/Supermicro article as well as some countermeasures that we can use to try to detect these "modchips" and increase our trust in our systems.

If you haven't already seen it, it's an excellent talk and I highly recommend taking half an hour to watch it in full.

### Analyst Fatigue and Apple's FaceTime bug

I'm sure most of you would have heard the news last month regarding a [major bug](https://9to5mac.com/2019/01/28/facetime-bug-hear-audio/) in Apple's FaceTime service, which effectively allowed you to activate the mic and hear the audio from someone else's iPhone without any action on their part.

It turned out that the bug had been reported to Apple before it was made public, but that Apple had failed to follow-up the report correctly. This is actually quite common, as Matt Linton detailed in an excellent Twitter thread:

<a href="https://twitter.com/0xMatt/status/1090676753306025984"><img src="/images/linton-analyst-fatigue.png" alt="Tweet by Matt Linton" class="tweet"/></a>

This problem is not unique to security, and is not an easy problem to solve. Linton does a very good job of explaining why.

### Burn It with Fire: Nicholas Weaver on Cryptocurrency

UC Berkeley's Nicholas Weaver recently presented at the Enigma conference, and his talk (video [here](https://www.youtube.com/watch?v=MQDKMe6MDXQ)) had a hell of a title.

>The entire cryptocurrency and blockchain space is effectively one big fraud. Cryptocurrencies are not fit for purpose unless you need censorship resistance, are fundamentally incompatible with modern finance, and are unfixable. They are, however, destroyable as they have technical, legal, and social weaknesses that can be exploited.

The talk is 20 minutes, but if you don't have time to watch it in full there's a good summary [from Ars Technica](https://arstechnica.com/information-technology/2019/02/researcher-counts-the-reasons-he-wants-cryptocurrency-burned-with-fire/):

>Bitcoin and most other cryptocurrencies rely on a permissionless chain of hashes to verify a public ledger of all previous transactions. The rise of cryptocurrencies has spawned renewed energy in "permissioned" or "private" chains that supposedly can be used in new ways to keep records. The problem, Weaver said, is that these chains have existed for decades in the form of hash chains and have already been used for just about anything that could benefit from it.
>
>"For all of those who say 'blockchain will solve X,'" Weaver said, "the only thing it solves is you now know the person knows nothing about X."

If this sounds familiar, it's because you may have seen it before:

<a href="https://twitter.com/mattblaze/status/872194910220374017"><img src="/images/matt-blaze-blockchain.png" alt="Tweet by Matt Blaze" class="tweet"/></a>

Yep.