---
layout: email
title: Meltdown and Specture follow-up, and more Bitcoin
---

Some quick follow-up today. 

### CPUs and Cloud Services

First, on Meltdown and Spectre, [Alex Ionescu](https://twitter.com/aionescu/status/949028481056190464) nicely summarised the fundamental decision which brought us to this point: all of cloud services are reliant on commodity CPUs originally designed for single-user workstation PCs.

This has worked spectacularly well until now - when we suddenly have to face the fact that optimising for single-user requires making security trade-offs that aren't appropriate when you're sharing your CPU with other people. Remember: Meltdown and Spectre wouldn't have been nearly as much of a big deal if it wasn't for the fact that nearly all of modern tech uses virtualised cloud services.

<a href="https://twitter.com/aionescu/status/949028481056190464"><img src="https://markeldo.com/images/ionescu-multi-tenant-computing.png" alt="Tweet by Alex Ionescu" class="tweet"/></a>

Joe Fitz has also written an excellent twitter thread explaining why these issues are going to be so hard to fix, and why Intel can't just ship new CPUs without these vulnerabilities: altering the design of a CPU is kind of a big deal.

[**Thread time! Why can't they just quickly patch #meltdown or #spectre and push out another cpu?**](https://twitter.com/securelyfitz/status/949370010652196864)

>Assuming we don't need too much new research, we amend the architecture, write new specifications, implement the architecture in HDL, fabricate the chip, and go through validation before selling it. Once again, we're talking 4 to 5 years.

And finally, the grugq and Matt Tait teamed up to deliver what is now my favourite summary of good information security practice in a [single tweet](https://twitter.com/thegrugq/status/950418262772260864):

<a href="https://twitter.com/thegrugq/status/950418262772260864"><img src="https://markeldo.com/images/grugq-not-everything-is-APT-2.png" alt="Tweet by the grugq" class="tweet"/></a>

Print out some A3 posters of this one and staple it to various parts of your IT department. Thank me later.

### Bitcoin follow-up

Things have been busy since I posted my holiday rants about the overheated cryptocurrency market. (And please forgive me for the slight detour from security.)

It's been clear for a long time that we're in a speculative bubble - particularly when it comes to bitcoin - but the problem with bubbles is that you never know when they'll pop. My biggest concern is that the [mania](https://www.theverge.com/2017/12/21/16805598/companies-blockchain-tech-cryptocurrency-tea) has gotten to a point that when things come crashing down, it'll take down a lot of otherwise perfectly good tech companies as collateral damage.

In the meantime, Steve Bellovin from Columbia University has written an excellent critical piece on Bitcoin from an engineering perspective:

[**Bitcoin—The Andromeda Strain of Computer Science Research**](https://www.cs.columbia.edu/~smb/blog/2017-12/2017-12-30.html)

>Everyone knows about Bitcoin. Opinions are divided: it's either a huge bubble, best suited for buying tulip bulbs, or, as one Twitter rather hyperbolically expressed it, "the most important application of cryptography in human history". I personally am in the bubble camp, but I think there's another lesson here, on the difference between science and engineering. Bitcoin and the blockchain are interesting ideas that escaped the laboratory without proper engineering—and it shows.

It's well worth reading, and is quite short.