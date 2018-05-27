---
layout: email
title: Google kills HPKP
---

Big news today.

[**RIP HPKP: Google abandons public key pinning**](https://www.theregister.co.uk/AMP/2017/10/30/google_hpkp/)

>Google is abandoning a next-generation web crypto technology it initially championed.
>
>HTTP Public Key Pinning (HPKP) is a standard that allows a host to instruct browsers to only accept certain public keys when communicating with it for a given period of time. While HPKP can offer a lot of protection, the technology was open to potential abuse by hackers or accidental lockout if sysadmins misapplied it, as previously reported on The Register.
>
>In a blog post last week, Google's Chris Palmer announced plans to deprecate HPKP support by Chrome from May next year – when Chrome 67 is slated to be released to Stable – before removing it entirely at some as yet unspecified date.

Certificate pinning is a bit hard to explain, but I'll give it a go: basically, HPKP is a way for browsers to "learn" the specific TLS certificate served by a domain (such as `www.facebook.com`). Once they've learned the certificate served by Facebook, the browser will refuse to connect to `www.facebook.com` unless it sees the same certificate every time. 

What this means is that if I man-in-the-middle `www.facebook.com`, or take over the domain and point it at my own server, your browser still won't trust me because I don't have the correct certificate. It doesn't matter if I also manage to have my fake Facebook certificate signed by a trusted Certification Authority (CA) - your browser has 'pinned' a different certificate, and it'll refuse to trust mine no matter how legitimate it looks.

There was an excellent [Risky Business episode](https://risky.biz/RB467/) about HPKP back in August where they discussed the potential for attacks abusing certificate pinning (also covered by [The Register](https://www.theregister.co.uk/2017/08/25/hpkp_crypto_criticism/)). 

The idea was that if someone managed to take over your domain (for example, by guessing or resetting your domain registrar password, which is way more common than it sounds), they could redirect your domain to a server they control, set their own TLS certificate, and enable certificate pinning.

The effect of this would be that any users visiting your domain while this was happening would have their browser "lock in" the attacker's certificate. Once you regained control of your domain, these users would be unable to connect to your actual server, because their browser would refuse to connect without seeing the attacker's certificate (which you don't have). 

The attacker could then extort you in return for them handing over the certificate. For an e-commerce site where downtime is measured in millions of dollars per hour, this would be a massive problem, so it would likely be an effective money-maker.

The other possibility was termed "HPKP suicide", which is when a company sets certificate pinning correctly on their domain, but subsequently loses access to the TLS private key for the certificate that they had 'pinned'. Without the private key, the company would no longer be able to present the pinned certificate, and every user would no longer trust their website. Not good.

Overall the ideas behind HPKP were sound, but the cure was arguably worse than the disease. It's probably for the best that Google is killing it off.