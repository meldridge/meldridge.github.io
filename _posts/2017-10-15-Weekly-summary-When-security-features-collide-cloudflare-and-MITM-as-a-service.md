---
layout: email
title: When Security Features Collide, Cloudflare and the tradeoffs of MITM-as-a-service
---

A few emails ago I mentioned the difficulty with testing systems for security problems: the purpose of security testing is to prove a negative (inherently difficult), and there can often be unpredictable interactions between different parts of a system. It's possible to take two components, both of which appear to be perfectly secure when considered individually, and wind up with a vulnerability when they're combined.

This is a bit unintuitive, so I wanted to provide an example in my email. Unfortunately at the time none immediately sprang to mind. 

PortSwigger to the rescue:

[**When Security Features Collide**](http://blog.portswigger.net/2017/10/when-security-features-collide.html)

>Layered security mechanisms are forcefully promoted by industry standards such as PCI DSS and (briefly) the OWASP Top 10. In this post, I’ll argue that the blanket application of such an approach is both misguided and hazardous, by showing that stacking security measures in front of a system may make it easier to exploit. I’ll demonstrate this by sharing how to use Cloudflare's email protection system to bypass their WAF and every browser XSS filter, on all websites using Cloudflare.

There's a lot of acronym soup in that paragraph, so to summarise: *"Cloudflare has a security system which, when used, breaks other security systems."*

The article is by James Kettle, and PortSwigger is the developer of the popular [Burp Suite](https://portswigger.net/burp) web application testing software. It's excellent software even in its Free Edition form, and the Pro version is unusually affordable for security software.

The article itself discusses one of Cloudflare's security features: [Email Address Obfuscation](https://support.cloudflare.com/hc/en-us/articles/200170016-What-is-Email-Address-Obfuscation-). This feature is designed to intercept HTTP responses from a website and rewrite them to remove any plaintext email addresses, so that they can't be automatically harvested ("scraped") by spam bots.

I had no idea this feature even existed, and it seems like an extremely over-engineered solution (*"parse and rewrite every HTTP response to filter out email addresses"*) to solve a fairly simple problem (*"don't put email addresses on your website if you care about them getting spammed"*). 

In this case, not only is it hilarious overkill, it introduces another problem: the fact that Cloudflare is rewriting HTTP responses can let you bypass Cross-Site Scripting (XSS) protections. Kettle goes into quite a bit of detail about how the attack works, and it's worth reading if you're interested. 

As an engineer I'd like the moral of the story to be "don't make stupid solutions to simple problems", but the security aspect is summed up by Kettle:

>Adding one security mechanism can undermine multiple others.

The trick, of course, is knowing what you're doing when adding new security mechanisms. Which is a lot harder than it sounds when you get into issues with this many variables.


### The Trade-offs of DDoS Mitigation

As an aside: it surprises me that there isn't more attention paid to this sort of 'feature' offered by services like Cloudflare. 

Rewriting HTTP responses is kind of a big deal, especially when the connection between the user and the website they're accessing is supposed to be encrypted by [SSL/TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security) (The 'S' part of 'HTTPS'). After all, the entire point of TLS is to prevent someone intercepting your traffic and tampering with it.

This is one of the caveats of using distributed denial-of-service (DDoS) mitigation services like Cloudflare, Akamai, or Incapsula. Their purpose is to act as a benign [man-in-the-middle](https://en.wikipedia.org/wiki/Man-in-the-middle_attack): they intercept every connection to your website before forwarding it on, so that when your website gets hit by a DDoS, the attacker ends up hitting Cloudflare's infrastructure (which can take it) and not yours (which can't).

As it happens, intercepting and rewriting HTTP responses to inject new content is how these services work - they wouldn't be able to function if they didn't. In order to filter our the malicious traffic from the DDoS, they need some way to fingerprint legitimate users, and they do this by injecting tracking cookies or other content which lets them distinguish the real users from the DDoS bots.

The tradeoff is quite obvious: in return for protection from DDoS, you're allowing Cloudflare to man-in-the-middle all of your connections. 

This tradeoff is an easy one your website is a blog - your traffic isn't sensitive. For a bank it might pose some compliance questions and pointed questions from the security team, but it might still pass muster because every transaction occurring is logged, auditable, and reversible.

For an online voting platform, where there is none of the above [by design](https://en.wikipedia.org/wiki/Secret_ballot), it's a problem. 

I co-wrote a [paper](https://link.springer.com/chapter/10.1007/978-3-319-68687-5_8) on exactly this issue, for those interested: the arXiv link is [here](https://arxiv.org/abs/1708.00991) and the paper will be presented at [E-Vote-ID](https://www.e-vote-id.org/conference-program/) in just over a week.