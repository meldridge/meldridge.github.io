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