---
layout: email
title: The Equifax cluster****
---

This is a big story which dropped last week while I was in Melbourne – Equifax, one of the major credit reporting companies in the U.S., got hacked through an Apache Struts bug, resulting in the theft of personal information for **143 million Americans**.

[**Equifax Breach Response Turns Dumpster Fire**](https://krebsonsecurity.com/2017/09/equifax-breach-response-turns-dumpster-fire/)

This personal information included social security numbers, which are (bizzarely) often used by companies in the U.S. to verify that you are who you say you are (i.e. only you are supposed to know your SSN). It’s like the world’s shittest password, since it exists on every form you’ve ever filled out, and can’t be changed.

In any case, 143 million of them are now doing the rounds, making it open season for fraudsters wanting to file fake tax returns, apply for credit cards in the name of someone else, or generally do anything requiring identity theft. It’s a mess.

From what people can gather, the Apache Struts bug in question is [this one](https://www.theregister.co.uk/2017/03/09/apache_under_attack_patch_for_zero_day_available/), which was made public in March. Not to be confused with [this one](https://arstechnica.com/information-technology/2017/09/exploit-goes-public-for-severe-bug-affecting-high-impact-sites/), which dropped this month and already has a Metasploit module for it, so it’s now trivial for anyone to exploit it. Struts is used absolutely everywhere in enterprise companies, so this is just the start. (Although it’ll be hard to top a breach resulting in 143,000,000 social security numbers and other personal information.)

Topping it all off, three of the top executives at Equifax sold shares worth almost $1.8 million three days after the breach was discovered, opening up insider trading questions. The three executives include the CFO and the “president of U.S. information solutions”, so it’s extremely hard to picture them not knowing about the breach when they sold. Watch this space.