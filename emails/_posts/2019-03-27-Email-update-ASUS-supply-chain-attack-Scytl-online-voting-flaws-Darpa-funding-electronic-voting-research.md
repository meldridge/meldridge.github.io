---
title: ASUS supply-chain attack and Scytl online voting flaws
---

Good evening.

Before I get into today's update, I wanted to acknowledge the horrific terrorist attack by an Australian which occurred in Christchurch two weeks ago, and offer my deepest sympathies to all of those affected. I've been putting off writing this update partly because I found it so hard to put my feelings into words, and under the circumstances it felt a bit empty to write about security news. 

There are security and tech implications to the attack which I don't want to get into at the moment, but I would strongly recommend listening to the latest episode of [Risky Business](https://risky.biz/RB535/). Pat does an excellent job covering it.

I was lucky enough to visit Christchurch many years ago. It's a beautiful place full of friendly and welcoming people, and just so happens to be a sister city of Adelaide. I encourage you to visit if you're ever in New Zealand.

Onto the news.

### Supply-chain attack via ASUS Live Update utility

From Kim Zetter at [Motherboard](https://motherboard.vice.com/en_us/article/pan9wn/hackers-hijacked-asus-software-updates-to-install-backdoors-on-thousands-of-computers):

>Researchers at cybersecurity firm Kaspersky Lab say that ASUS, one of the world’s largest computer makers, was used to unwittingly install a malicious backdoor on thousands of its customers’ computers last year after attackers compromised a server for the company’s live software update tool. The malicious file was signed with legitimate ASUS digital certificates to make it appear to be an authentic software update from the company, Kaspersky Lab says.

When it comes to supply-chain attacks against consumer electronics, this about as bad as it gets. These updaters are trusted by users and have administrative permissions by design, so are a very useful attack vector. Unfortunately, the mere existence of these stories is undoing years of good work convincing users that they need to update their devices whenever possible. 

The good news is that properly executing these attacks still requires a great deal of planning and skill to pull off, so they're usually the work of nation-states or extremely well-resourced criminal groups. 

Of course, that's cold comfort if those groups are exactly who you're worried about. 

### Critical flaw in Scytl online voting system

From [Kim Zetter again](https://motherboard.vice.com/en_us/article/zmakk3/researchers-find-critical-backdoor-in-swiss-online-voting-system):

>An international group of researchers who have been examining the source code for an internet voting system Switzerland plans to roll out this year have found a critical flaw in the code that would allow someone to alter votes without detection.

This was a major story over the last few weeks, particularly because of the recent New South Wales election in Australia (NSW uses the iVote online voting system, which was [also affected](https://www.itnews.com.au/news/nsw-electoral-commission-confirms-ivote-contains-critical-scytl-crypto-defect-520460)).

For more detail, it's worth reading [this article](https://pursuit.unimelb.edu.au/articles/what-a-second-flaw-in-switzerland-s-svote-means-for-nsw-s-ivote) by the authors of the paper (disclosure: Prof. Teague was a co-author on [another paper](https://link.springer.com/chapter/10.1007/978-3-319-68687-5_8) relating to iVote).

In short, the flaw would allow an insider with access to the voting system to undetectably modify the ballots, without breaking the cryptographic verification which is intended to prevent them from doing exactly that.

From Cory Doctorow at [BoingBoing](https://boingboing.net/2019/03/13/principal-agent-problems.html):

>You might be thinking, "Well, what is the big deal? If you don't trust the people administering an election, you can't trust the election's outcome, right?" Not really: we design election systems so that multiple, uncoordinated people all act as checks and balances on each other. To suborn a well-run election takes massive coordination at many polling- and counting-places, as well as independent scrutineers from different political parties, as well as outside observers, etc.

This point is critical, because it's the reason secure online voting is such an incredibly difficult problem. There is no way to effectively scrutineer an online election, so we approximate it as best we can using complicated cryptography—and [**cryptography is hard**](https://markeldo.com/Email-update-ROCA-vulnerability-in-Infineon-RSA-key-pairs/).

These systems usually wind up being very fragile, and the nature of the secret ballot means that when they fail, we might never know. It's comparatively far harder to change paper ballots without being detected (for one thing, you can't do it over the internet).

### Darpa building an open source electronic voting system

In extremely convenient timing, this story broke only a few days later. Another excellent piece by [Kim Zetter](https://motherboard.vice.com/en_us/article/yw84q7/darpa-is-building-a-dollar10-million-open-source-secure-voting-system):

>For years security professionals and election integrity activists have been pushing voting machine vendors to build more secure and verifiable election systems, so voters and candidates can be assured election outcomes haven’t been manipulated.
>
>Now they might finally get this thanks to a new $10 million contract the Defense Department’s Defense Advanced Research Projects Agency (DARPA) has launched to design and build a secure voting system that it hopes will be impervious to hacking.

I winced reading those last three words, but this is good news, particularly in the U.S. where there are a huge number of [horrible insecure electronic voting systems](https://arstechnica.com/tech-policy/2018/09/georgias-electronic-voting-system-will-remain-for-now-judge-rules/) which remain in active use. Any work aimed at improving this situation is welcome.

Note that this work is related to what we call "poll-site electronic voting", where you still visit a polling both to cast your ballot, but use an electronic system to do so (and ideally have a paper-trail). This is distinct from online voting, which is done remotely over the internet.