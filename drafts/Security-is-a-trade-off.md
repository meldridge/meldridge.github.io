---
layout: post
title: Security is a Trade-off
image: "/images/security-trade-off.png"
excerpt: Trade-offs and compromises occur everywhere in engineering. The real skill in engineering is determine which compromises to make, and when, in order to meet the design requirements of whatever you are building.
---

# Security is a Trade-off

Trade-offs and compromises occur everywhere in engineering. The real skill in engineering is determine which compromises to make, and when, in order to meet the design requirements of whatever you are building.

Take [leverage](https://en.wikipedia.org/wiki/Lever) for example. Leverage lets us amplify a small force, by applying it at the end of a long lever. This is extremely useful, because it means we move very large objects using a lever with a much lower force than if we applied the force directly.

![Leverage](/images/Leverage.jpg)

The trade-off for this is that we need a lot more space to work in: space for the lever itself, and space to move it. The larger the force amplification, the longer the lever required, and the further we need to move it. 

If you have unlimited space, this isn't a problem. If you're working in a confined area, it might make using a lever completely impossible.

## Convenience vs Security

Everything we do in the information security industry is a trade-off between convenience and security. Whenever we make a decision to increase the security of a system, we are making a compromise between pure convenience (zero security) and pure security (zero convenience).

There are obviously [plenty of occasions](https://www.ncsc.gov.uk/articles/problems-forcing-regular-password-expiry) where a poor design decision can result in bad outcomes for both convenience *and* security: it's easy to find examples of systems which are inconvenient to use and also horribly insecure.

Fixing these systems is the low-hanging fruit of our industry (and makes for easy wins) but putting too much attention on them can let us avoid confronting the very real trade-offs we will inevitably have to make when we encounter a system where we can't have it both ways.

## How long should a password be?

Pop quiz: 

_**If I need to secure something with a password that only I know, how long should that password be?**_

Answer:  
a) Three digits (`"326"`)  
b) 12 characters, alphanumeric and symbols (`"JasperTato!7"`)  
c) 32 hexadecimal characters (`"41c9db4d3674590033790f6924be64ad"`)

Of course, this is a trick question: the correct answer is that **it depends on what you're trying to secure, and who you're trying to secure it from**.

## Know your threat model

In very simple terms, a *threat model* is a combination of two pieces of knowledge:
1. What you are trying to protect from attack
2. What sort of person is likely to attack it

One example: I have a medicine cupboard at ground-level in my house, and I want to prevent my children from accessing it. For this threat model, I decide to use a combination lock with a three-digit code (answer 'a' above).

Another: I need a password to protect my personal email account, and I want to prevent criminal groups from trivially guessing it. In this case, I decide to use a 12+ character password, ideally a phrase I can easily remember but which can't be easily guessed (answer 'b').

Finally: I need to encrypt a file for 20+ years, and I need it to be secure from even a government agency with access to billions of dollars worth of computing power. Along with a [good encryption method](https://stackoverflow.com/questions/28247821/openssl-vs-gpg-for-encrypting-off-site-backups), I use a 32-character alphanumeric password (answer 'c').

Why the difference? It might seem obvious, but that's because we tend to do the threat modelling intuitively. *Obviously* I shouldn't use a 3-digit code for my email account (even if the service allowed me to). *Obviously* I don't need a 12+ character password protecting the medicine cupboard.

We've made a compromise between convenience and security, without really thinking about it.

## The security spectrum

Continuing with the password examples, let's look at 'convenience' vs 'security' as if they were a spectrum: one extreme representing maximum convenience (minimum security), and the other representing maximum security (minimum convenience).

![Security trade-offs in password practices](/images/security-trade-off-cropped.png)
*Security is always a trade-off.*

The most convenient password is not to have one at all, but let's assume we're being forced to pick *something*. In that case, the most convenient solution is to just use something ridiculously obvious for the password (like the word "`password`"), and use the same one for every service.

This is very convenient—I never need to remember a password again—but is also incredibly insecure.

On the other extreme, we have the best possible password security: I'm going to randomly generate 200 character passwords in my head for every service I use. I won't write them down (that would be less secure), so I have to memorise them all.

Clearly, this isn't convenient or practical. There are a [handful](https://www.ndtv.com/india-news/21-year-old-memorises-70-000-pi-digits-sets-guinness-record-1226747) of people on the planet with a memory this good, but chances are you're not one of them. Even if you were, this is ridiculous overkill for nearly any application. Even the seed phrase for a bitcoin wallet—potentially holding millions of dollars—is usually 70-100 characters (roughly 12 words).

## Making the correct trade-off

When it comes to passwords, the majority of people are towards the red end of our spectrum diagram - the bit labelled "most users". [People tend to have a small handful of passwords](https://nakedsecurity.sophos.com/2013/04/23/users-same-password-most-websites/) which they use for absolutely everything, and they're frequently not very strong.

If we want to fix this problem, we could generate random passwords for each service, write them in a physical notebook, and store them in a filing cabinet at home. Contrary to popular belief, [this quite a good method for storing passwords](https://www.troyhunt.com/password-managers-dont-have-to-be-perfect-they-just-have-to-be-better-than-not-having-one/). Your passwords are written down on paper, but anyone who wants to steal them needs to physically break into your house—a much bigger ask than just guessing `"Password123"` or `"Summer2018"` from the other side of the world.

The problem with the physical notebook solution is that it's inconvenient: every time I need to log into a service, I need to pull out the notebook, and I can't copy-paste. If I need to log into something while I'm away from home, I need to bring the notebook with me. Very quickly, we'll end up sliding down that spectrum towards the "insecure" end, because our original solution was too inconvenient.

## Use a password manager

The correct trade-off for most people is to use a [Password Manager](https://en.wikipedia.org/wiki/Password_manager). 

You want to be here. Use a password manager, use it to generate unique passwords for everything, and then you only need to remember your master password.
This is the correct tradeoff of security and convenience for the vast majority of people.


### Links

https://troyhunt.com/cloudflare-ssl-and-unhealthy-security-absolutism/

Rule 777:
If you don’t make a system usable and secure, the user will make it usable and insecure.
https://twitter.com/SwiftOnSecurity/status/1002383281550233601
 





Notebooks for password managers
 
https://www.theregister.co.uk/2018/07/09/conran_amazon_password_notebooks/

troy hunt post about this

### CDNs, DDoS mitigation, and MITM-as-a-service

Should maybe save this for the online voting post?

using a CDN like cloudflare is a good idea for most websites

can provide TLS

sifnificantly improve loadntikes for users and reduce bandwidth costs for you

remember how a CDN works
they are a reverse proxy for all incoming connections, and TLS connections are terminated there

Still important to remember that there is a trade-off here: it’s just one which most websites are justified in making - their threat model is one where the trade-off is the right decision. 

Trade-off 