---
layout: email
title: Lava lamps and random numbers
---

Today's article is a fun one:

[**How Cloudflare uses lava lamps to encrypt the Internet**](http://www.zdnet.com/article/how-lava-lamps-are-used-to-encrypt-the-internet/)

>Roughly 10 percent of the Internet's traffic passes through Cloudflare, and as the firm deals with so much encrypted traffic, many random numbers are required.
>
>According to Nick Sullivan, Cloudfare's head of cryptography, this is where the lava lamps shine.
>
>Instead of relying on code to generate these numbers for cryptographic purposes, the lava lamps and the random lights, swirling blobs and movements are recorded and photographs are taken.
>
>This footage is then turned into a "stream of random, unpredictable bytes," according to Sullivan.
>
>"This unpredictable data is what we use to help create the keys that encrypt the traffic that flows through Cloudflare's network," the executive added.

There's probably a fair bit of PR fluff in here, but this sort of practice is absolutely a thing - generating true randomness is much more difficult than you might expect.

Unfortunately, cryptography is based on the assumption that you have a good source of randomness with which to generate your keys. If you break that assumption, you can wind up with a completely broken crypto system.

Computers are, as a rule, terrible at being random, so we have all sorts of esoteric methods for generating randomness. Without a good source of randomness, [this](https://en.wikipedia.org/wiki/Random_number_generator_attack#Debian_OpenSSL) happens:

>In May 2008, security researcher Luciano Bello revealed his discovery that changes made in 2006 to the random number generator in the version of the OpenSSL package distributed with Debian GNU/Linux and other Debian-based distributions, such as Ubuntu, dramatically reduced the entropy of generated values and made a variety of security keys vulnerable to attack.
>
>The security weakness was caused by changes made to the openssl code by a Debian developer in response to compiler warnings of apparently redundant code. This caused a massive worldwide regeneration of keys, and despite all attention the issue got, it could be assumed many of these old keys are still in use. Key types affected include SSH keys, OpenVPN keys, DNSSEC keys, key material for use in X.509 certificates and session keys used in SSL/TLS connections.

We're still dealing with that one, by the way - one of my scripts for pentesting basically pulls SSH key fingerprints and checks them against the list of bad Debian keys. (Actually exploiting this bug is a royal pain, but it's an easy finding for your report.)

Unfortunately, these sorts of problems tend to stick around for a **very** long time. Regenerating keys is a pain, and before that you have to make people aware that there's a problem. 

The same is true of the [Infineon RSA key generation bug](https://arstechnica.com/information-technology/2017/10/crypto-failure-cripples-millions-of-high-security-keys-750k-estonian-ids/) from a few weeks ago. As always, crypto is hard.