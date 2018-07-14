---
layout: email
title: Matthew Green on KRACK
---

Some follow-up on the KRACK wireless attack from last week: Matthew Green has written up an excellent post on the attack and how this vulnerability managed to go unnoticed for so long, despite the fact that the four-way handshake has been *formally proven to be secure*. 

That italicised phrase is a term of art, by the way: the explanation is long and boring, and can be summarised with _"we're **really** sure that the handshake is secure"_.

[**Falling through the KRACKs**](https://blog.cryptographyengineering.com/2017/10/16/falling-through-the-kracks/)

>A paper by He, Sundararajan, Datta, Derek and Mitchell (from 2005!) looked at the 802.11i handshake and tried to determine its security properties. What they determined is that yes, indeed, it did produce a secret and strong key, even when an attacker could tamper with and replay messages (under various assumptions). This is good, important work. The proof is hard to understand, but this is par for the course. It seems to be correct.
>
>At the same time, there are security proofs showing that — provided the nonces are never repeated — encryption modes like CCM and GCM, are highly secure. This means that given a secure key, it should be possible to encrypt safely.
>
>So what went wrong?
>
>The critical problem is that while people looked closely at the two components — handshake and encryption protocol — in isolation, apparently nobody looked closely at the two components as they were connected together. I’m pretty sure there’s an entire [geek meme](https://www.reddit.com/r/ProgrammerHumor/comments/61qnnk/2_unit_tests_0_integration_tests/) about this.

This problem - components which are secure in isolation, but broken when combined - might sound familiar to those of you who have been reading the last few emails. (That link above is comedy gold, by the way.)

The major difficulty for security is that issues like this can go unnoticed for years, and can completely break your security model if you were depending on them to work. 

This is why it's important to have a security model which isn't fragile: you have to assume that one or more of your security components might be broken at some point. The same applies for Wi-Fi encryption - if your security is dependent on your wireless network remaining encrypted at all times, you're going to have a bad time.