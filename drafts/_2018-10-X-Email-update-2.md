---
layout: email
title: 
---

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



### Supermicro

Another piece of follow-up: I had some discussions online following the news where several people asked: *"Why not just backdoor the BMC firmware directly from the factory? Why go to the effort of installing a hardware chip to modify the firmware when it's loaded?"*

It's a good question, and Matthew Garrett did a good job of answering it:

<a href="https://twitter.com/mjg59/status/1048080735003787264"><img src="/images/supermicro-garrett.png" alt="Tweet by Matthew Garrett" class="tweet"/></a>

In other words, there's no reason you couldn't just backdoor the firmware image without installing any hardware (this [also happened](https://www.bloomberg.com/news/articles/2018-10-04/the-big-hack-the-software-side-of-china-s-supply-chain-attack)), but this would be detectable by anyone who dumped it to compare to the "legitimate" image from the motherboard vendor. 

It's debatable whether this is more or less stealthy than going through the logistical effort of installing hardware implants at the factory.