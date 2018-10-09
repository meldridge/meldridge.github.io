---
layout: email
title: Supermicro and Facebook follow-up, Dutch GRU operation, and Derbycon talks
---

Good morning.

What a week. It's becoming difficult to make these _weekly_ summaries, because there's just so much going on in the security world these days.

### Supermicro follow-up

Since [Monday's post](https://markeldo.com/Supermicro-hardware-trojans-and-BMC-security/) there have been some more developments in the Supermicro hardware trojan story.

First up: Patrick Gray recorded [another podcast episode](https://risky.biz/RB517_feature/) where he interviewed Joe Fitzpatrick, one of the few named sources  in the original Bloomberg article. If you don't have time to listen to the episode, Apple Insider has a good summary [here](https://appleinsider.com/articles/18/10/08/security-researcher-cited-in-bloombergs-china-spy-chip-investigation-casts-doubt-on-storys-veracity).

Since the original story broke, Fitzpatrick has also written some excellent Twitter threads on hardware implants generally. One example (from the end of the thread):

<a href="https://twitter.com/securelyfitz/status/1049415623011266560"><img src="/images/supermicro-fitzpatrick.png" alt="Tweet by Joe Fitzpatrick" class="tweet"/></a>

Former NSA member Robert M. Lee also weighed in regarding a previous Bloomberg story authored by the same journalists, which claimed that a pipeline explosion in Turkey was a Russian cyber attack:

<a href="https://twitter.com/RobertMLee/status/1049617855396933632"><img src="/images/supermicro-lee.png" alt="Tweet by Robert M. Lee" class="tweet"/></a>

In both cases, it's worth reading the full thread.

And finally, Brian Krebs has written an excellent [blog post](https://krebsonsecurity.com/2018/10/supply-chain-security-is-the-whole-enchilada-but-whos-willing-to-pay-for-it/) about the Supermicro hardware trojan story and supply-chain security more generally:

>Like it or not, the vast majority of electronics are made in China, and this is unlikely to change anytime soon. The central issue is that we don’t have any other choice right now. The reason is that by nearly all accounts it would be punishingly expensive to replicate that manufacturing process here in the United States.

### Facebook follow-up: third-party website SSO implementations

Some follow-up to my [Facebook post](https://markeldo.com/Facebook-and-the-trade-off-of-centralised-authentication/) from last week, via Jason Polakis:

<a href="https://twitter.com/jpolakis/status/1046094369831485440"><img src="/images/facebook-sso-polakis.png" alt="Tweet by Jason Polakis" class="tweet"/></a>

I'd highly recommend reading the whole thread, but to rephrase this part: if a third-party service you use (like Tinder or Airbnb) has integrated with Facebook Login to allow single-sign-on (SSO), but you personally don't use this functionality, it may still be possible for an attacker who has a copy of your Facebook user access token to log into the third-party service as you.

Think of it this way: depending on how the site has implemented Facebook's SSO, giving them a stolen Facebook token which matches your email address might pass their user authentication code, telling the back-end of the service _"yep, this is a valid login for jane.doe@gmail.com"_. Depending on how the service is written, this could be possible even if Jane Doe doesn't actually use Facebook SSO for that service.

The implication of this is that if Facebook allows an attacker to steal 50 million user access tokens, the number of affected accounts *across all services which integrate with Facebook Login* starts getting very large - and as it stands, users aren't really aware of the risk this poses.

Polakis knows his stuff when it comes to Facebook SSO: he co-authored a [paper](https://www.cs.uic.edu/~polakis/papers/sso-usenix18.pdf) on the implications of compromised Facebook accounts which was accepted at USENIX 2018.

### Dutch intelligence breaks up GRU cyber operation

In any normal news week this would have been the leading story. From [Business Insider](https://www.businessinsider.com/russia-gru-caught-hacking-into-opcw-via-wifi-dutch-intelligence-says-2018-10):

>Four Russian intelligence agents were caught trying to hack the global chemical weapons watchdog while it was investigating their country, Dutch authorities said on Thursday.
>
>The suspects traveled to the Netherlands this April to try to launch a cyberattack on Organisation for the Prohibition of Chemical Weapons, which is headquartered in The Hague, the head of Dutch military intelligence said in a press conference.
>
>Major General Onno Eichelsheim said the OPCW was at the time investigating the nerve agent poisoning of former Russian spy Sergei Skripal in England, as well as a chemical attack on Douma, Syria.

There's also [this Twitter thread](https://twitter.com/gordoncorera/status/1047788913690140673) by Gordon Corera, which has some more technical detail about what the Russians were doing.

In addition, in the process of confirming the identities of the arrested agents, investigative news site Bellingcat [was able to identify over 300 other potential GRU agents](https://www.bellingcat.com/news/2018/10/04/305-car-registrations-may-point-massive-gru-security-breach/) from a public Russian car registration database. Whoops.

### Derbycon 2018 Presentations

The Derbycon security conference recently wrapped up in the U.S., and there are some fantastic presentations I'd highly recommend watching if you have time:

1. [The Unintended Risks of Trusting Active Directory](https://www.youtube.com/watch?v=-bcWZQCLk_4) (SpecterOps: Lee Christensen, Will Schroeder, and Matt Nelson)
2. [From Workstation to Domain Admin: Why Secure Administration Isn't Secure and How to Fix It](https://www.youtube.com/watch?v=Wdbm2_1tn14) (Sean Metcalf of ADSecurity.org)
3. [The MS Office Magic Show](https://www.youtube.com/watch?v=xY2DIRfqNvA) (Stan Hegt, Pieter Ceelen)

I'm still working my way through the other talks, so to save me some time - if you have any personal favourites, please let me know!