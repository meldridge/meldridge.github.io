---
layout: email
title: Choosing bad passwords, Tink, and rolling your own crypto
---

Good morning.

It's been a while since my last update, partly due to some personal news: this week I started a new position in the Swedish subsidiary of [Mnemonic](https://www.mnemonic.no/), a Norweigan security consultancy and MSSP.

In infosec news, it's been another busy few weeks: there was yet another [supply-chain attack](https://www.zdnet.com/article/mega-nz-chrome-extension-caught-stealing-passwords-cryptocurrency-private-keys/) which stole passwords and cryptocurrency private keys using the MEGA.nz Chrome extension, Chrome itself is planning some [big changes](https://www.wired.com/story/google-wants-to-kill-the-url) to how URLs are displayed in the browser, and finally, in very unsurprising news:

## People choose bad passwords

[From the ABC](http://www.abc.net.au/news/2018-08-22/weak-passwords-putting-sensitive-wa-data-at-risk-report-finds/10149278):

>West Australian public servants are leaving sensitive and confidential information vulnerable to hacking by using easy-to-guess passwords, with more than 1,400 people using 'Password123' as their login.
>
>An examination of passwords and computer systems within WA Government agencies by auditor-general Caroline Spencer found 26 per cent of accounts had weak or commonly used passwords.

This story is interesting mainly for the fact that it exists at all: to my knowledge this is the first time a Australian auditor-general has looked at anything remotely this technical in a security context. (I'd welcome correction if this is wrong!)

The [full report](https://audit.wa.gov.au/reports-and-publications/reports/information-systems-audit-report-2018/introduction-and-background/) details how they conducted the audit: they pulled hashed passwords out of each agency's Active Directory Domain Controllers, and then did some good old-fashioned [password cracking](https://www.youtube.com/watch?v=nm8nTBhJGXE). From an operational security point of view, this is no mean feat, and I can only imagine the expression on the faces of the sysadmins: _"you want to do **what** to the DCs?"_

Only a few days after the report was made public, Troy Hunt released a version of his [Pwned Passwords list](https://www.troyhunt.com/pwned-passwords-now-as-ntlm-hashes/) in NTLM hash format, which makes this sort of work significantly easier (no need to crack the hashes at all, just compare them with the list).

Of course, rather than conducting another audit in 5 years time showing the same result, it would be much more effective for the agencies to proactively prevent the use of these sorts of passwords by users. This is exactly what the Pwned Passwords list was intended to be used for.

## Google introduces the Tink crypto library

Google has released an open source cryptographic software library called [Tink](https://security.googleblog.com/2018/08/introducing-tink-cryptographic-software.html). 
One of the cardinal rules of secure development is _["don't roll your own crypto"](https://motherboard.vice.com/en_us/article/wnx8nq/why-you-dont-roll-your-own-crypto)_, for reasons nicely explained by Google themselves:

>In cryptography, subtle mistakes can have serious consequences, and understanding how to implement cryptography correctly requires digesting decades' worth of academic literature. Needless to say, many developers don’t have time for that.

and

>Tink aims to eliminate as many potential misuses as possible. For example, if the underlying encryption mode requires nonces and nonce reuse makes it insecure, then Tink does not allow the user to pass nonces. 

I discussed this problem [last year](https://markeldo.com/Email-update-KRACK-Attacks/) when serious vulnerabilities were discovered in WPA2 Wi-Fi encryption:

>The broad takeaway is this: when it comes to using modern crypto protocols, if you ever use the same nonce twice for a given encryption key, you’re screwed.

The Tink library is designed to prevent these problems, and it's a great initiative by Google.

(Just spare a thought for [Tink AB](https://consumer.tink.se/), which is now going to have to deal with some confusing internal naming if any of their developers want to use this new library.)