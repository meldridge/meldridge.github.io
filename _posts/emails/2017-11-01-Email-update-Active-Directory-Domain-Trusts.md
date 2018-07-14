---
layout: email
title: Active Directory Domain Trusts
---

Will '[harmj0y](https://twitter.com/harmj0y)' Schroeder has written an excellent piece about Active Directory Domain Trusts and how they work. It's a very long post (8000+ words), but serves as a bible of information for anyone whose job involves attacking or defending networks based on Microsoft's Active Directory... which roughly equates to "anyone in security" and "every modern corporate network", respectively.

It's a heavy read and highly technical, but those of you who work in this space should set aside the time to read it - it really is excellent. I'm only about 20% of the way through, and I already have a page full of notes to follow-up on.

[**A Guide to Attacking Domain Trusts**](https://posts.specterops.io/a-guide-to-attacking-domain-trusts-971e52cb2944)

>Domain trusts often introduce unintended access paths between environments. In many organizations, trusts were implemented years (sometimes 10+) ago without major considerations given to security. Some corporate entities that are focused on acquisitions often just “plug in” a new company’s Active Directory network either as a child domain or external trust, without fully considering the security implications.
>
>Because historically there have not been many toolsets that allow you to easily map, enumerate, and visualize the risk associated with misconfigured trusts, many domain architects are unaware of the unintentional risk exposed by their Active Directory trust architectures. This links back to the idea of “misconfiguration debt” that @wald0, @cptjesus, and I spoke about at Derbycon this year. Because of this, various red teams (and probably APTz, I’m assuming) have been abusing Active Directory trusts for years with great success.
>
>A common scenario is compromising a development or subsidiary domain and leveraging that access to pivot into the secure root/enclave. This also introduces opportunities for persistence- why leave code running in a secured environment, when you can have implants running in the less-secured (but trusted) domain that can then be used to re-compromise your target at will?

For those who don't know him, harmj0y is one of the creators of the excellent [PowerView](https://github.com/PowerShellMafia/PowerSploit/blob/dev/Recon/PowerView.ps1) and [Empire](https://github.com/EmpireProject/Empire) toolsets, and is probably one of the most knowledgeable people on the planet when it comes to attacking Active Directory. As we say in Australia: "he knows his shit".