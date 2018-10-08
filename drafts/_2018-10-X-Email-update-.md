---
layout: email
title: Dutch intelligence catches GRU cyber team, Supermicro and Facebook follow-up
---

Good morning.

What a week. It's becoming difficult to make these _weekly_ summaries, because there's just so much going on in the security world these days.

### Dutch intelligence breaks up GRU cyber operation

In any normal news week this would have been the leading story. From [Business Insider](https://www.businessinsider.com/russia-gru-caught-hacking-into-opcw-via-wifi-dutch-intelligence-says-2018-10):

>Four Russian intelligence agents were caught trying to hack the global chemical weapons watchdog while it was investigating their country, Dutch authorities said on Thursday.
>
>The suspects traveled to the Netherlands this April to try to launch a cyberattack on Organisation for the Prohibition of Chemical Weapons, which is headquartered in The Hague, the head of Dutch military intelligence said in a press conference.
>
>Major General Onno Eichelsheim said the OPCW was at the time investigating the nerve agent poisoning of former Russian spy Sergei Skripal in England, as well as a chemical attack on Douma, Syria.

There's also [this Twitter thread](https://twitter.com/gordoncorera/status/1047788913690140673) by Gordon Corera, which has some more technical detail about what the Russians were doing.

### Supermicro follow-up

I missed while I was drafting [yesterday's post](https://markeldo.com/Supermicro-hardware-trojans-and-BMC-security/): Brian Krebs has written an excellent [blog post](https://krebsonsecurity.com/2018/10/supply-chain-security-is-the-whole-enchilada-but-whos-willing-to-pay-for-it/) about the Supermicro hardware trojan story and supply-chain security more generally:

>Like it or not, the vast majority of electronics are made in China, and this is unlikely to change anytime soon. The central issue is that we don’t have any other choice right now. The reason is that by nearly all accounts it would be punishingly expensive to replicate that manufacturing process here in the United States.

Another piece of follow-up: I had some discussions online following the news where several people asked: *"Why not just backdoor the BMC firmware directly from the factory? Why go to the effort of installing a hardware chip to modify the firmware when it's loaded?"*

It's a good question, and Matthew Garrett did a good job of answering it:

<a href="https://twitter.com/mjg59/status/1048080735003787264"><img src="/images/supermicro-garrett.png" alt="Tweet by Matthew Garrett" class="tweet"/></a>

In other words, there's no reason you couldn't just backdoor the firmware image without installing any hardware (this [also happened](https://www.bloomberg.com/news/articles/2018-10-04/the-big-hack-the-software-side-of-china-s-supply-chain-attack)), but this would be detectable by anyone who dumped it to compare to the "legitimate" image from the motherboard vendor. 

It's debatable whether this is more or less stealthy than going through the logistical effort of installing hardware implants at the factory.

### Facebook follow-up: third-party website SSO implementations

Some follow-up to my [Facebook post](https://markeldo.com/Facebook-and-the-trade-off-of-centralised-authentication/) from last week, via Jason Polakis:

<a href="https://twitter.com/jpolakis/status/1046094369831485440"><img src="/images/facebook-sso-polakis.png" alt="Tweet by Jason Polakis" class="tweet"/></a>

I'd highly recommend reading the whole thread, but to rephrase this part: if a third-party service you use (like Tinder or Airbnb) has integrated with Facebook Login to allow single-sign-on (SSO), but you personally don't use this functionality, it may still be possible for an attacker who has a copy of your Facebook user access token to log into the third-party service as you.

Think of it this way: depending on how the site has implemented Facebook's SSO, giving them a stolen Facebook token which matches your email address might pass their user authentication code, telling the back-end of the service "yep, this is a valid login for jane.doe@gmail.com". Depending on how the service is written, this could be possible even if Jane Doe doesn't actually use Facebook SSO for that service.

The implication of this is that if Facebook allows an attacker to steal 50 million user access tokens, the number of affected accounts *across all services which integrate with Facebook Login* starts getting very large - and as it stands, users aren't really aware of the risk this poses.

Polakis knows his stuff when it comes to Facebook SSO: he co-authored a [paper](https://www.cs.uic.edu/~polakis/papers/sso-usenix18.pdf) on the implications of compromised Facebook accounts which was accepted at USENIX 2018.