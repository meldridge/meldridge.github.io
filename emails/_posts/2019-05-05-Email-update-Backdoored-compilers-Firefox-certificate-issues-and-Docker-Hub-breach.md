---
title: Backdoored compilers, Firefox certificate issues, and Docker Hub breach
---

Good evening.

I recently created a small Capture the Flag challenge for my local [SecTalks](https://www.sectalks.org/adelaide/) group, and I'll have a solution write-up available shortly. If you're interested in participating, get in touch and I'd be happy to send you the details. It's a beginner-level challenge, so if you're familiar with the OverTheWire [Bandit](http://overthewire.org/wargames/bandit/) and [Natas](http://overthewire.org/wargames/natas/) wargames you won't have too much trouble with it.

### ASUS supply-chain attacker also infected compilers of game developers

Some follow up to the [ASUS Live Update supply-chain attack story](https://markeldo.com/Email-update-ASUS-supply-chain-attack-Scytl-online-voting-flaws-Darpa-funding-electronic-voting-research/): the same team appears to have been infecting versions of Microsoft's Visual Studio integrated development environment, which were subsequently used by three different videogame companies. 

From [Wired](https://www.wired.com/story/supply-chain-hackers-videogames-asus-ccleaner/):

>Kaspersky first spotted the videogame malware in January, according to Kamluk, when the company started scanning for code that looked similar to the backdoor they'd found installed by the hijacked ASUS updates. The investigation led to a compromised version of Microsoft Visual Studio that included a malicious "linker," the element of the Microsoft tool that connects different parts of code together when source code is compiled into a machine-readable binary. The new, evil linker integrated malicious code libraries into the resulting compiled program instead of the usual innocent ones.

This attack is extremely cool from a technical perspective, and it's reminiscent of Ken Thompson's famous lecture *[Reflections on Trusting Trust](https://www.archive.ece.cmu.edu/~ganger/712.fall02/papers/p761-thompson.pdf)*, where he describes a deliberately backdoored compiler. The compiler is modified in such a way that it maliciously modifies any source code it compiles, including itself.

Thompson's lesson is a sobering one:

>You can’t trust code that you did not totally create yourself. (Especially code from companies that employ people like me.) No amount of source level verification or scrutiny will protect you from using untrusted code.

### Expired certificate breaks Firefox add-ons

Mozilla has had a bad weekend: their Firefox browser is suffering from an [expired certificate](https://www.zdnet.com/article/firefox-add-ons-disabled-en-masse-after-mozilla-certificate-issue/), causing all add-ons to stop working.

SwiftOnSecurity posted  good [thread on Twitter](https://mobile.twitter.com/SwiftOnSecurity/status/1124545069078536192) explaining why this protection was added to begin with:

<a href="https://mobile.twitter.com/SwiftOnSecurity/status/1124545734538407937"><img src="https://markeldo.com/images/swiftonsecurity-firefox.png" alt="Tweet by SwiftOnSecurity" class="tweet"/></a>

This isn't the first time major software has been affected by a failure to update security certificates. Last year [the same thing happened](https://www.theverge.com/2018/3/8/17095414/oculus-rift-software-fix-certificate-expiry) to Facebook's Oculus Virtual Reality headset, and the certificate failure also broke the auto-update mechanism which might have been used by Facebook to fix the issue. The only resolution was to require users to manually download and apply an update.

The best solution to these problems is to [build proper automation into your certificate renewal process](https://letsencrypt.org/2015/11/09/why-90-days.html), so that you're not relying on human memory for critical components of your infrastructure.

### Docker Hub hacked

The official repository for Docker container images has been [breached](https://success.docker.com/article/docker-hub-user-notification), with the attacker accessing sensitive information for almost 200,000 users. 

From [Catalin Cimpanu for ZDNet](https://www.zdnet.com/article/docker-hub-hack-exposed-data-of-190000-users/):

>While only 190,000 seems a small breach, it is not. A vast majority of Docker Hub users are employees inside large companies, who may be using their accounts to auto-build containers that they then deploy in live production environments.
>
>A user who fails to change his account password and may have their accounts autobuilds modified to include malware.

This is bad enough, but the stolen data also included GitHub and BitBucket API access tokens used to read source code for [automated builds](https://docs.docker.com/docker-hub/builds/). Due to the way the permissions work, most of these tokens also allow write access, which means the attacker could not only inject malicious code into Docker images, but into a project's source code as well.

Remember, having an API access token means you've already bypassed any multi-factor authentication requirements for the linked account. I covered this issue in a post [last October](https://markeldo.com/Facebook-and-the-trade-off-of-centralised-authentication/), when Facebook's user tokens were stolen:

>Once you have a User Access Token for a user, *you are that user* from the perspective of the Facebook API. The username/password (and 2FA, if enabled) is just the prerequisite for obtaining a valid token to begin with.
>
>That’s part of what makes this compromise such a big deal: it didn’t matter how good your password was, or what level of multi-factor authentication you were using to protect your Facebook account. This bug meant that the attackers could walk right around those security measures and obtain a token directly.

In this case Docker immediately revoked the access tokens which were affected, and has recommended users check for any evidence of unauthorised access to their GitHub and BitBucket accounts. For teams with sensitive production applications using Docker Hub for their [CI/CD pipeline](https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment), this is a terrifying issue to be confronted with. 