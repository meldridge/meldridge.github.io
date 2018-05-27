---
layout: email
title: More Equifax, Bloomberg and "state-sponsored hackers"
---

A short one today, to make up for the last few days of wordy emails!

This article from Bloomberg on the Equifax hack has been doing the rounds. The headline is the important bit:

[**The Equifax Hack Has the Hallmarks of State-Sponsored Pros**](https://www.bloomberg.com/news/features/2017-09-29/the-equifax-hack-has-all-the-hallmarks-of-state-sponsored-pros)

No it doesn't. It has the hallmarks of attackers only slightly more sophisticated than script kiddies.

The attackers used a commodity exploit (which already had a Metasploit module) to gain access to a webserver, and then dropped over 30 webshells to maintain their access, which is amateur-hour stuff.

Unfortunately this is yet another example of poor security journalism: Equifax screwed up monumentally, but headlines like this let them off the hook for their poor practices by making it sound like they were the victim of sophisticated state-level attackers. After all, who can compete against Russia and China?

In reality, they had horrible security practices and paid for it: not noticing 30 webshells sitting on their webserver, and then having 130 million records of extremely sensitive data leave their infrastructure without flagging an alert - this is the stuff of small businesses with no budget, not massive national credit monitoring services.

You can't even really blame the journalists for articles like this. As we've discussed, this stuff is complicated if you're not in the field, and all "cyber" people are equivalent from the perspective of a layperson. All it takes is a journalist asking the wrong person for advice, and you're off to the races.

The article is actually worth reading because it contains some interesting inside information about the relationship between Equifax and Mandient, their security firm. Just don't fall for the headline.