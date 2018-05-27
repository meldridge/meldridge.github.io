---
layout: email
title: Equifax again, forced browsing and security debt
---

It's the last night before my thesis is due, and I'll be presenting and defending it tomorrow morning (evening Australian time). Wish me luck.

Given that I should probably get back to work, I have an email I prepared earlier. This one is Yet Another Equifax Story, and has been sitting on my list for a while.

[**Breaking: Equifax Knew of Security Flaws Months Before It Was Hacked**](https://motherboard.vice.com/en_us/article/ne3bv7/equifax-breach-social-security-numbers-researcher-warning)

>Late last year, a security researcher started looking into some of the servers and websites that Equifax had on the internet. In just a few hours, after scanning the company's public-facing infrastructure, the researcher couldn't believe what they had found. One particular website allowed them to access the personal data of every American, including social security numbers, full names, birthdates, and city and state of residence, the researcher told Motherboard.
>
>The site looked like a portal made only for employees, but was completely exposed to anyone on the internet. It displayed several search fields, and anyone—with no authentication whatsoever—could force the site to display the personal data of Equifax's customers, according to the researcher. Motherboard saw multiple sets of the data they were able to access.
>
>"I didn't have to do anything fancy," the researcher told Motherboard, explaining that the site was vulnerable to a basic "forced browsing" bug. The researcher requested anonymity out of professional concerns.
>
>"All you had to do was put in a search term and get millions of results, just instantly—in cleartext, through a web app," they said. In total, the researcher downloaded the data of hundreds of thousands of Americans in order to show Equifax the vulnerabilities within its systems. They said they could have downloaded the data of all of Equifax's customers in 10 minutes: "I've seen a lot of bad things, but not this bad."

It's not really news that Equifax's security practices were appallingly bad, but this just is another piece of the puzzle.

For the uninitiated, a "forced browsing" bug is a lot dumber than it sounds, and it's a stretch to even call it a bug. In simple terms, it means that there was an Equifax website with a special employee-only page, and the only thing protecting it was that it wasn't directly linked anywhere. If you happened to know (or guess) the URL, you had the same level of access as an Equifax employee. Tools for automating this sort of URL guessing are pretty trivial to write, and I have half a dozen of them on my laptop (I'm not actually sure what the differences are - they all do largely the same thing).

For example, if my website is `https://www.rubbish-software.com/`, I might have a special portal for employees only, at `https://www.rubbish-software.com/employees-only`. 

Normally you'd protect a page like that with a username and password prompt, and preferably 2-factor auth, but Equifax didn't - they just hoped that no one would guess the URL for their secret employee portal. Once you'd guessed the URL, you had full access to the portal.

The rest of Equifax's web presence was also riddled with holes:

>While probing Equifax servers and sites, the researcher said that they were also able to take control—or get shell access as hackers refer to it—on several Equifax servers, and found several others vulnerable to simple bugs such as SQL injection, a common, basic way of attacking sites. Many servers were running outdated software. According to one analysis performed in early September, Equifax had thousands of servers exposed on the internet, indicating both massive sprawl and loose control of its infrastructure, which increased the company's attack surface.

Some of you might remember the Deloitte story from a month ago, which had similar themes. This is the problem with large organisations who have accumulated a large amount of technical and security debt: they tend to have infrastructure all over the place. 

When you're in this situation, even if you brought in a world-class security team to fix things up, they'd have a hard time just *finding* all of your servers, let alone securing them. You can't secure something if you don't know it exists, and very few large companies have solid asset management processes in place.

Unfortunately, with modern tools and poor internal security hygiene, you only really need one good foothold into a company's infrastructure to cause a lot of damage.