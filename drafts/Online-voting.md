---
title: There are hard security problems, and then there is online voting
---


“(There’s another really cool trick in Bitcoin, which is the incentive system for database maintainers: they get rewarded in Bitcoin for doing their database maintenance part, which makes the whole system self-sustaining. Super cool, but off topic for today.)

It’s important to realize that the true Bitcoin/Blockchain innovation is actually in this very specific trust setting of a dynamically changing set of database maintainers. If your use case doesn’t call for that, if you can designate the maintainers at the start of your protocol and have them authenticate to each other, then you don’t need the full Blockchain toolkit. You need only fairly standard cryptography and your use case was achievable 20 years ago.”

Blockchain and Voting
https://benlog.com/2017/12/28/blockchain-and-voting/
via Instapaper


From Cory Doctorow at [BoingBoing](https://boingboing.net/2019/03/13/principal-agent-problems.html):

>You might be thinking, "Well, what is the big deal? If you don't trust the people administering an election, you can't trust the election's outcome, right?" Not really: we design election systems so that multiple, uncoordinated people all act as checks and balances on each other. To suborn a well-run election takes massive coordination at many polling- and counting-places, as well as independent scrutineers from different political parties, as well as outside observers, etc.

This is point is critical, because it's the reason election security is such an incredibly hard problem. There is no way to effectively scrutineer an online election, so we approximate it as best we can using complicated cryptography and 'proofs' that votes were cast and counted correctly. This is doubly tricky because we don't want voters to be able to provide this proof to anyone else, or they could sell their vote (vote buying and coercion used to be major problems, and are the reason we have polling places and the secret ballot).


This is point is critical, because it's the reason election security is such an incredibly hard problem.

It's common to hear comparisons between online voting and online banking, but with online banking I _have_ to trust my bank. Technically speaking, I have no guarantee that when I go to withdraw my money, it will actually be there. Similarly, if someone breaks into my account and transfers money out, there's a record of the transaction and who id

 when you're so reliant on particular cryptographic systems being implemented correctly.

This is why online voting is such a hard problem - and by that I mean [unsolved problem](https://en.wikipedia.org/wiki/List_of_unsolved_problems_in_computer_science), not just "difficult, but we'll figure it out eventually". Most of the problems aren't technical, and they're not getting easier over time.



Switzerland has rather unique election requirements owing to its use of [direct democracy](https://en.wikipedia.org/wiki/Direct_democracy#Switzerland) in many areas of government. Swiss elections (managed by Swiss Post) allow online voting, and their latest system is developed by Spanish company Scytl, which is also responsible for the iVote system used in some Australian state elections.

Back in February Swiss Post [announced](https://www.evoting-blog.ch/en/pages/2019/public-hacker-test-on-swiss-post-s-e-voting-system) that they would allow a Public Intrusion Test and bug bounty program on the new online voting system. Coinciding with this was a leak of the source code and technical documentation for the system.

From Kim Zetter at [Vice Motherboard](https://motherboard.vice.com/en_us/article/vbwz94/experts-find-serious-problems-with-switzerlands-online-voting-system-before-public-penetration-test-even-begins):

>Cryptography experts who spent just a few hours examining the leaked code say the system is a poorly constructed and convoluted maze that makes it difficult to follow what’s going on and effectively evaluate whether the cryptography and other security measures deployed in the system are done properly.
>
>“Most of the system is split across hundreds of different files, each configured at various levels,” Sarah Jamie Lewis, a former security engineer for Amazon as well as a former computer scientist for England’s GCHQ intelligence agency, told Motherboard. “I’m used to dealing with Java code that runs across different packages and different teams, and this code somewhat defeats even my understanding.”
>
>She said the system uses cryptographic solutions that are fairly new to the field and that have to be implemented in very specific ways to make the system auditable, but the design the programmers chose thwarts this.
>
>“It is simply not the standard we would expect."

These are the sorts of problems which raise alarm bells. Online voting is an incredibly difficult security problem, _even if_ the cryptography used in the system is implemented correctly and can be audited easily. The problem is that 

From [Kim Zetter again](https://motherboard.vice.com/en_us/article/zmakk3/researchers-find-critical-backdoor-in-swiss-online-voting-system):

>An international group of researchers who have been examining the source code for an internet voting system Switzerland plans to roll out this year have found a critical flaw in the code that would allow someone to alter votes without detection.
>
>The cryptographic backdoor exists in a part of the system that is supposed to verify that all of the ballots and votes counted in an election are the same ones that voters cast. But the flaw could allow someone to swap out all of the legitimate ballots and replace them with fraudulent ones, all without detection.


Many of you will are familiar with my work on electronic voting systems, and the iVote system in particular (if you're not, I can recommend my [Masters thesis](https://arxiv.org/abs/1805.02202) on the topic). To try and summarise: online voting is an _incredibly_ hard security problem, 





https://news.westernu.ca/2018/10/expert-e-voting-no-way-run-democracy/

https://www.nytimes.com/2018/09/26/magazine/election-security-crisis-midterms.html

https://www.theregister.co.uk/2018/09/28/defcon_vote_hacking/
https://arstechnica.com/tech-policy/2018/08/georgia-defends-voting-system-despite-243-percent-turnout-in-one-precinct/


https://medium.com/@mattbernhard/how-to-steal-every-vote-in-the-state-of-georgia-adc511b1ae9a

https://www.theverge.com/2018/9/7/17832876/us-election-hacking-2016-voting-online-tampering-paper-ballots
https://arstechnica.com/tech-policy/2018/08/georgia-defends-voting-system-despite-243-percent-turnout-in-one-precinct/
https://arstechnica.com/tech-policy/2018/08/experts-criticize-west-virginias-plan-for-smartphone-voting/
https://medium.com/s/the-crypto-collection/blockchain-disciples-have-a-new-goal-running-our-next-election-2bfe4dff3c7

https://twitter.com/GossiTheDog/status/1026603800365330432

https://markeldo.com/Email-update-Blockchain-and-Voting/
https://twitter.com/mattblaze/status/1034486679925678080

[Experts criticize West Virginia’s plan for smartphone voting](https://arstechnica.com/tech-policy/2018/08/experts-criticize-west-virginias-plan-for-smartphone-voting/)

>Advocates of online voting point out that people perform sensitive financial operations over the Internet all the time. But the difference is that financial networks keep records of all transactions that are available for inspection by both customers and banks. By contrast, our election system is based on the principle of the secret ballot, which rules out the kind of after-the-fact auditing that helps secure financial networks.


### Flaws in ACT election systems could reveal voters' votes | ZDNet
https://www.zdnet.com/article/flaws-in-act-election-systems-could-reveal-voters-votes/
via Instapaper

“Wilson-Brown said their motivation for this research was the issue of control.

"If I want to keep my vote secret, then that's my decision. We shouldn't have to trust the person voting next to us, or the electoral commission, to keep our votes private. The system should be designed so votes are private," they told ZDNet.”




### CDNs, DDoS mitigation, and MITM-as-a-service

https://troyhunt.com/cloudflare-ssl-and-unhealthy-security-absolutism/

Should maybe save this for the online voting post?

using a CDN like cloudflare is a good idea for most websites

can provide TLS

sifnificantly improve loadntikes for users and reduce bandwidth costs for you

remember how a CDN works
they are a reverse proxy for all incoming connections, and TLS connections are terminated there

Still important to remember that there is a trade-off here: it’s just one which most websites are justified in making - their threat model is one where the trade-off is the right decision. 

Trade-off 




Online voting is one of the hardest problems in computer science

If you have an IT background you might be wondering what the difficulty is. after all, can’t you just make a website like this?

https://twitter.com/umbernhard/status/1021442920237490176
https://twitter.com/patrickgtraynor/status/1021425265820553216
https://oversight.house.gov/wp-content/uploads/2017/11/Blaze-UPenn-Statement-Voting-Machines-11-29.pdf

### Online voting security

CSO Online recently published an excellent article on the security of online voting systems:

[**Online voting is impossible to secure. So why are some governments using it?**](https://www.csoonline.com/article/3269297/security/online-voting-is-impossible-to-secure-so-why-are-some-governments-using-it.html)
> There is a reason why no security standards for online voting exist: After $100 million dollars in research and years of effort, NIST, the U.S. cybersecurity standards body tasked with examining the issue, concluded that online voting is impossible to secure. "It is not clear that remote electronic absentee voting systems can offer a comparable level of auditability to polling place systems," NIST concluded in this 2011 report.
>
>"Because of the difficulty of validating and verifying software on remote electronic voting system servers and personal computers, ensuring remote electronic voting systems are auditable largely remains a challenging problem," the report added, "with no current or proposed technologies offering a viable solution."
>
>Without the ability to audit an election for irregularities, for instance to run a recount, online voting makes it impossible to trust the results of any election that uses such technology, and it calls into the question past election results. "In the age of online voting, it's not enough to produce the correct result," Essex says. "You have to have trust in the result. You have to have public confidence in the result. And you have to provide a reason for people to have that trust."


The article extensively quotes Vanessa Teague and Aleksander Essex, two of my co-authors on a [paper](https://arxiv.org/abs/1708.00991) regarding the iVote online voting system used in the 2017 Western Australian state election. Aleks has also conveniently [recorded the presentation of the paper](https://www.youtube.com/watch?v=tfxzp2SuBso), and it's worth watching if you have a spare 15 minutes.

To briefly summarise: iVote is an online voting system which encrypts ballots in the user's browser using JavaScript. This JavaScript is itself delivered from the voting server to the voter over an encrypted HTTPS connection. 

To re-iterate: when you visit the iVote website, the webserver sends you the code which will be used to encrypt your ballot, and it sends this code over a standard Transport Layer Security (TLS) connection.

Scytl, the company behind iVote, likes to call this approach "end-to-end encryption", which is—to put it diplomatically—not really in [the spirit of that term](https://en.wikipedia.org/wiki/End-to-end_encryption). Scytl's argument is that the javascript is necessary to ensure that votes can only be read by the back-end voting server, whereas with TLS alone the encryption would terminate at the webserver or load-balancer.

Less diplomatically, the javascript encryption is nothing more than security theater, because it entirely relies on the TLS encryption. It's not so much layered security as a two-level house of cards: if the TLS is broken, the JavaScript cannot be delivered securely to the voter, and the inner encryption is now useless.


For the 2017 WA state election, iVote  was used in combination with Imperva's Incapsula service for distributed denial of service protection. 

The decision to use Incapsula for DDoS mitigation was made with good intentions, particularly coming so soon after the [2016 Australian e-Census debacle](https://www.cso.com.au/article/605085/census-fail-recipe-poor-planning-poor-risk-management-irresponsibility/). Unfortunately, this decision completely broke iVote's security architecture, because it meant that the vote-encrypting JavaScript was no longer delivered directly from the voting server. 

![Incapsula-iVote](../images/ddos-mitm.PNG)

Modern DDoS mitigation is effectively *"eavesdropping as-a-service"*, where you are choosing to trade-off two points of the [CIA Triad](https://security.blogoverflow.com/2012/08/confidentiality-integrity-availability-the-three-components-of-the-cia-triad/) (confidentiality and integrity) in order to improve the third (availability). This trade-off can be fine for systems like online banking, where you can still monitor your systems and audit if money is stolen, but it's completely inappropriate for online voting, where auditing can't occur without losing the [secret ballot](https://en.wikipedia.org/wiki/Secret_ballot). If your DDoS mitigation service chose to modify votes, you would have no way to detect it.

For those of you who only joined this mailing list recently, my Master's thesis was on the security of electronic voting systems, and included more detail on the iVote work. Not to toot my own horn too much, but I think my thesis did a slightly better job of explaining the iVote problems than our actual paper (it helped that I didn't have a page limit).

If you'd like some bedtime reading, all 100+ pages of my thesis can be found here: [****]()



