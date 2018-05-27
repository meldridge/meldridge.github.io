---
layout: email
title: Traffic flow security
---

Today’s topic is traffic analysis! 

In general, the reason we use encryption is to prevent an attacker reading the content of our messages. This is incredibly useful, but it’s important to remember that the *content* of a message isn’t always the most useful part. 

One example is in the metadata of your message, such as who you’re talking to, and for how long. I might see you exchange encrypted email with a known terrorism suspect. I don’t know what you said, but I probably don’t need to - the metadata (and the fact that you’re encrypting your messages at all) is probably enough.

Traffic analysis works similarly, and the easiest way to explain it is with an example. 

Let’s imagine that we’re a special forces team positioned deep behind enemy lines, monitoring their communications in preparation for an upcoming attack by our own troops. We can’t break the encryption on the enemy’s communications, so we don’t know what the messages contain, but we can see when they send and receive messages, and for how long.

So far we haven’t been detected by the enemy, and we’ve been regularly providing reports back to our headquarters using our own encrypted  channel.

One evening, we receive a very simple message from headquarters: *“We attack at dawn. Be prepared.”*

Immediately after we receive this message, the enemy’s communications goes crazy - sudden short messages all over the place, and constant communications to a recipient we’ve previously identified as the enemy’s own headquarters.

Even though we have no idea what the messages contain, there’s a good chance that we’ve been blown: either the enemy has a spy in our HQ, or they intercepted and decrypted our own communications. Either way, it’s probably safe to say that the enemy knows about the upcoming attack.

This is traffic analysis: we don’t know what the messages contain, but the mere fact that we can see them being sent gives us information. This is just a simple example, and the Wikipedia article on [Traffic Analysis](https://en.wikipedia.org/wiki/Traffic_analysis) has many more. It’s worth reading if you’re interested.

**Traffic analysis of Zcash transactions**

Zcash, for those of you who aren’t familiar with it, is a cryptocurrency designed for anonymous transactions. Per the name, it’s goal is to provide a cryptocurrency with the same anonyminity as cash.

This is distinct from more well-known cryptocurrencies like Bitcoin and Ethereum - despite what many people think, these platforms do *not* provide any real anonyminity. Every transaction is visible on the public blockchain, including the sender, recipient, and amount. If you throw enough analysis at the blockchain, you can trace every bitcoin transaction which has ever taken place.

Zcash (and others like Monero) aim to change this. 

**[New Empirical Research into Zcash Privacy](https://z.cash/blog/new-research-on-shielded-ecosystem.html)**

>A researcher from University of Michigan-Dearborn, Jeffrey Quesnelle, published a paper and blog today about the effective privacy on the Zcash blockchain over the first year of its existence. No vulnerabilities in Zcash were uncovered in this research. However, the research underscores a specific way that Zcash — like any other financial privacy technology — can fail to protect you if you use it the wrong way.

>To recap, in Zcash there are both “shielded” and “transparent” addresses. Zcash stored in transparent addresses is visible in the blockchain to everyone. Zcash stored in shielded addresses is not.

>The way that you can use this the wrong way is to move a certain amount of money into a shielded address, and then move that same amount out again.

The article and associated paper can be confusing if you’re not familiar with cryptocurrencies in general or Zcash in particular, but this is in essence just traffic flow analysis. 

The researcher took a large number of transactions and analysed them to determine when someone was moving an amount of money from a *transparent* Zcash address to a *shielded* address, and then the exact same amount back out again.

Using this technique, it was possible to piece together the full chain of transactions to track the movement of Zcash between accounts, even though the point of shielded Zcash accounts is to make these transactions impossible to trace.

This tweet by Filippo Valsorda  summarises things nicely:

**insert image here**

This isn’t *quite* true: there are a number of techniques for defeating traffic flow analysis (this is known as traffic flow security, or TFS)
