---
layout: email
title: New website, and GDPR-mageddon
---

A quick announcement: you might notice that the subject heading no longer contains "KATTFAKTA". I've decided to retire the old in-joke due to new subscribers rightly having no idea what it's in reference to. *(It's in reference to [this](https://www.reddit.com/r/funny/comments/owx3v/so_my_little_cousin_posted_on_fb_that_he_was/), combined with some Swedish. It was funnier at the time.)*

### New website: [markeldo.com](https://markeldo.com)

In other news, I now have a proper blog up and running: **<https://markeldo.com>**

The site will eventually contain all of my previous KATTFAKTA emails (I'm up to last October so far), and any long-form articles I write. As always, feedback is welcome!

I created the website partly just to make life easier referencing previous emails, but primarily to act as a [portfolio of work](https://www.troyhunt.com/why-online-identities-are-smart-career/) for my career. Writing is something I've always enjoyed, and writing about security is an excellent way to keep up-to-date with the latest in my field.

For those interested, the site uses GitHub Pages and the Jekyll blogging engine, which makes publishing from Markdown posts (like I use for these emails) an absolute breeze. 

### GDPR-mageddon

The European General Data Protection Regulation (GDPR) came into effect last Friday, which is what caused the recent flood of *"we've updated our privacy policy"* emails from various services. 

For those not already familiar with GDPR, I won't bother trying to summarise it here, but suffice to say that compliance with it was a Very Big Deal for many European companies for the least 2 years, because the penalties for breaches are extremely large: 4% of annual global turnover or €20 Million, whichever is greater.

Of course, not everyone did a good job of their compliance:

[**Ghostery Tries to Comply With GDPR, but Ends Up Violating GDPR in the Process**](https://www.bleepingcomputer.com/news/technology/ghostery-tries-to-comply-with-gdpr-but-ends-up-violating-gdpr-in-the-process/)

>The company behind Ghostery, a privacy-focused browser and an ad-blocking browser extension,  has apologized for a technical error that occurred last Friday when its staff was sending out GDPR-themed notification emails.
>
>According to numerous user reports, Ghostery sent out emails that exposed the addresses of other users.

Yep, they sent all of their *"we've updated our privacy policy"* emails in batches of 500, and all of the email addresses were in the `To:` field. Whoops.

Of course, I can't really crow too loudly here since I made the same mistake a couple of times when I first started this mailing list. Poor Ghostery.

There was also the New York Times, with something which should bring a smile to the face to anyone who's been involved in a Reply-All war:

[<img src="../images/ben-thompson-nyt-gdpr.png" alt="Ben Thompson on the NYT Reply-All war" width="500">](https://twitter.com/benthompson/status/1000172240367857664)

(Incidentally, if you're not already reading Ben Thompson's [Stratechery](https://stratechery.com/) blog, I'd highly recommend it. The podcast is also excellent.)

A large number of American news websites and [other services](https://www.theverge.com/2018/5/23/17387146/instapaper-gdpr-europe-access-shut-down-privacy-changes) seem to have only realised at the last-minute that they *also* needed to comply with GDPR if they served European users. Rather than bothering to comply, they simply turned off their servers for any European users.

USA Today, however, did something different: for European users, they disabled all of their tracking scripts:

[<img src="../images/paul-calvano-usa-today-gdpr.png" alt="Ben Thompson on the NYT Reply-All war" width="500">](https://twitter.com/paulcalvano/status/1000094333524201473)

That probably says more about modern website practices (and [business models](https://stratechery.com/2017/the-local-news-business-model/)*) than anything else, but it's a nice little perk of GDPR.


_*Like I said, Stratechery is worth reading._