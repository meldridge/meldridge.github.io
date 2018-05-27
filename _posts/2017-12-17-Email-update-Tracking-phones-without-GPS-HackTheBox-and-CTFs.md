---
layout: email
title: Tracking phones without GPS, HackTheBox and CTFs
---

It's been a while since my last email, but I'm sure you've all been busy with office Christmas parties!

Aleks Essex, one of the co-authors on my paper regarding the iVote system and use of DDoS protection for online voting, has written an excellent [blog post](https://whisperlab.org/blog/2017/Trust-Implications-of-DDoS-Protection-in-Online-Elections.html) summarising the paper. He's also re-recorded his presentation from the E-Vote-ID conference as well, which is much easier than reading the paper if you're interested.

As for the news, it's been a bit insane for the last few weeks, so here's a fun one which you might have missed:

[**Tracking People Without GPS**](https://www.schneier.com/blog/archives/2017/12/tracking_people_5.html)

>Once it has gathered all of this information and determined the mode of transportation you're currently taking, it can then begin to narrow down where you are. For flights, four algorithms begin to estimate the target's location and narrows down the possibilities until its error rate hits zero.
>
>If you're driving, it can be even easier. The app knows the time zone you're in based on the information your phone has provided to it. It then accesses information from your barometer and magnetometer and compares it to information from publicly available maps and weather reports. After that, it keeps track of the turns you make. With each turn, the possible locations whittle down until it pinpoints exactly where you are.
>
>To demonstrate how accurate it is, researchers did a test run in Philadelphia. It only took 12 turns before the app knew exactly where the car was.

This is one of those pieces of research which is simultaneously incredibly cool and incredibly creepy. If you want to avoid this sort of tracking, you realistically have two options: 1) put your phone in the bin, or 2) trust that your phone's manufacturer and OS-developer have your privacy in mind. Unfortunately, there's not much more you can do other than trust the manufacturer with your privacy when you're carrying around something full of sensors. 

This next one is for the pentesters in the audience:

[**HackTheBox**](https://www.hackthebox.eu/)

>Hack The Box is an online platform allowing you to test your penetration testing skills and exchange ideas and methodologies with other members of similar interests. It contains several challenges that are constantly updated. Some of them simulating real world scenarios and some of them leaning more towards a CTF style of challenge.
>
>As an individual, you can complete a simple challenge to prove your skills and then create an account, allowing you to connect to our private network (HTB Labs) where several machines await for you to hack them. By hacking machines you get points that help you advance in the Hall of Fame.
>
>Go ahead and try to hack the invite code in order to become a member!

When I discovered HackTheBox, my first reaction was "how did I not hear about this until now?" For those of you who are familiar with Capture the Flag challenges, and particularly the Offensive Security [PWK/OSCP](https://www.offensive-security.com/information-security-training/penetration-testing-training-kali-linux/) labs, HackTheBox is basically that, but for free.

For everyone else, this is effectively an online "firing range" for practicing hacking. When you sign up, you're given details allowing you to connect to a Virtual Private Network (VPN) containing a number of intentionally vulnerable systems. The objective is to break into each system and obtain 'proof' files. With each system you manage to compromise, you score points.

I've only spent a couple of days in the lab, but so far I'm impressed. The systems are well designed, and the website interface is incredibly slick - an addictive combination. It's an excellent way to learn and practice offensive security techniques.

One complication is the [sign-up/invite process](https://www.hackthebox.eu/invite), which requires you to 'hack' your way into the system and pull out an invite code yourself. It's a bit of a gimmick, but it's an effective way to set a floor on the skill level of users. For those of you who are keen, let me know how you go!