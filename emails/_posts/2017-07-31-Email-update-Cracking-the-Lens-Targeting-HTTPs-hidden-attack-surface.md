---
layout: email
title: "Cracking the Lens: Targeting HTTP's Hidden Attack-Surface"
---

This one is a big deal. James Kettle has earned $33k uncovering all sorts of vulnerabilities in reverse proxies, load balancers, and other HTTP/HTTPS equipment which is usually taken for granted. He created a new testing methodology for these vulnerabilities and then applied it to a massive range of websites with Bug Bounty programs.

Quotes from [the whitepaper](http://blog.portswigger.net/2017/07/cracking-lens-targeting-https-hidden.html):

>Modern websites are browsed through a lens of transparent systems built to enhance performance, extract analytics and supply numerous additional services. This almost invisible attack surface has been largely overlooked for years.

>In this paper, I'll show how to use malformed requests and esoteric headers to coax these systems into revealing themselves and opening gateways into our victim's networks. I'll share how by combining these techniques with a little Bash I was able to thoroughly perforate DoD networks, trivially earn over $30k in vulnerability bounties, and accidentally exploit my own ISP.

(Whitepaper PDF: https://portswigger.net/knowledgebase/papers/CrackingTheLens-whitepaper.pdf)

One of the most interesting bits relates to his ISP, British Telecom (BT):

>This setup has several notable consequences. Thanks to virtual hosting, cloud hosts like Google Sites have ended up on the blacklist, meaning all traffic to them from consumer and corporate BT users is proxied. From a blacklisted server's point of view, all BT users share the same tiny pool of IP addresses. This has resulted in BT's proxy's IPs landing on abuse blacklists and being banned from a number of websites, affecting all BT users. Also, if I had used the aforementioned admin access vulnerability to compromise the proxy's administration panels, I could could potentially reconfigure the proxies to inject content into the traffic of millions of BT customers. Finally, this highlights just how easily overlooked such vulnerabilities are; for years I and many other British pentesters have been hacking through an exploitable proxy without even noticing it existed.
>
>I reported the ability to access the internal admin panel to a personal contact at BT, who ensured it was quickly resolved. They also shared that the interception system was originally constructed as part of CleanFeed, a government initiative to block access to images of child abuse. However, it was inevitably repurposed to target copyright abuse.