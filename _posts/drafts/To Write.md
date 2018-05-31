Good morning.

### Web Authentication

In the last email we spoke about Alex Stamos' Twitter takedown of the 'Digi-ID' authentication solution. Buried in the exchange was a mention by Stamos of the *Web Authentication* standard, which is something you'll be hearing a lot more about in coming months. 

Web Authentication (or WebAuthn) is a method for using trusted devices such as smartphones or hardware tokens to authenticate users. It's an excellent piece of work, and makes it realistically possible to get rid of passwords entirely.

Duo Security has an excellent explanation of the standard (which just so happens to use the website "*cat-facts.com*"):

[**Web Authentication: What It Is and What It Means for Passwords**](https://duo.com/blog/web-authentication-what-it-is-and-what-it-means-for-passwords)

>There are more than a few different cases for how WebAuthn would work in practice, but the most common example is this: A user visits a website, let’s say cat-facts.com, on their laptop and goes to register an account. After pressing a button to begin registration on the site, they receive a prompt on their phone saying “Register with cat-facts.com.”
>
>Once they’ve accepted the request, the user would be asked to perform an “authorization gesture,” such as typing in a PIN or biometric action that is associated with the account they are creating. After providing this, the website on the laptop would display something to the effect of “Registration complete!”
>
>The user can now log in to cat-facts.com using the same phone and authorization gesture.

For the Swedish readers: if this sounds remarkably similar to [Bank-ID](https://www.bankid.com/en/), that's because it is. There are plenty of differences, but the experience for the user is the same.

### Bank-ID

For the non-Swedes: Bank-ID is a system used to identify people in the [Swedish population register](https://www.skatteverket.se/servicelankar/otherlanguages/inenglish/individualsandemployees/movingtosweden.4.7be5268414bea064694c40c.html), using their personal identity number ([personnummer](https://en.wikipedia.org/wiki/Personal_identity_number_(Sweden))). Bank-ID is used to authenticate with all sorts of services in Sweden, from banks, to gym memberships, to online merchants.

The usual login approach is as follows:
1. User enters their personal number into the website
2. The website requests identification via the Bank-ID service
3. The user opens the Bank-ID app on their phone and 'identifies' themselves (using a fingerprint or PIN code)
4. The website receives confirmation that the user has been successfully authenticated

In practice, this means that for 90% of services in Sweden, there is no username and password. Your username is your personal number (and the same everywhere), and your password is your phone.

It works remarkably well, although it's not perfect. One of the major disadvantages is the reliance on the Swedish personal number: if you're not eligible for one, or you haven't received it yet, you simply can't use Bank-ID, or any service which authenticates using it. [This is exactly as frustrating as it sounds.](https://www.thelocal.se/20171120/the-local-readers-reveal-their-personal-number-pains-in-sweden)

### WebAuthn and the death of passwords

Fortunately, WebAuthn is designed to be usable by anyone, so it won't have this limitation. More than any other advance we've seen in the last few decades of tech, the standard has the potential to do away with passwords entirely - or at least for most web-based services. 

Not quite yet though. From the [Duo article](https://duo.com/blog/web-authentication-what-it-is-and-what-it-means-for-passwords):

>Don’t start deleting your passwords yet, because WebAuthn still needs a bit of work. While it looks like the WebAuthn API should be available on Firefox and Chrome in the coming months, I don’t think we’ll see it replace passwords very soon. I do hope developers and companies start to implement it as a replacement for existing two-factor authentication code they may have in their site, because when phones begin to support WebAuthn requests, it should be quick to switch over support for user verification.

In the short term, this means that two-factor authentication for websites might move away from the ubiquitous [TOTP codes](https://help.github.com/articles/configuring-two-factor-authentication-via-a-totp-mobile-app/) and towards the WebAuthn API, which will work a lot like Bank-ID or [Duo Push](https://www.youtube.com/watch?v=tPLxe9HUDjY).

In the long term, we can ditch passwords entirely and use our phones or [our keys](https://www.yubico.com/product/security-key-by-yubico/) to log into services. Once this happens, the days of being able to hijack dozens of corporate accounts using [password spraying](https://www.ncsc.gov.uk/blog-post/spray-you-spray-me-defending-against-password-spraying-attacks) with *"Password123!"* or *"Summer2018"* will be a thing of the past.

That's something everyone in security can get behind.

---








"Living off the Land" (report by Symantec):
https://www.symantec.com/content/dam/symantec/docs/security-center/white-papers/istr-living-off-the-land-and-fileless-attack-techniques-en.pdf



## Telegram Unicode RTL

https://securelist.com/zero-day-vulnerability-in-telegram/83800/

Originally was going to write about this way back in October 2017:

Right-to-Left Override: Detecting Attacks With EDR Data
https://www.redcanary.com/blog/right-to-left-override/
>“Crafty attackers have been using Unicode characters to trick users into opening malicious files for years. These attacks most often try to trick the user into opening a file that they wouldn’t otherwise. The trick is to make the file look like a PDF or Office document when in reality it is a piece of malware.
>
>Let’s say we have a piece of malware we want Bobby to open, and it is named with the “scr” extension, a Windows Portable Executable (“PE”) associated with Windows screensaver files.
>
>As the attacker, we can name our file: "charity_fundraiser_bb\u202Excod.scr"
>
>Because of the Right-to-Left character, Bobby’s email client and operating system are going to display that as:
>
>Now Bobby is much more likely to open that file because it looks like a nice, safe, DOCX file.”

## Olympic Destroyer

http://blog.talosintelligence.com/2018/02/olympic-destroyer.html


## Accounting controls:

>Accounting controls" has to be way, way up there on the list of "systemically important technologies that almost no one would say One Of The Most Important Things Ever Invented.

And

>Double-entry bookkeeping (and other accounting controls) are widely regarded as one of the most important things ever invented, as they allowed larger-than-tiny-family-companies.

Patrick McKenzie on Twitter
https://twitter.com/patio11/status/957469600681140226

*hdsh*

## JavaScript supply chain

https://www.troyhunt.com/the-javascript-supply-chain-paradox-sri-csp-and-trust-in-third-party-libraries/

## Exploit development rant by Bas Alberts

The old speak: Wassenaar, Google,	and why Spender is right
https://lists.immunityinc.com/pipermail/dailydave/2015-August/000976.html

This is an excellent read for anyone who is interested in the security industry. It takes a bit to get going, but it's worth it.

The tl;dr is that this is an exploit developer pointing out that we tend to fixate on the latest big new vulnerability, when effective security is designed around the assumption that stuff will, inevitably, be exploited.

In other words, if your security model collapses the moment a new 0day exploit is released, you have a shitty security model.

Bas Alberts:

"So if you truly, deeply, honestly care about security. Step away from
exploit development. All you're doing is ducking punches that you knew
were coming. It is moot. It is not going to stop anyone from getting
into anything, it's just closing off a singular route. [...]

"But if you care about systemic security. The kind where you don't give
two flying fucks if Bob's desktop gets clientsided or Jane's Android
doesn't know how big an mpeg4 frame oughta be, then you will stop circle
jerking over individual vulnerabilities and listen to what Spender has
been saying for years.

"Which is: you don't chase and fix vulnerabilities, you design a system
around fundamentally stopping routes of impact. For spender it is
eradicating entire bug classes in his grsecurity project. For network
engineers it is understanding each and every exfiltration path on your
network and segmenting accordingly.

"Containment is the name of the game. Not prevention. The compromise is
inevitable and the routes are legion. It is going to happen."
