---
title: Software eating the world, VxWorks bugs, and disclosure
---

Good evening.

It's convention month over in the US, with most of the big annual infosec events (DEF CON, Black Hat, BSides) wrapping up in Las Vegas over the last couple of weeks. I'm still picking my way through presentations, but I particularly wanted to mention this Black Hat keynote by Dino Dai Zovi (emphasis mine): 

[**Every Security Team is a Software Team Now**](https://www.blackhat.com/us-19/briefings/schedule/#every-security-team-is-a-software-team-now-17280)

>As software is eating the world, **every company is becoming a software company**. This doesn’t mean that every company is shipping software products, it means that services and products in every field are becoming increasingly driven, powered, and differentiated by software.

Preach.

### How to pass the OSCP

I've just posted [this guide](https://markeldo.com/how-to-pass-the-oscp/) to passing the infamous 24-hour Offensive Security Certified Professional exam. Most of the tips were written back in 2016 immediately after my own exam, so your mileage may vary. Please pass it on to anyone who might find it useful.

At the beginning of the guide I also provide a link to Alex Dib's ["Passing OSCP"](https://scund00r.com/all/oscp/2018/02/25/passing-oscp.html) blog post. This is an excellent resource, and should be required reading for anyone attempting the exam.

### Bugs in VxWorks TCP/IP stack

This is a story I missed in the last update, but it's a big one. From [Wired](https://www.wired.com/story/vxworks-vulnerabilities-urgent11/):

>VxWorks is designed as a secure, "real-time" operating system for continuously functioning devices, like medical equipment, elevator controllers, or satellite modems. That makes it a popular choice for Internet of Things and industrial control products. But Armis researchers found a cluster of 11 vulnerabilities in the platform's networking protocols, six of which could conceivably give an attacker remote device access, and allow a worm to spread the malware to other VxWorks devices around the world. Roughly 200 million devices appear to be vulnerable; the bugs have been present in most versions of VxWorks going back to version 6.5, released in 2006.

VxWorks is used in a *lot* of embedded systems, and often in those which are safety-critical. It's what's known as a [real-time operating system (RTOS)](https://en.wikipedia.org/wiki/Real-time_operating_system), because it provides certain guarantees about the scheduling of processes: if you need something to happen every 5 milliseconds, in a deterministic manner, with a very small amount of [jitter](https://en.wikipedia.org/wiki/Jitter), you probably want a RTOS.

Unfortunately, this also makes it extremely difficult to patch systems which are using VxWorks. From Wired again:

>Wind River has been working with customers to distribute the patch for almost two months now. But the nature of VxWorks devices—they typically run continuously, and often depend on customized software that requires a tailored patching process—makes it challenging to implement a fix.
>
>“VxWorks is used so pervasively that there’s going to be a very long tail of patching,” says Michael Parker, Armis’ chief marketing officer. “It’s things like firewalls or robotic arms, or think about patient monitors and medical equipment. They have to basically create a whole new operating system and get FDA approval. You can’t just shut down a product line and do these updates.”

These bugs are going to be around for a long time, and if we ever see a WannaCry-style attack using them, it won't be pretty.

### Rashomon of disclosure

Thomas Dullien has written an excellent [blog post](http://addxorrol.blogspot.com/2019/08/rashomon-of-disclosure.html) about the issues associated with vulnerability disclosure:

>None of the questions surrounding vulnerability disclosure, vulnerability discovery, and the trade-offs involved in it are easy. People that claim there is an easy and obvious path to go about security vulnerability disclosure have either not thought about it very hard, or have sufficiently strong incentives to self-delude that there is one true way.
>
>After 20+ years of seeing this debate go to and fro, my request to everybody is: When you explain to the world why you are the hero of your story, take a moment to reflect on alternative narratives, and make an effort to recognize that **the story is probably not that simple.**

It's a great summary of a complicated and multifaceted issue, and I'd highly recommend reading it in full.

### "Time AI" talk ridiculed, retracted by Black Hat

A bit of comedy to close out the news. From [Vice Motherboard](https://www.vice.com/en_us/article/8xw9kp/black-hat-talk-about-time-ai-causes-uproar-is-deleted-by-conference):

>Robert Grant, of a company called Crown Sterling, gave a talk titled: "The 2019 Discovery of Quasi-Prime Numbers: What Does This Mean For Encryption?" in which he explained a mysterious technology called “Time AI.” After attendees criticized it, the conference took it down from its website.
>
>People in attendance, as well as security researchers who were following it on Twitter, made fun of the talk and criticized the conference for letting Grant speak. Dan Guido, the CEO of cyber security consulting firm Trail of Bits even got up and challenged the speaker, accusing him of potentially putting people in danger by pitching an unproven encryption technology.

There's a highly entertaining Twitter thread [here](https://twitter.com/veorq/status/1159559785068429312) by one of the attendees, which also includes a clip of Dan Guido challenging the speaker (shortly before being evicted by security).

Hopefully this will serve as a reminder to Black Hat to vet their sponsored talks a bit more carefully.