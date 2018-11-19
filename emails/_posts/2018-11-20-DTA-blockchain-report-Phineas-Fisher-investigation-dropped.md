---
layout: email
title: DTA blockchain report, Phineas Fisher investigation dropped
image: "/images/bankid-card.jpg"
---

Good morning.

It's been over a month since my last email, and I have some bittersweet news to share: my wife was recently offered a great job opportunity back home in Adelaide, so we'll be moving back to Australia in mid December. I'll sincerely miss Stockholm and the friends we've made over the last year (not to mention the <a href="/images/stockholm-broadband.png" target="_blank">internet connectivity</a>), but I am looking forward to seeing friends and family back home. 

I'm now on the hunt for good security or software engineering positions in Adelaide. I have a few leads already, but please feel free to get in contact if you know of anywhere my skills might be a good fit.

Onto the news, and I have quite a bit of catching up to do!

### The DTA report on blockchain

The Australian Government's Digital Transformation Agency recently released a report into blockchain technology, after being allocated $700,000 in the federal budget to research the benefits of blockchain to deliver government services.

From [InnovationAus.com](https://www.innovationaus.com/2018/10/DTA-goes-cold-on-blockchain) (emphasis mine):

>DTA chief digital officer Peter Alexander told a Senate estimates hearing on Tuesday morning that the technology is yet to prove its worth.
>
>“Our position today, and this is an early write-up, is that blockchain is an interesting technology that would be well worth being observed, but without standardisation and a lot more work, **for every use of blockchain that you would consider today there is a better technology**,” Mr Alexander told the hearing.

Yep. This might sound familiar to those of you who have been reading my emails over the last 18 months.

The news of the DTA report prompted the following tweet from David Gerard, author of [*Attack of the 50 Foot Blockchain: Bitcoin, Blockchain, Ethereum & Smart Contracts*](https://read.amazon.com/kp/kshare?asin=B073CPP581&id=i4gu5GpfQa6ogjTupqEGcA&reshareId=AQS20S8SX9F33BHVX4VF&reshareChannel=system):

<a href="https://twitter.com/davidgerard/status/1054510812059066373"><img src="/images/gerard-blockchain.png" alt="Tweet by David Gerard" class="tweet"/></a>

Nice.

### Phineas Fisher gets away with it

The investigation into the [infamous hack](https://motherboard.vice.com/en_us/article/gvye3m/spy-tech-company-hacking-team-gets-hacked) of Italian spyware company Hacking Team has officially been closed.

From [Vice Motherboard](https://motherboard.vice.com/en_us/article/3k9zzk/hacking-team-hacker-phineas-fisher-has-gotten-away-with-it):

>A vigilante hacker who goes by the name Phineas Fisher, who was infamous for breaching Hacking Team’s main competitor FinFisher in 2014, claimed responsibility for the attack. Months later, Phineas Fisher revealed how they did it in a detailed step-by-step post-mortem.
>
>And they got away with it.
>
>In July of this year, an Italian judge ruled that the investigation into who hacked Hacking Team should be shut down, arguing that there are no more leads to follow.

The aforementioned step-by-step post-mortem is still available [on Pastebin](http://pastebin.com/raw/0SNSvyjJ), and it's well worth a read if you haven't already seen it. 

The writeup goes into forensic detail about each stage of the hack, and - despite being three years old - reads like a "how-to" guide for attacking an enterprise network. Most of the techniques listed are still applicable, with the exception of the Powershell post-explotation tooling which (thanks to Windows 10 and [AMSI](https://markeldo.com/Email-update-WireGuard-complexity-security-education-and-C-sharp-for-post-exploitation/)) would be much more likely to be caught now than in 2015.

### Dave Cottingham on the ASD Essential Eight

A recent Twitter conversation brought [this video](https://www.youtube.com/watch?v=E32_RqgoxPs) to my attention: it's a presentation to AusCERT 2018 by David Cottingham, the co-founder of application whitelisting company Airlock Digital.

The presentation goes through each of the mitigation strategies in the [ASD Essential Eight](https://acsc.gov.au/publications/protect/essential-eight-explained.htm), including what they are, how to implement them in practice, and how to audit them. It's only about half an hour long, and worth watching if you have the time.