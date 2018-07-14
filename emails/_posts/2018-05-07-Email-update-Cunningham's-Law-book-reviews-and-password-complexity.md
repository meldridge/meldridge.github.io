---
layout: email
title: Cunningham's Law, book reviews, and password complexity
---

Good morning.

Only a couple of hours after publishing my [Medium article](https://medium.com/@markeldo/reach-out-and-catch-shells-with-ssh-port-forwarding-bdeba3cf440b) on SSH port-forwarding, I discovered the `GatewayPorts` sshd_config option, which natively provides the same functionality as the socat and rinetd tricks I described in the post.

There is one catch with the native method: the SSH server won't let you bind to privileged ports (any port below 1024) [unless you connect as the root user](https://superuser.com/questions/767524/why-can-i-not-connect-to-a-reverse-ssh-tunnel-port-remotely-even-with-gatewaypo). Even with this limitation, it's a far neater solution than the socat or rinetd methods, and I felt extremely silly when I realised I'd completely overlooked it.

As I [joked](https://twitter.com/markeldo/status/993226347924348928) on Twitter, this was a nicely self-contained example of [Cunningham’s Law](https://meta.wikimedia.org/wiki/Cunningham%27s_Law): 
>"The best way to get the right answer on the internet is not to ask a question; it's to post the wrong answer."

### Book Reviews

A brief diversion into book review territory: I've just finished Laura Tingle's [*In Search of Good Government: Great Expectations & Political Amnesia*](https://www.amazon.com/Search-Good-Government-Expectations-Political/dp/1863959289). It's an excellent read, and I commend it to anyone interested in Australian government and politics, or anyone who works with either (which is most of you).

Next on my list is the brilliantly named [*Attack of the 50 Foot Blockchain: Bitcoin, Blockchain, Ethereum & Smart Contracts*](https://read.amazon.com/kp/kshare?asin=B073CPP581&id=i4gu5GpfQa6ogjTupqEGcA&reshareId=AQS20S8SX9F33BHVX4VF&reshareChannel=system) by David Gerard. 

A taster: 

>Bitcoin’s good name having been somewhat stained by drugs and criminals, its advocates try to sell the technology to business as “Blockchain.” $ 1.5 billion of venture capital gets back, so far, zero. The main visible product is consultant hours and press releases. How did we get here?


I'm only a quarter of the way through, but it's already one of my favourite pieces of writing this year. It's a hilarious and extremely pointed summary of the history of cryptocurrencies.

### Password complexity and strength meters

This tweet by Aaron Toponce perfectly summarises the problem with common approaches to password 'complexity':

[![Password Complexity](/images/password-complexity.png)](https://twitter.com/AaronToponce/status/988761412464857088)

We've discussed this issue in previous emails, and Troy Hunt's [Pwned Passwords](https://www.troyhunt.com/ive-just-launched-pwned-passwords-version-2/) project has done an excellent job of highlighting the right way to help users select good passwords: focus on length rather than arbitrary complexity measurements, suggest that they use phrases rather than single words, and blacklist the passwords which are known to be in attacker wordlists so that they can't choose "Password123!" or "Summer2018!".