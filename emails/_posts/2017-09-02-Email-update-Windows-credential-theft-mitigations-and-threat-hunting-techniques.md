---
layout: email
title: Windows credential theft, mitigations, and threat hunting techniques
---

There was recently an email thread on one of the SANS mailing lists recently discussing various methods for mitigating credential theft on Windows endpoints, and this excellent slide deck was shared by Julien Touche:

[**Windows Credentials: Attacks and Mitigation Techniques**](https://www.first.org/resources/papers/conf2017/Windows-Credentials-Attacks-and-Mitigation-Techniques.pdf)

It’s well worth reading and saving for future reference, as it nicely summarises all of the common methods for pulling credentials on Windows systems, and the various mitigations (some more effective than others).

I’ve also attached my reply to the thread below, because it contains another couple of links which are worth reading: one on the various Windows patches and mitigation methods, and the other relating to use of ‘canary credentials’ to give defenders a useful signal that someone is harvesting credentials and using them. 

Some of you might recall that this last technique was also part of Joff Thyer’s presentation on [Hunting Persistent Threats](https://www.aisa.org.au/Public/Events/Event_Display.aspx?EventKey=49547f4f-be5e-41e6-a0b6-a56c683d9179) given in July.

>From: Mark Eldridge  
>Date: Tue, 29 Aug 2017 at 9:11 am  
>Subject: Re: [advisory-board-open] Defending Mimikatz and other cache dumps
>
>As Ray mentioned, Windows 10 Credential Guard is a good option if it's available to you. 
>
>If you don't have access to that, ensure wdigest credential caching is disabled, and make use of the Protected Users security group. This technet blog by Brandon Wilson is worth reading: <https://blogs.technet.microsoft.com/askpfeplat/2016/04/18/the-importance-of-kb2871997-and-kb2928120-for-credential-protection/>
>
>Other than that, there are no really reliable ways to prevent someone harvesting credentials if they have root or SYSTEM privileges on your devices, because any offline authentication method needs to store a representation of the user's password. The same goes for plaintext credentials if the devices are still being actively used. At the end of the day they could just install a keylogger. The best you can do is improve your detection methods and limit the damage.
>
>I've seen some clever methods for detecting credential theft and re-use involving use of honey tokens or 'canary credentials' - Mark Baggett wrote about this back in 2015: <https://isc.sans.edu/diary/Detecting+Mimikatz+Use+On+Your+Network/19311>