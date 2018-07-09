---
layout: email
title: Blockchain
---

God Jul and a happy new year! I hope the Australians are managing to keep cool in the summer heat. We had a disappointing lack of snow in Stockholm over Christmas, but that is likely to change in the next few days.

Today’s article by Kai Stinchcombe has been doing the rounds recently, and for good reason: it provides an excellent summary of all of the current issues with blockchain technology and cryptocurrencies.

[**Ten years in, nobody has come up with a use for blockchain**](https://hackernoon.com/ten-years-in-nobody-has-come-up-with-a-use-case-for-blockchain-ee98c180100)

> Everyone says the blockchain, the technology underpinning cryptocurrencies such as bitcoin, is going to change EVERYTHING. And yet, after years of tireless effort and billions of dollars invested, nobody has actually come up with a use for the blockchain—besides currency speculation and illegal transactions.

It turns out that the selling point of the blockchain - a distributed ledger with a decentralised trust model - isn’t nearly as useful as people thought it would be.

For bitcoin and other cryptocurrencies, the promise was instant, irreversible transactions and low fees, with no central management. In practice (for bitcoin particularly), we have slow transactions and high fees, and the benefits of central management and reversible transactions vastly outweigh the downsides, at least for everyday consumer purposes.

Stinchcombe again:

>In conversations with bitcoin entrepreneurs and investors and consultants, there was often a lack of knowledge or even interest in how the jobs were being done today or what the value to the end user was. With all the money spent on bitcoin cash registers, nobody went out and did a survey about whether most credit card users would be willing to give up their frequent flyer miles in return for also losing the ability to dispute a transaction. Presumably, they thought, the reason IPOs are so expensive or venture fund formation paperwork is so onerous is because all those lawyers and accountants are just getting rich sitting around pushing paper… a bunch of smart engineers in their 20s with no industry experience could certainly do their jobs, automatically, in a matter of months, with just a few million bucks of venture capital.
>
>So far, not so much.

In fact, bitcoin isn’t even useful for crime anymore - the transaction fees are so high that many criminal groups have switched to Monero or Zcash for ransomware and mining. (As a side note: you can expect this trend to continue in 2018, as more groups realise that surreptitiously mining Monero on millions of insecure IoT devices between using them for DDoS attacks is much more profitable than simply encrypting them for ransom.)

In the few cases where we’re using blockchain technology for more than just cryptocurrencies—for example: the [ASX clearing house system replacement](http://www.asx.com.au/services/chess-replacement.htm), and poll-site voting systems like [Star Vote](https://www.usenix.org/conference/evtwote13/workshop-program/presentation/bell)—you cant really call it ‘blockchain’. The actual implementation is just a traditional distributed system with central control and management which happens to use hashing to verify transactions: what some people have termed a *hashchain* to distinguish it from a public *blockchain*. 

In the case of the ASX, access is restricted to particular parties, in exactly the same way as the existing CHESS system, and the verification ‘mining’ will be performed by trusted systems dedicated for that task. StarVote is even more restrictive - the entire hashchain takes place on an air-gapped network within each individual polling site. A public blockchain these are not.

To summarise: the technology behind blockchain is interesting, but we still don’t have all that many compelling use cases for it. Matt Blaze [summed it up](https://mobile.twitter.com/mattblaze/status/872194910220374017) better than anyone:

![Matt Blaze on blockchain](../images/matt-blaze-blockchain.jpg)
