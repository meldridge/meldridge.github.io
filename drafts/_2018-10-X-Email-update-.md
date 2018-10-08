---
layout: email
title: 
---

Good morning.

What a week. It's becoming difficult to make these _weekly_ summaries, because there's just so much going on in the infosec world these days.

### Dutch intelligence breaks up GRU cyber operation

In any normal week... https://twitter.com/gordoncorera/status/1047788913690140673


### Facebook follow-up: third-party website SSO implementations

Some follow-up to my [Facebook post](https://markeldo.com/Facebook-and-the-trade-off-of-centralised-authentication/) from earlier in the week: https://twitter.com/jpolakis/status/1046094369831485440

### PAC bypass

In a [previous email](https://markeldo.com/Email-update-AMSI-for-macros-iPhone-PACs-reinventing-the-URL-and-infosec-resilience/) we discussed the use of authenticated pointers (PAC) in the latest iPhones, and how the technology is likely to make iOS exploit development significantly more difficult. Of course, no mitigation is perfect. Apparently a Chinese team has [already written an iOS 12 jailbreak](https://twitter.com/SparkZheng/status/1045265728318754816) which bypasses PAC.

### Office kills DDE by default

- https://twitter.com/secbughunter/status/1047230349732864000
- https://support.office.com/en-us/article/disabling-dynamic-data-exchange-dde-with-group-policy-1cad6409-5c06-485d-bbed-614b3195b091


### Reconnaissance and open-Source intelligence

OSINT

https://posts.specterops.io/gathering-open-source-intelligence-bee58de48e05
https://github.com/chrismaddalena/ODIN



### Fancy bear and firmware implants

https://www.welivesecurity.com/2018/09/27/lojax-first-uefi-rootkit-found-wild-courtesy-sednit-group/

https://www.wired.com/story/fancy-bear-hackers-uefi-rootkit/?mbid=social_twitter

https://twitter.com/ortegaalfredo/status/1045449915827212290
https://www.theregister.co.uk/2018/09/28/uefi_rootkit_apt28/
https://2016.zeronights.ru/wp-content/uploads/2016/12/1_2_UEFI_Rootkits_ZN_2016.pdf

When it comes to [persistence mechanisms](https://attack.mitre.org/wiki/Persistence), this is the gold standard - your implant will survive a reinstall of the OS and even complete replacement of the hard drive.

