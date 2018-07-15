# Security is a trade-off

Everything we do in the information security industry is a trade-off between convenience (or productivity) and security. 

Whenever we make a decision to increase the security of a system, we are making a compromise between pure convenience (zero security) and pure security (zero convenience). 

There are obviously plenty of occasions where a (poor) design decision can result in sub-optimal outcomes for *both* convenience and security, but for the sake of this post let's leave them aside. 

This isn't to downplay those cases—there are *plenty* of real-world examples where systems are both inconvenient to use and also horribly insecure, and fixing them is the low-hanging fruit of our industry— but putting too much attention on them can let us avoid confronting the very real trade-offs we will inevitably have to make when we encounter a system where we have to make a choice between one or the other.

Failure to make these 

Trade-offs occur everywhere in engineering. One example is [leverage](https://en.wikipedia.org/wiki/Lever). Leverage lets us amplify a small force, by applying it at the end of a long lever. The trade-off is that this force amplification requires the lever to begin with, which means we need a lot more space to work in - space for the lever itself, and space to move it.

![Leverage](/images/Leverage.jpg)

Where this becpmes 

The real skill in engineering is determine which compromises to make, and when, in order to meet the design requirements of whatever you are building.

## How long should a password be?

Pop quiz: 

_**If I need to secure something with a password that only I know, how long should that password be?**_

Answer:  
a) Three digits (`"326"`)  
b) 12 characters, alphanumeric and symbols (`"MyPassword!1"`)  
c) 64 hexadecimal characters (`"2dd6d6d4008e8f19a69be71f30e3c89641c9db4d3674590033790f6924be64ad"`)

If you enter this question into Google, you'll get a lot of answers tailored to online accounts (email, Facebook, Twitter, etc), and some will look like answer b) above.

Of course, this is a trick question. The correct answer is:

**It depends on what you're trying to secure, and who you're trying to secure it from**.

## First, know your threat model

In very simple terms, a *threat model* is a combination of the following two pieces of knowledge:
- What you are trying to protect
- What sort of attacker is likely to attack it

For example: I have a medicine cupboard at ground-level, and I want to prevent my children from accessing it. 

For this threat model, I decide to use a combination lock with a three-digit code.


To meet my security objective—stop the children getting into the cupboard—I have a few options: I could move the cupboard higher where it's out of reach from a child, or I could put a lock on it.


I'm trying to keep out my 6-year old kid from a medicine drawer, and my only option is a floor-level cupboard.

This can sound obvious, but 

*Briefly* describe threat modelling
Convenience/Productivity

(Example of a 3-digit PIN combination lock to keep out the kids)
If your threat model is a 6-year old...

A 3-digit pin is probably fine - a 6 year-old probably won’t be sitting there brute-forcing combinations

![Security trade-offs in password practices](/images/security-trade-off.png)

Security is always a trade-off between convenience and security
In this case, on the right hand we have the best possible password security:
I'm going to randomly generate 200 character passwords in my head for every service I use, and memorise them in my impossibly perfect memory
Clearly, that's not convenient or practical. There might be three people on the planet who can pull that off, and the convenience trade-off is not worth it for the security benefit.
Shortly down from that we have passwords written in a physical notebook and stored in a safe
This is actually extremely secure - I can't hack a paper notebook over the internet
But it's also extremely inconvenient. I have to type the passwords in manually (can't copy-paste from a notebook), and I won't have access to it if I need to log into something while I'm away from my safe. 
I could take my notebook with me, but that would defeat the security benefit.
On the other end of the spectrum - the left hand side, we have the worst possible security
I'm going to use a single password for everything, and my password is "password".
That's incredibly convenient: I never have to worry about passwords again! But I think we'd all agree that it's too much of a security tradeoff
Most people are here.
We tend to have 3 to 5 passwords that are moderately strong (though often too short), and we rotate them around with minor variations for every service

You want to be here. Use a password manager, use it to generate unique passwords for everything, and then you only need to remember your master password.
This is the correct tradeoff of security and convenience for the vast majority of people.


This isn’t a new concept - engineering is build around the concept of trade offs - but not understanding it is the root of many disagreements I seee online. 

“You should use PGP, it’s more secure!”

Etc

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