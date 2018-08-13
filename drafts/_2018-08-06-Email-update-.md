---
layout: email
title: 
---

Good morning.

### Matt Tait, and technical literacy vs fluency

Some more catch-up articles today, starting with [this excellent piece from The Weekly Standard](https://www.weeklystandard.com/haley-byrd/this-former-british-spy-exposed-the-russian-hackers) on former GCHQ operator Matt Tait, who goes by the handle ['pwnallthethings'](https://twitter.com/pwnallthethings) on Twitter.

Later in the article is some information regarding Tait's current position:

>Today, Tait is a professor at the University of Texas at Austin’s Strauss Center for International Security and Law, where he teaches a graduate course, “Cybersecurity Foundations: Introduction to the Relevant Technology for Law and Policy.”
>
>He describes the class as “a technical course for students who are not technical” that tackles questions including why cybersecurity vulnerabilities exist, why developers create vulnerabilities, how software can be defended, and how to clean up after someone has broken into a system. Tait notes that his material does not make moral judgments—“It’s not saying hackers are good and defenders are bad, because of course, depending on the context, it might be the other way ’round.”
>
>The objective is for students to become better prepared if and when they encounter cybersecurity issues in the professional world.
>
>“Matt Tait is almost unique in his ability to speak to all of these audiences very intelligently,” says Chesney, who also serves as director of the Strauss Center. “Maybe it’s his wonderful accent, maybe it’s the personal charm. He’s a very friendly, funny, and positive person, and those are qualities that make for great teaching on any subject.” Chesney argues there is a need for students to gain a firm grasp of the fundamentals of cybersecurity. “They need literacy, not fluency. Fluency is great, but we just need lawyers and policymakers to be literate,” he says.

This last part touches on a theme we've [covered](https://markeldo.com/Email-update-Tweetstorms-Technical-vs-management-and-blockchain-authentication/) [previously](https://markeldo.com/Email-update-Australian-Digital-Government-Report-and-myGovID/): a lack of technical proficiency in policy and project management, which manifests in problems all throughout Government.

The last quote from Chesney—*literacy*, versus *fluency*—is an excellent way to articulate the problem. We could some courses like Tait's in Australia.

On a related note:

### Blockchain: hype meets reality

This piece by Kai Stinchcombe has been sitting in my list for a while. It's well worth reading in full, as it makes an excellent summary of all of the hype behind blockchain.

 [**Blockchain is not only crappy technology but a bad vision for the future**](https://medium.com/@kaistinchcombe/decentralized-and-trustless-crypto-paradise-is-actually-a-medieval-hellhole-c1ca122efdec):
 
>Blockchain systems are supposed to be more trustworthy, but in fact they are the least trustworthy systems in the world. Today, in less than a decade, three successive top bitcoin exchanges have been hacked, another is accused of insider trading, the demonstration-project DAO smart contract got drained, crypto price swings are ten times those of the world’s most mismanaged currencies, and bitcoin, the “killer app” of crypto transparency, is almost certainly artificially propped up by fake transactions involving billions of literally imaginary dollars.
>
>How exactly does blockchain stop this guy from spraying pesticides?
Blockchain systems do not magically make the data in them accurate or the people entering the data trustworthy, they merely enable you to audit whether it has been tampered with. A person who sprayed pesticides on a mango can still enter onto a blockchain system that the mangoes were organic. A corrupt government can create a blockchain system to count the votes and just allocate an extra million addresses to their cronies. An investment fund whose charter is written in software can still misallocate funds.

Exactly.

Not to mention the incredibly inefficient nature of blockchains. From a post by Tony Arcieri on the [The Cryptography and Cryptography Policy Mailing List](http://www.metzdowd.com/pipermail/cryptography/2018-February/033788.html/):

>To keep up with the state-of-the-art in Bitcoin mining today, and actually
mine at a hash rate where you stand a decent chance of producing winning
blocks at a semi-frequent rate, you are looking at building something like
this: https://news.bitcoin.com/wp-content/uploads/2017/08/bitmain_4-1024x683.jpg
>
>Where datacenters like that might inspire awe, the absolutely ridiculous
aspect of it is the actual useful work being accomplished by that
multi-silo datacenter facility and all of the miners around the world,
collectively, to the tune of 4 gigawatts of energy expenditure, could be
accomplished in a centralized system by a Raspberry Pi hooked to the
Internet by a 28.8kbps modem.

This is the dirty secret of blockchain: unless you have very, *very* specific requirements for distributed trust—and really only cryptocurrencies are in this category—it's a worse solution than a traditional database on almost every conceivable metric.

The sheer level of hype surrounding cryptocurrencies and blockchain seems to have convinced people that blockchain is a sort of "Internet 2.0".

Sure enough, reality is starting to catch up to the hype. From [Bloomberg](https://www.bloomberg.com/news/articles/2018-07-31/blockchain-once-seen-as-a-corporate-cure-all-suffers-slowdown):

>A number of software projects based on the distributed ledger technology will be wound down this year, according to Forrester Research Inc. And some companies pushing ahead with pilot tests are scaling back their ambitions and timelines. In 90 percent of cases, the experiments will never become part of a company’s operations, the firm estimates. [...]
>
>“The disconnect between the hype and the reality is significant -- I’ve never seen anything like it,” said Rajesh Kandaswamy, an analyst at Gartner Inc. “In terms of actual production use, it’s very rare.”

### Offensive Security now requiring webcam for OSCP exam attempts

A final quick story which will be of interest to some of you: Offensive Security is now [requiring proctoring via webcam](https://www.offensive-security.com/offsec/proctoring/) for all OSCP exam attempts, to combat an increase in cheating by people paying others to sit the exam for them. Apparently the going rate was around 500 USD, which is pretty cheap all things considered (the exam is 24-hours long). 

Unfortunately this change was inevitable. The OSCP has became a well-regarded cert for technical security roles (and required for some pentesting positions), and this will always lead to cheating if people think they can get away with it.