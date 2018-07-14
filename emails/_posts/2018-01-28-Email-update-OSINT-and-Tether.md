---
layout: email
title: OSINT and Tether
---

It's been a long time since my last email. I'd like to say it's because I've been busy creating a blog, but in reality it's because I've been catching up on some gaming. (Sorry not sorry.)

I'm still planning to post some of my longer emails online at some point, so I'm open to suggestions if anyone has a good idea for a name. Kattfakta.se is tempting, but I'd rather not have to explain the joke to every visitor...

I've also been busy working on my first security awareness seminar at Qliro, which took place on Wednesday and went very well. I'll send out the slides later this week for those interested.


### The Strava Global Heatmap and OSINT

The [Strava Global Heatmap](https://labs.strava.com/heatmap/#7.00/-120.90000/38.36000/hot/all) is a collection of location data collected from fitness trackers, including Strava's own hardware as well as other systems like Fitbit.  Most of these systems have the ability for users to opt-out of data collection, but the default is to allow it.

Strava presents this data in an extremely cool map, which allows you to see where people travel while using their fitness trackers, and how frequently.

Naturally, this happened:

![Strava global heatmap](/images/strava-heatmap.png)

There are some [excellent examples](https://twitter.com/stilgherrian/status/957466138316701697) on Twitter of using this data to discover all sorts of interesting things, such as patrol routes on military bases, or where employees go for a jog during lunchtime. Of course, anyone with a good set of binoculars could get the same information, but the Strava data makes things a hell of a lot easier.

I expect that this will form the basis of a few "awareness sessions" in the very near future.


### Bitcoin and Tether 

It's worth keeping an eye on this story. Tether is both a cryptocurrency and a company, and it's stated purpose is to act as a cryptocurrency pegged to the value of the US Dollar: one Tether token (USDT) is worth one US dollar (USD).

I don't claim to understand all of it, but the idea as I understand it is that Tether Tokens act as a fiat currency for trading, without the hassle of pesky anti-money laundering laws and "Know Your Customer" regulations which real banks have to deal with whenever someone transfers large amounts of money in a fiat currency.

Anyway, Tether has been dealing with questions for quite a while about how much USD they actually control. They claim that they have reserves of USD for every Tether token they issue, and that they have external auditors to confirm exactly that. 

Then yesterday, this happened:

[**Tether Confirms Its Relationship With Auditor Has 'Dissolved'**](https://www.coindesk.com/tether-confirms-relationship-auditor-dissolved/)

>Tether, the issuer of the dollar-pegged cryptocurrency USDT, said its relationship with audit firm Friedman LLP has ended. [...]
>
>Friedman had been working on an audit of Tether, which has close ties to the cryptocurrency exchange Bitfinex. Critics of the two companies, most prominently the blogger who goes by the handle Bitfinex'd, have claimed that Tether had been printing tokens out of thin air to drive up the price of bitcoin on the exchange.

The statement from Tether is telling:

>"We confirm that the relationship with Friedman is dissolved.  Given the excruciatingly detailed procedures Friedman was undertaking for the relatively simple balance sheet of Tether, it became clear that an audit would be unattainable in a reasonable time frame. As Tether is the first company in the space to undergo this process and pursue this level of transparency, there is no precedent set to guide the process nor any benchmark against which to measure its success."

Translation: "our auditor was digging deeper than we'd like".

Oh, and in other news - another cryptocurrency exchange has been [hacked](https://www.theregister.co.uk/2018/01/26/coincheck_hacked/), to the tune of half a billion dollars. It's telling that I didn't even recognise the cryptocurrency ('NEM') that they lost. It's hard to keep up these days.