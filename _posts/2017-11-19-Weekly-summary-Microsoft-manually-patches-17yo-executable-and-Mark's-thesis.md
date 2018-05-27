---
layout: email
title: Microsoft manually patches 17yo executable, Mark's thesis
---

Happy Monday!

Some interesting news this weekend: it appears that in the latest Patch Tuesday, Microsoft released a manually patched binary for their ancient 'Equation Editor', which is still part of Word. 

Apparently Microsoft has lost access to the original source code for it, and when they discovered a buffer overflow they had to manually apply a fix in assembly. That's not easy, to say the least.

[**Did Microsoft Just Manually Patch Their Equation Editor Executable? Why Yes, Yes They Did.**](https://0patch.blogspot.se/2017/11/did-microsoft-just-manually-patch-their.html) 

>Maintaining a software product in its binary form instead of rebuilding it from modified source code is hard. We can only speculate as to why Microsoft used the binary patching approach, but being binary patchers ourselves we think they did a stellar job.

This is an interesting case study on how much it sucks to maintain code you no longer have the source for. Good on Microsoft for fixing the bug.


### Mark's thesis: A Trustworthy Electronic Voting System for Australian Federal Elections

As I mentioned last Friday, I've handed up my thesis and am awaiting the marks. For any of you who are interested in reading 100+ pages of Master's thesis, you can find a copy online [here](https://arxiv.org/abs/1805.02202).

For the rest of you, a brief summary:

Western Australia used the 'iVote' online voting system for their state election in March, and they also ran the system through a content delivery network (CDN) to prevent distributed denial of service (DDoS) attacks. Unfortunately, using a CDN completely broke iVote's security model, and they didn't implement the DDoS mitigation properly anyway. 

Secure online voting is really hard at the best of times (like "[unsolved problem in computer science](https://en.wikipedia.org/wiki/List_of_unsolved_problems_in_computer_science)" hard), and trying to mitigate DDoS is even harder. There are fundamental trade-offs between security and availability for online systems, and the people who make the decisions on these sorts of systems often don't know to ask the right questions.

The second component was a survey of a small sample of eligible voters (friends and family, mostly) to determine how much they trusted the existing paper-based system, the iVote system, and a system called vVote which was used in Victoria back in 2014. To me, the most interesting result was that millenials trust electronic voting systems a lot less than their parents do. (They also trust elections less in general.)

The iVote stuff is worth a look given the upcoming South Australian state election. The state electoral commission has said that they're intending to do a trial of an electronic voting system, and the wording used suggests that iVote might be the chosen system. 

Fingers crossed they don't run it through a CDN this time.