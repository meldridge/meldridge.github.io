---
layout: email
title: Pwned passwords
---

Good morning!

This is the third time sending one of these via MailChimp, so please bear with me if they're continuing to get stuck in your spam filter. The easiest way to avoid this is to add this email address into your contacts list, but that assumes you're actually in control of your spam filtering. If not, well.. enjoy the peace and quiet!

### Pwned Passwords Version 1

Troy Hunt is a reasonably well known guy in infosec: he runs the [haveibeenpwned.com](https://haveibeenpwned.com/) online service, and has his own [blog](https://www.troyhunt.com/) focussing on password and web application security. He also has his own podcast, which is  worth the time if you're looking for more podcasts to add to your pile.

(Incidentally, if you're remotely involved in web application security, I'd highly recommend reading his recent blog post on [Content Security Policy (CSP) and Subresource Integrity (SRI)](https://www.troyhunt.com/the-javascript-supply-chain-paradox-sri-csp-and-trust-in-third-party-libraries/). They're excellent explanations of both technologies.)

Last August, Troy launched the [Pwned Passwords](https://www.troyhunt.com/introducing-306-million-freely-downloadable-pwned-passwords/) list, which was a combined list of over 306 million SHA-1 hashed passwords which had appeared in previous data breaches. 

The entire list was freely downloadable, and the intention was that developers could build this list into their customer registration systems: when someone tries to choose a new password, run it against the list - if it comes back with a match in the pwned passwords list, it's probably a crap password and they shouldn't be using it.

At the time, Troy explained that this was partly a reaction to the new NIST Digital Identity Guidelines around password management. The new NIST guidance mirrored the [UK NCSC](https://www.ncsc.gov.uk/guidance/password-guidance-simplifying-your-approach) changes made in 2015, threw out the old ideas of complexity rules, regular password rotation, and forbidding that users write down passwords. 

It also included this:

![NIST Guidance](https://markeldo.com/images/nist-password-guidance.png)

Meeting this requirement was exactly what the Pwned Passwords list was intended for.

### Pwned Passwords Version 2

Last Thursday, Troy released a [version 2](https://www.troyhunt.com/ive-just-launched-pwned-passwords-version-2/) of the pwned passwords list, with some new features:

>In V2, every single password has a count next to it. What this means is that next to "abc123" you'll see 2,670,319 - that's how many times it appeared in my data sources. Obviously with a number that high, it appeared many times over in the same sources because many people chose the same password. The password "acl567", on the other hand, only appeared once. Having visibility to the prevalence means, for example, you might outright block every password that's appeared 100 times or more and force the user to choose another one (there are 1,858,690 of those in the data set), strongly recommend they choose a different password where it's appeared between 20 and 99 times (there's a further 9,985,150 of those), and merely flag the record if it's in the source data less than 20 times. Of course, the password "acl567" may well be deemed too weak by the requirements of the site even without Pwned Passwords so this is by no means the only test a site should apply.

In addition, this version of the list includes a web API which allows you to test passwords against the list without having download the whole thing, and without sending the password (or a weak hash of it) over the internet.

The way Troy solved this problem is quite neat (and credit goes to CloudFlare for coming up with it). The simplified version is that Troy has an API which accepts the first 5 characters of a password hash, and then returns all of the hashes in his dataset where those first 5 characters match. This means that the person using the API gets the benefit of a cloud service (not having to host the dataset themselves), without having to send the entire password hash to Troy.

I've seen a lot of code popping up online which uses this API and is designed to hook into existing web applications and sign-up or password change forms, and it's quite neat. 

Expect to see use of the Pwned Passwords API increase in the services you use on a daily basis, as it's a way better way of checking for good passwords than the current "complexity" methods, because it actually matches what real hackers do when they're trying to guess them.