---
layout: email
title: My Health Record, Reddit hacked, and security keys
---

Good morning.

I'm back in Stockholm after a nice holiday in Norway, and its good to be back writing again. A lot has happened since I left!

Some follow-up to the [last email](https://markeldo.com/Email-update-The-Mueller-Indictments-NPM-Arch-Gentoo-and-Ticketmaster-UK/): we covered the Ticketmaster UK hack where the attackers compromised an embedded JavaScript module to steal credit card details. [This video](https://www.youtube.com/watch?v=Kpl3BGYtY7g) goes into detail about how UK bank Monzo detected the compromise months beforehand, and warned Ticketmaster ([without success](https://www.theregister.co.uk/2018/06/28/ticketmaster_monzo_inbenta/)). It's interesting viewing.

### Dot-terminating domain names for domain blacklisting

A quick one to start with: Sucuri has an excellent [blog post](https://blog.sucuri.net/2018/07/coinimp-cryptominer-and-fully-qualified-domain-names.html) regarding the use of dot-terminated domain names to bypass domain blacklists:

>Taking advantage of this little-known fact may help bad actors avoid detection by web security and ad-blocking software that have been developed without accounting for the optional final period in domain names. Such software may either consider URLs with these type of domains invalid and ignore them. Or it may think that “example.com” and “example.com.” are different domains and will not warn if it comes across a variant that was not in the blacklist.

It's a cute trick, and yet another example of why blacklists are a fragile security measure.

### My Health Record

This story has been major news in Australia for the last few weeks, ever since the [opt-out period started](https://www.computerworld.com.au/article/643821/my-health-record-opt-out-window-opens/) on July 16.

To briefly summarise: the My Health Record system is a major Australian Government IT project which aims to consolidate every citizen's healthcare information into an electronic record which can be accessed by any healthcare provider they might use.

I'm planning to write a proper blog post about this topic in the next couple of weeks, because it sits nicely at the intersection of many of the issues we've covered in [previous](https://markeldo.com/Email-update-Australian-Digital-Government-Report-and-myGovID/) [emails](https://markeldo.com/Email-update-CentrelinkFail-and-IBM-wins-billion-dollar-contract/) (not to mention my [Master’s thesis](https://markeldo.com/docs/Thesis-Final.pdf)): security, public trust, and the Australian government's history of failed IT projects.

In the meantime, [this article](https://www.canberratimes.com.au/politics/act/bungled-my-health-record-launch-represents-a-missed-opportunity-20180718-p4zs6z.html) is a good summary, as is [this interview](https://overcast.fm/+i39C_reY) with Paul Shetler, the former head of the Government's Digital Transformation Agency.

### Reddit hacked

A few days ago, Reddit made [this announcement](https://www.reddit.com/r/announcements/comments/93qnm5/we_had_a_security_incident_heres_what_you_need_to/):

>On June 19, we learned that between June 14 and June 18, an attacker compromised a few of our employees’ accounts with our cloud and source code hosting providers. Already having our primary access points for code and infrastructure behind strong authentication requiring two factor authentication (2FA), we learned that SMS-based authentication is not nearly as secure as we would hope, and the main attack was via SMS intercept. We point this out to encourage everyone here to move to token-based 2FA.

This is the interesting angle to this story: Reddit's employees were using SMS for two-factor authentication, and they were hacked anyway.

The Reddit announcement came only shortly after a [big story by Motherboard](https://motherboard.vice.com/en_us/article/vbqax3/hackers-sim-swapping-steal-phone-numbers-instagram-bitcoin) on the increasing prevalence of these kinds of attacks:

>In February, T-Mobile sent a mass text warning customers of an “industry-wide” threat. Criminals, the company said, are increasingly utilizing a technique called “port out scam” to target and steal people’s phone numbers. The scam, also known as SIM swapping or SIM hijacking, is simple but tremendously effective.
>
>First, criminals call a cell phone carrier’s tech support number pretending to be their target. They explain to the company’s employee that they “lost” their SIM card, requesting their phone number be transferred, or ported, to a new SIM card that the hackers themselves already own. With a bit of social engineering—perhaps by providing the victim’s Social Security Number or home address (which is often available from one of the many data breaches that have happened in the last few years)—the criminals convince the employee that they really are who they claim to be, at which point the employee ports the phone number to the new SIM card.

For these reasons [and others](https://twitter.com/dotMudge/status/1025398318908751872), SMS has long been considered a weak 2FA method, but it's still a *lot* better than relying on a password alone.

Brian Krebs has a good summary of the Reddit attack and its implications [here](https://krebsonsecurity.com/2018/08/reddit-breach-highlights-limits-of-sms-based-authentication/):

>If the only 2FA options offered by a site you frequent are SMS and/or phone calls, this is still better than simply relying on a password. But it’s high time that popular Web sites of all stripes start giving their users more robust authentication options like TOTP and security keys.

This is another situation where it becomes important to consider your threat model. For critical services like your bank or your email account—remember, if someone gets your email, they can reset a *lot* of other accounts—you should be using something stronger than SMS: a TOTP code like Google Authenticator, or (preferably) a [physical security key](https://www.yubico.com/product/security-key-by-yubico/).

At the other end of the scale (e.g. a throwaway forum account), an account compromise isn't as much of a world-ending disaster. It's still worth using 2FA if you can (once you know how to do it, the marginal cost is low), but prioritise the critical services first.

Remember: good security is about knowing what data you care about, and what convenience trade-offs you're willing to make to protect it.

### The strongest form of 2FA: physical security keys

We've discussed security keys previously in the form of the [Web Authentication standard](https://markeldo.com/Web-Authentication-Bank-ID-and-the-death-of-the-password/), and they're the best 2FA authentication solution available for services which support them.

Google recently announced that they'd completely killed phishing attacks against their employees, by mandating that all employees use physical security keys to access critical systems.

From [Brian Krebs again](https://krebsonsecurity.com/2018/07/google-security-keys-neutralized-employee-phishing/):

>Google has not had any of its 85,000+ employees successfully phished on their work-related accounts since early 2017, when it began requiring all employees to use physical Security Keys in place of passwords and one-time codes, the company told KrebsOnSecurity. [...]
>
>A Google spokesperson said Security Keys now form the basis of all account access at Google.
>
>“We have had no reported or confirmed account takeovers since implementing security keys at Google,” the spokesperson said. “Users might be asked to authenticate using their security key for many different apps/reasons. It all depends on the sensitivity of the app and the risk of the user at that point in time.”

Google also announced that they'll soon be releasing their [Titan Security Key](https://thehackernews.com/2018/07/google-titan-security-key-fido.html) to compete with existing solutions from companies like Yubico. 

This is a logical decision by Google. With 85,000+ employees, they'd be in need of hundreds of thousands of security keys (plus replacements), and they clearly have the in-house engineering talent to build themselves rather than buying them externally.