---
layout: post
title: Facebook and the trade-off of centralised authentication
image: "/images/facebook-shatter.jpg"
excerpt: "Having 50 million accounts breached is bad enough, but the bigger issue is that a huge number of third-party services use Facebook to authenticate their users."
---

To put it mildly, Facebook has had a bad week.

From [Motherboard](https://motherboard.vice.com/en_us/article/bja7qq/how-50-million-facebook-users-were-hacked):

>On Friday, Facebook revealed that hackers broke into the company’s servers and potentially stole the data of up to 50 million people.
>
>The social network forced 90 million people—around 50 million victims plus an additional 40 million that may have been affected, according to the company—to log out and log back in again.

I'm not a fan of the _"broke into the company's servers"_ description, because it implies that the attackers got a shell on Facebook's servers and then exfiltrated data. That's not what happened.

To summarise:
- There were three separate bugs in Facebook relating to the "View As" feature and a video upload tool. 
- These bugs meant that it was possible to obtain a [User Access Token](https://developers.facebook.com/docs/facebook-login/access-tokens/) for a different user than the one you were logged in as, without needing their password.
- The attackers performed the above for 50 million accounts, which meant they could impersonate any one of these 50 million users on Facebook *and any other services they use Facebook to authenticate to.*
- An additional 40 million accounts had been subject to a "View As" lookup in the time since the bug was originally introduced, and therefore could potentially have been compromised as well.
- Facebook has since invalidated all User Access Tokens for the 90 million affected accounts. This manifests to the user as a forced log-out. No password reset is necessary, because passwords were never compromised.

That last bit can seem confusing to many people, since we tend to think the password is an essential part of impersonating a user. 

In reality, once you have a User Access Token for a user, *you are that user* from the perspective of the Facebook API. The username/password (and 2FA, if enabled) is just the prerequisite for obtaining a valid token to begin with.

That's part of what makes this compromise such a big deal: it didn't matter how good your password was, or what level of multi-factor authentication you were using to protect your Facebook account. This bug meant that the attackers could walk right around those security measures and obtain a token directly.

### Facebook login: a single key to unlock many doors

Having 50 million accounts breached is bad enough, but the bigger issue is that a huge number of other services utilise [Facebook login](https://developers.facebook.com/docs/facebook-login/) to authenticate users. This includes services like Instagram, Tinder, Spotify, Airbnb, Duolingo, and even [GitHub](https://help.github.com/articles/recovering-your-account-if-you-lose-your-2fa-credentials/). 

There are [hundreds](https://www.slideshare.net/Neolane/analysis-of-150-websites-using-facebook-login) of services which use Facebook in this way, and for good reason: if you're running an online service and you don't *need* to control user accounts directly, it's much easier and more secure to let Facebook handle it for you.

The downside is that this means that if an attacker manages to steal a valid Facebook User Access Token for *"Jane Doe"*, they can also impersonate Jane across all of the other services as well. Even if Jane doesn't care about her Facebook account being hacked, she might to care a lot more about Tinder, Airbnb, or GitHub.

Matt Blaze [summarised](https://twitter.com/mattblaze/status/1045833186603872264) this problem well:

<a href="https://twitter.com/mattblaze/status/1045833186603872264"><img src="/images/facebook-sso-blaze.png" alt="Tweet by Matt Blaze" style="width: 100%; max-width: 450px; display: block; margin: 0 auto; border:1px solid black;"/></a>

Google provides a similar authentication system with [Google Sign-In](https://developers.google.com/identity/), which covers even more services than Facebook does. One notable example is cloud infrastructure provider [DigitalOcean](https://www.digitalocean.com/docs/accounts/security/#use-google-sso-for-login), a competitor to Amazon Web Services and Microsoft Azure. 

Imagine for a moment if there was a similar bug in Google's services which caused 90 million Google accounts to be breached, and you're an organisation using DigitalOcean for all of your cloud infrastructure, and several of your engineers were affected...

<a href="https://twitter.com/tqbf/status/1045825117362814976"><img src="/images/facebook-sso-ptacek.png" alt="Tweet by Thomas H. Ptacek" style="width: 100%; max-width: 450px; display: block; margin: 0 auto; border:1px solid black;"/></a>

Yep. At the very least, this would mean checking through your audit logs to make sure that none of your compromised accounts were used by the attacker to access your infrastructure. At worst... well, not every service provides good audit logs.

### Security trade-offs and centralised authentication providers

Wired published a [follow-up article]([Wired](https://www.wired.com/story/facebook-security-breach-third-party-sites/)) to the initial reporting on the breach, which nicely outlined the compromise inherent in using centralised authentication providers like Facebook Login and Google Sign-In:

>The debacle also underscores broader concerns about Single Sign-On, which Friday turned into the ultimate object lesson in the inherent tradeoffs between security and convenience. "Single Sign-on schemes are great in the sense that the federal reserve cash vault in Atlanta is dramatically more secure than the safe at a local credit union," says Kenn White, director of the Open Crypto Audit Project. "But the downside is if a Single Sign-on gets breached you're hosed."
>
>Sticking with one more secure sign-in does make sense, especially for use on sites that don't have the resources or inclination to invest heavily in security development. But just like you want your passwords to be unique so compromising one doesn't expose them all, account diversity is also vital online no matter how ironclad a particular sign-in scheme is. "You don't want a situation where there's one breach and your entire online identity is gone," White says.

This is yet another [security trade-off](https://markeldo.com/Security-is-always-a-trade-off/), and for most users it's a worthwhile one: it's hard to get people to use unique passwords for every service, and they're unquestionably better off by having a single well-protected account (Google or Facebook) which is then used to log into other services.

The trade-off, of course, is that you're putting all of your eggs in one basket.

Still, I'd argue that for Google accounts in particular, this trade-off is worth it. Google [supports](https://landing.google.com/advancedprotection/) the most secure multi-factor authentication methods, and generally tends to do a good job with account security. Besides, if an attacker has access to your Google account, and you use Gmail, they can already access password reset emails.

Just don't forget: when you use a centralised authentication provider, you're trusting the provider with access to everything you link it to. For some threat models, this is the wrong trade-off to make.