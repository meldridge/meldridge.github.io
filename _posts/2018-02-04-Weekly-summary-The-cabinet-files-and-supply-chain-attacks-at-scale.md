---
layout: email
title: The cabinet files and supply chain attacks at scale
---

It's been an interesting week!


### The Cabinet Files

This one defies belief. As the Australian Prime Minister put it: if this had been the script of a satire about government incompetence, it would have been thrown out for being too unrealistic.

[**The Cabinet Files reveal national security breaches, NBN negotiations, welfare reform plans**](http://www.abc.net.au/news/2018-01-31/cabinet-files-reveal-inner-government-decisions/9168442)

Someone in the Australian Department of Prime Minister and Cabinet sold off a locked filing cabinet full of extremely sensitive classified cabinet-in-confidence documents, as well as (allegedly) some Top Secret codeword documents. The locked cabinet was found in a second-hand store in Canberra, where someone purchased it, drilled the locks, and then gave the cabinet to the ABC.


### Side Channel Attacks at Scale

This second article is much more interesting, especially if you work with any organisations who have their own development teams. It caused quite a bit of buzz at the start of January, and for good reason:

[**I’m harvesting credit card numbers and passwords from your site. Here’s how.**](https://hackernoon.com/im-harvesting-credit-card-numbers-and-passwords-from-your-site-here-s-how-9a8cb347c5b5)

>In some wise words from Google:
>
>*"If an attacker successfully injects any code at all, it’s pretty much game over"*
>
>XSS is too small scale, and really well protected against. Chrome Extensions are too locked down.
>
>Lucky for me, we live in an age where people install npm packages like they’re popping pain killers.

For those who aren't familiar with it, npm is a popular package manager for the JavaScript programming language. The idea is that if you need a piece of code to solve a problem in your project, you can just use a package from npm rather than re-inventing the wheel yourself. This is good programming practice ([good programmers are lazy](http://threevirtues.com/)).

Unfortunately, supply chain attacks are becoming the trendy new way to compromise systems at-scale, and package managers are perfect for this. The NotPetya attack last year was delivered via a compromised application update, and it's highly likely that we'll see more of these type of attacks in the future. They're just too good of a vector for attackers to ignore.

The author outlines a hypothetical malicious package introduced into npm which could hoover up credit card details from any site which happens to include his malicious package. As he correctly notes, it's almost impossible to detect this sort of attack if the person introducing the malicious code performed even a basic level of obfuscation. Even if they didn't, when was the last time you reviewed the source code of a package you installed? (No one has time for that.)

[Ken Thompson's Turing Award Lecture](https://www.ece.cmu.edu/~ganger/712.fall02/papers/p761-thompson.pdf) from way back in 1984 is well worth reading if you've never seen it - it's as relevant today as it was 30 years ago. In it, Thompson describes a hypothetical backdoor written into the C compiler itself:

>The moral is obvious. You can't trust code that you did not totally create yourself. (Especially code from companies that employ people like me.) No amount of source-level verification or scrutiny will protect you from using untrusted code.

I quoted this statement in my Master's thesis when discussing the difficulty of security electronic voting systems. It's even more relevant today than it was 30 years ago.