---
title: Navy cybersecurity review, jamming Wi-Fi, and Microsoft fixes forest trusts
---

Good evening.

Some quick follow-up on the ASUS supply-chain attack from my [last email](http://127.0.0.1:4000/Email-update-ASUS-supply-chain-attack-Scytl-online-voting-flaws-Darpa-funding-electronic-voting-research/): the most recent [episode of Risky Business](https://overcast.fm/+IbKxX1iK80) covered it quite extensively, and is worth a listen.

### U.S. Navy Cybersecurity Readiness Review

Last month the U.S. Department of the Navy (DoN) released a [report](https://www.navy.mil/strategic/CyberSecurityReview.pdf) on cybersecurity readiness. It's a very well put-together document, and I'm extremely glad it was released publicly. The description of the problem will be all-too familiar to many CISOs, and the advice is broadly applicable.

To take one example, from the 'People' chapter:

>Cybersecurity must now be recognized as an essential element of the common knowledge skill sets leaders must possess. Given the technological nature of cybersecurity, the DON needs to consider this common skill requirement as a factor for promoting or retaining personnel. Without a better understanding of cybersecurity DON leaders will be handicapped in their ability to develop and execute strategy. This knowledge must go well beyond simply understanding the existence of risk. Relying solely upon cyber professionals defies the reality that the Navy and Marine Corps cannot defend itself or advance in this domain with only the specialists possessing the knowledge.

I've been saying this for a while: in 2019, all large organisations are technology organisations in one form of another. It's simply not possible to operate at scale without tech forming a huge part of your strategy and delivery. That means getting security right as well, especially if you're dealing with sophisticated threats.

From an update back in [September](https://markeldo.com/Email-update-British-Airways-technical-leadership-and-cold-boot-attacks/):

>There are very few large projects which don’t include a significant IT component (even non-IT projects are delivered using IT), and good managers with technical skills are hard to find.
>
>I recently had a fairly candid discussion with a senior Swedish executive, who commented that they might be the last generation of executives who can get away without having a technical background.
>
>As I said, I have an obvious bias, but I think there’s something to this. These days, every large company is a tech company—it’s just a question of degree.

I'd highly recommend reading the full DoN report - it really is excellent, and should be required reading for senior executives.

### Jamming Wi-Fi to avoid exams

From [The Associated Press](https://www.nytimes.com/aponline/2019/04/02/us/ap-us-students-crash-schools-wi-fi.html):

>Authorities say two northern New Jersey boys successfully crashed their high school's Wi-Fi network on multiple occasions to get out of taking exams.
>
>The two Secaucus High School freshmen are charged with computer criminal activity and conspiracy. Authorities say the 14-year-olds used an app or a computer program to compromise the network, and apparently took requests from other students to bring it down.

We've covered previously the issues with relying on the availability of commercial-grade wireless networks: taking out a Wi-Fi network isn't particularly difficult, and doesn't even require specialised equipment. (WPA3 will [improve this somewhat](https://www.wi-fi.org/knowledge-center/faq/what-are-protected-management-frames), fortunately.)

From my update on this topic [last May](https://markeldo.com/Email-update-ASDs-responsibilities-wireless-deauth-attacks-and-radio-jamming/):

>The deauth attack described above is effectively a sophisticated—and protocol specific—form of [radio jamming](https://en.wikipedia.org/wiki/Radio_jamming). Protection against jamming attacks has been part and parcel of military communications systems since World War II, but this protection is never really considered in civilian systems (protection against *unintentional interference* is a different issue).
>
>This is for good reason: compared with other protections like encryption, properly protecting against jamming attacks requires very severe trade-offs in system performance, and those trade-offs just aren’t justifiable in civilian systems which aren’t intended to withstand a military threat.

It's important not to overstate the risk here: jamming attacks are obvious when you know to look for them, and they usually require the attacker to be in physical proximity of the network. 

The convenience of wireless networks is clearly worth the risk, but it's important to have a Plan B for when someone decides to mess with them.

### Microsoft disables cross-forest unconstrained delegation

Some fairly major news: Microsoft has released a [series of updates](https://blogs.technet.microsoft.com/askpfeplat/2019/04/11/changes-to-ticket-granting-ticket-tgt-delegation-across-trusts-in-windows-server-askpfeplat-edition/) to address the Active Directory issue discovered by Will "harmj0y" Schroeder back in November.

Quoting Schroeder's original [blog post](http://www.harmj0y.net/blog/redteaming/not-a-security-boundary-breaking-forest-trusts/):

>The tl;dr non-technical explanation of “Why Care?” is that if your organization has a two-way forest trust (possibly ‘external’ trusts as well, more on that later) with another Active Directory forest, and if an attacker can compromise a single machine with unconstrained delegation (e.g. a domain controller) in that foreign forest, then they can leverage this to compromise your forest and every domain within it. In our opinion, this is very bad.

As I joked in a [previous update](https://markeldo.com/Email-update-The-AA-bill-PrivExchange-and-harmj0y-breaks-the-AD-trust-model/), this news was a bit like walking into a physics conference and  dropping the news that the speed of light isn’t a constant.

Microsoft evidently agrees on how serious this issue is, or perhaps is starting to see it exploited in the wild. They're going as far as releasing an update to Windows Server which will forcibly disable delegation across forest trusts from July 9 2019:

>The July 2019 update cycle is the one that could cause issues in an existing environment. After those month’s updates are installed, any existing forest trusts will have TGT delegation disabled by default. This could cause applications and services to fail that require unconstrained delegation across a trust. Because of the possibility of this issue affecting customers, it is recommended that you start evaluating applications and accounts that might be affected by this change as soon as possible.

As a sidebar - it can be hard to explain how unconstrained delegation works, so for those of you who have done work with Linux systems and Active Directory/Kerberos: you might have encountered a version of unconstrained delegation before without realising it. It's this option here:

<img src="/images/gssapi-credential-delegation.png" alt="GSSAPI credential delegation in Putty" style="width: 100%; max-width: 500px; display: block; margin: 0 auto; "/>

If you're logging into a Linux system using Putty and enable this option, a copy of your Kerberos Ticket Granting Ticket (TGT) will be sent to the server when you connect and dropped in the `/tmp` folder. This is mainly useful in situations where you subsequently want to log into another system from the first server - with your TGT already available, you don't need to re-authenticate. 

The problem occurs when you can't entirely trust that first server: you've just given it your keys. In the Kerberos world, your TGT is all anyone needs to impersonate you. If they have your TGT, they have access to everything you have access to.

Imagine if unlocking any door meant that you left behind a copy of *your entire keychain* just inside the doorway. All I need to do is to trick you into opening a door I control, and I get everything.

It's good to see Microsoft taking such strong action on this issue, but I wouldn't want to be the sysadmin of a complex Active Directory network come July.