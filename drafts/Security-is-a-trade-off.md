---
layout: post
title: Security is a Trade-off
image: "/images/security-trade-off.png"
excerpt: Everything we do in the security industry is a trade-off between convenience and security. The real skill is knowing which trade-offs to make, and when, in order to meet the design requirements of whatever you are building.
---

# Security is a Trade-off

Trade-offs occur everywhere in engineering. Take [leverage](https://en.wikipedia.org/wiki/Lever) for example:

![Leverage](/images/Leverage.jpg)

Leverage allows us to amplify a small force, by applying it at the end of a long lever. This is extremely useful, because it means we can move very large objects with much less effort than if we applied the force directly.

This might seem like a free win, but it isn't. The trade-off is that we need more space to work in: more space for the lever, and more space to move it. If you have unlimited space, this isn't a problem. If you're working in a confined area, it might make using a lever completely impossible.

The real skill in engineering is knowing which trade-offs to make, and when, in order to meet the design requirements of whatever you are building.

## Convenience vs Security

Everything we do in the security industry is a trade-off between convenience and security. Whenever we design a system, we are making a compromise between pure convenience (zero security) and pure security (zero convenience). 

The latter is what I like to call the *"turn everything off and go home"* approach to security: after all, you can't remotely hack a server if it's always off, and no one can steal your corporate information if you never do any work!

This is an extreme example, but we see trade-offs everywhere. Having to lock your computer every time you leave your office desk is inconvenient, but most organisations accept it as a necessary security precaution. Spam filtering can end up blocking legitimate email, but we see it as a worthwhile risk given the alternative.

There are also plenty of occasions where a system is designed poorly enough that it ends up being both inconvenient to use *and*  insecure. These are the low-hanging fruit in our industry (everyone likes a win-win), but focusing on them can make us complacent. Eventually we'll run into a problem where we can't have it both ways: we have to make a trade-off between convenience and security.

Even once we've made our decision, it gets more complicated, because making a security solution too inconvenient can be counterproductive. If it's too much hassle to follow a security policy or use a system correctly, people will work around it -  especially if they don't agree with the requirement or understand why it's necessary.

They simply disagree with the trade-off you've made, and [they're correcting it for you](https://twitter.com/SwiftOnSecurity/status/1002383281550233601). 

[IMAGE OF GOLDBLUM]
*Life finds a way.*

## The security spectrum

Continuing with the password examples, lets assume we're trying to protect our online accounts. I have roughly 400 of them: everything from Google and Facebook through to my local gym and tiny online merchants I only used once.

Let's also look at convenience and security as if they were a spectrum: one extreme representing maximum convenience (minimum security), and the other representing maximum security (minimum convenience).

![Security trade-offs in password practices](/images/security-trade-off-cropped.png)
*Security is always a trade-off.*

The most convenient password is not to have one at all, but let's assume we're being forced to pick *something*. In that case, the easiest solution is to just use something ridiculously obvious for the password (like the word "`password`"), and use the same one for every service.

This is very convenient — I never need to remember a password again! — but is also incredibly insecure.

On the other end of the spectrum, we have the best possible password security: I'm going to randomly generate 200 character passwords in my head for every service I use. I won't write them down (that would be less secure), so I have to memorise them all.

Clearly, this isn't convenient or practical. There are a [handful](https://www.ndtv.com/india-news/21-year-old-memorises-70-000-pi-digits-sets-guinness-record-1226747) of people on the planet with a memory this good, but chances are you're not one of them. Even if you were, this is ridiculous overkill for nearly any application.

## Making the correct trade-off

When it comes to passwords, the majority of users are at the red end of our spectrum. [People tend to have a small handful of passwords which they use for absolutely everything](https://nakedsecurity.sophos.com/2013/04/23/users-same-password-most-websites/), and they're frequently not very strong.

On the other end of the spectrum, if I want to make the "random passwords" method a bit more practical, I can write them in a physical notebook, and store them in a drawer at home. Contrary to popular belief, [this is quite a good method for storing passwords](https://www.troyhunt.com/password-managers-dont-have-to-be-perfect-they-just-have-to-be-better-than-not-having-one/). Remember the threat model: anyone who wants to steal the notebook needs to physically break into a house—and for most people, it's unlikely that anyone who wants access to their Gmail account is going to go to this level of effort.

The problem with the physical notebook solution is that it's inconvenient: every time I need to log into a service, I need to get my notebook out of the drawer, and I can't copy-paste. If I need to log into something while I'm away from home, I need to bring the notebook with me. Very quickly, we'll end up sliding down that spectrum, because our original solution was too much of a pain to use consistently. 

Again, overly inconvenient solutions tend to be self-correcting, to the detriment of security.

The correct trade-off for most people is to use a [Password Manager](https://en.wikipedia.org/wiki/Password_manager). This strikes a good balance between convenience and security for everyday usage.

The concept of a password manager is very simple: you only need to remember one password, which then unlocks access to all of your other passwords. This means you can generate random and unique passwords for every service, and still have the convenience of having easy access to them.

This is still a compromise. Compared with the notebook method, trusting another service with my passwords reduces my security (especially if the notebook is stored in a safe when I'm not using it.) Compared with just using a handful of passwords for everything, it's less convenient (especially if I have to pay for the Password Manager).

Remember, everything is a trade-off in engineering—but for this particular threat model, it's the right one to make.

Of course, there are many other factors to consider: such as the fact that not everyone rates convenience the same way. For me, using a physical notebook for my passwords is incredibly convenient. For someone who isn't confident with technology or doesn't want to pay for a password manager, and who only logs into their accounts from their home desktop, it's a different equation.

## Be explicit about the trade-offs you are making

