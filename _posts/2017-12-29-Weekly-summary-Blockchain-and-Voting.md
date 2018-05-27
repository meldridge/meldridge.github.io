---
layout: email
title: Blockchain and Voting
---

A quick bit of follow-up to my previous email - Ben Adida has written up an excellent blog post about using blockchain for online voting in elections. 

It’s well worth reading if only because he perfectly summarises the key innovation of blockchain in his introductory paragraphs. Forgive me for the long quote, but it’s worth it (and the emphasis is mine):

[**Blockchain and Voting**](https://benlog.com/2017/12/28/blockchain-and-voting/)

>Distributed databases are not new. We’ve known for a while how to replicate a database with a sprinkle of cryptography to distribute the trust. The Merkle tree, a key component of Blockchain that lets you verify consistency of a large dataset quickly, was invented in 1979. The Hash chain, another key component of Blockchain that lets you create a tamper-proof chronology of events, was invented in 1981 (it’s used in things like git). You can build a distributed ledger with Merkle trees and hash chains. We’ve been able to do this since the 80s. So … what’s new?
>
>Blockchain isn’t just a distributed database, it’s a very specific kind of distributed database where the database maintainers aren’t authenticated: anyone can be a blockchain maintainer without revealing who they are or having any kind of privileged relationship with other maintainers.
the set of maintainers changes over time. New maintainers come in, existing maintainers leave, without central planning or predictability. The maintainers of the Bitcoin blockchain 5 years ago are very different from the maintainers today.
>
>In other words: anyone can become a maintainer of the Bitcoin blockchain at any time, without asking for permission, with nothing more than computing power. Just start up the software and join the club. This is pretty amazing stuff. It wasn’t obvious, before Blockchain, that it would be possible to design such a distributed database with an amorphous untrusted set of maintainers where you just need half good guys.
>
>(There’s another really cool trick in Bitcoin, which is the incentive system for database maintainers: they get rewarded in Bitcoin for doing their database maintenance part, which makes the whole system self-sustaining. Super cool, but off topic for today.)
>
>**It’s important to realize that the true Bitcoin/Blockchain innovation is actually in this very specific trust setting of a dynamically changing set of database maintainers. If your use case doesn’t call for that, if you can designate the maintainers at the start of your protocol and have them authenticate to each other, then you don’t need the full Blockchain toolkit. You need only fairly standard cryptography and your use case was achievable 20 years ago.**

As you might recall from yesterday’s email, the ASX is intending to replace their CHESS clearing system with [one based on ‘blockchain’](http://www.asx.com.au/services/chess-replacement.htm), but the system is most definitely authenticated and has a specific set of database maintainers, so you can’t really call it blockchain at all.

When it comes to election systems the usefulness of blockchain is even more limited, and Adida goes into some detail as to why. In short: designing secure voting systems is *really hard*, and all of the hardest parts aren’t really technical problems - or at least not the sort of technical problems where a blockchain will help you.

In short, when it comes to election systems, [that Matt Blaze tweet](https://mobile.twitter.com/mattblaze/status/872194910220374017) remains accurate.