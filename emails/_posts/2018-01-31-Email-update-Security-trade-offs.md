---
layout: email
title: Security trade-offs
---

Some big news today from Australia: some bright spark in Parliament apparently sent a filing cabinet full of Top Secret codeword documents to be sold off. Someone purchased it and drilled the locks, and the ABC is now [publishing the juicy details](http://mobile.abc.net.au/news/2018-01-31/cabinet-files-reveal-inner-government-decisions/). 'Whoops' doesn't quite cover it.

Anyway, the topic for today is more general. Part of my role at Qliro is to improve security awareness within the company, and I recently had the pleasure of presenting my first workshop on offensive security and "Modern Hacking".

There were two major themes of my presentation: the fact that this stuff is a lot easier than it looks ("being a script kiddy has never been easier"), and good password practices.


### Everything is a Trade-Off 

All security decisions are a trade-off between convenience and security. In my presentation, I use the example of choosing good passwords:

![Security is always a trade-off](/images/security-trade-off.png)

This applies to more than just password practices: privileged account restrictions, web filtering, PED policies, application whitelisting, network segmentation... in infosec, every tool at our disposal comes with tradeoffs. The important thing is to recognise that fact, and decide where on the spectrum you need to be for your particular threats and risk profile. 

Also, it goes without saying that some things have a better ratio of "security improvement to convenience reduction" than others - using a password manager is definitely one of these. When your current practice involves using the same password on a large number of services, using a password manager is a massive security benefit for only a slight inconvenience (especially if you use one the more popular cloud-based password managers).

Of course, password managers themselves have their own security to convenience trade-offs, such as the aforementioned cloud storage: less secure than if the encrypted database never left your home computer, but much more convenient for anyone who uses more than one device.


### Good Password Practices 

I spent quite a bit of time talking about good password practices, due to the ease with which attackers can steal one or more of your passwords: phishing emails, using unencrypted connections, [services being hacked and having hashed passwords exposed](https://haveibeenpwned.com/), etc.

When it comes to password practices, the following rules are the correct trade-off for most people:

1. **Use a password manager and create unique passwords for the things you use**
    - e.g.: KeyPass, LastPass, 1Password, Dashlane, Password Safe, pass
2. **Use long passphrases for anything where you can’t easily store it in a password manager**
    - They’re much easier to remember than random letters and numbers
    - Use these for your password manager master password and your work account
3. **Use multi-factor authentication wherever you can**
    - This means the bad guys need your phone as well as your password (much, much harder)

For those interested, the videos of the demonstrations I performed during the presentation are [here](https://www.youtube.com/playlist?list=PLosuAlDEwv--4orzBUVy-TzLzxMDK3TKI), and a PDF of the presentation slides is available [here](https://www.dropbox.com/s/0oqp2kzvhgt648n/Qliro%20Academy%20-%20Introduction%20to%20Modern%20Hacking.pdf?dl=0). Note that I also did a lot of talking (the videos don't have any spoken audio), but you should get the general idea from the slides themselves.