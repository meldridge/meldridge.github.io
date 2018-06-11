---
layout: email
title: Taringa owned, and why password hashing is important
---

Today’s KATTFAKTA is about a Latin American social network called Taringa (apparently similar to Reddit). Taringa was hacked, resulting in the theft of 28 million user credentials.

[Bazinga! Social network Taringa 'fesses up to data breach](https://www.theregister.co.uk/2017/09/05/taringa_data_breach/)

>Latin American social networking site Taringa has suffered a database breach that has resulted in the spill of more than 28 million records. [...]
>
>In response, Taringa – which has users all over the Spanish-speaking world – has applied a password reset as well as urging consumers to review their use of login credentials elsewhere to make sure they are not using the same (now compromised) passwords on other sites.
>
>Although the breach affects a consumer site, it poses a risk for corporates because it opens the door to the well-practised hacker tactic of using the same login credentials to break into more sensitive (webmail, online banking) or corporate accounts. The still widespread practice of password reuse opens the door to such credential stuffing attacks.
 
Taringa was storing user passwords as MD5 hashes, which was a dumb idea 10 years ago and is a spectacularly dumb idea today. Predictably, LeakBase is claiming that they’ve already cracked 94% of all of the passwords in the leak. (Leakbase is a slightly dodgier version of Troy Hunt’s haveibeenpwned.com, and actually cracks and displays leaked passwords if you pay them.)

Unfortunately, ignoring the negligence of Taringa’s owners, the news has highlighted a gap in the understanding of how password hashing and cracking works, even among the tech industry:

>Andrew Clarke, EMEA director at One Identity, opined: "The reported breach at Taringa highlights some fundamental issues. The fact that an administrative file holding passwords was accessible demonstrates little or no control over privileged accounts. Then the passwords were easily cracked since the company used a weak MD5 (128-bit) algorithm rather than SHA-256.”

I hesitate to use Clarke as an example, because he probably just misspoke, but it’s worth pulling this apart. 

### What is a hash?

Fundamentally, the purpose of a ‘hash’ is to be a “one-way function”: you put a password in one end, and out comes a string of gibberish. 

MD5 is a hashing function. For example, the MD5 hash for `“password”` is `“5f4dcc3b5aa765d61d8327deb882cf99”`.

Strong hashing functions (MD5 is not one) are intended to make it impossible, or at least extremely infeasible, for someone to ‘reverse’ the hash – i.e. given the MD5 hash above, I shouldn’t be able to determine that the original input was “password”. In addition, hashes are generally designed so that a minor change in the input causes a massive change in the output. 

For example, the MD5 hash for `“pAssword”` is `“2d152c2e223139101ba9a8fa9b327842”`. A tiny change from ‘a’ to ‘A’ in the input causes almost every character in the output to change.

Hashes are used everywhere in security, because this property means we can verify that data hasn’t been modified or tampered with. Some hashing functions are better than others: MD5 is famously broken because it is possible to deliberately create *collisions*. 

A collision is where (for example) you give me the output of an MD5 function for some sort of input data, such as your Microsoft update signing certificate, and I generate completely different input data which will generate the **same** MD5 hash. I’ve modified the input, but the hash makes it look like I haven’t. This sort of attack is how the [Flame](https://en.wikipedia.org/wiki/Flame_(malware)) and [Stuxnet](https://en.wikipedia.org/wiki/Stuxnet) malware fooled systems into trusting them.

### When it comes to hashing passwords, faster is not better

This is all highly technical, and for the purposes of password hashing it’s also irrelevant. The reason MD5 is a terrible password hash isn’t because you can create collisions – after all, we don’t care about creating a collision for a password hash, we’re interested in figuring out what the input was. 

No, the reason MD5 is a terrible password hash is because it’s so **fast**:

```
Hashtype: MD5
Speed.Dev.#3.....:  1891.0 MH/s (79.73ms)

Hashtype: SHA1
Speed.Dev.#3.....:   672.9 MH/s (60.36ms)

Hashtype: SHA-256
Speed.Dev.#3.....:   278.5 MH/s (71.08ms)
```

That's the result of running a hashcat benchmark on my MacBook's graphics processor (GPU), which isn't particularly powerful, especially when compared to modern password cracking rigs with multiple GPUs. Even so, I can calculate almost 2 billion MD5 hashes per second on my MacBook - "MH/s" means "megahashes per second". 

This is how password cracking works: I can guess **2 billion passwords per second** by calculating the MD5 hash for each one, comparing the result to the hash for your password, and then stopping whenever I find a match. Also note that SHA1 and SHA-256, while better (slower) than MD5, aren't really that much better.

For contrast, here's the hashcat benchmark for bcrypt, which is actually designed for securely hashing passwords:

```
Hashtype: bcrypt $2*$, Blowfish (Unix)
Speed.Dev.#3.....:      896 H/s (68.19ms)
```

Less than a thousand hashes per second - several orders of magnitude slower than MD5.

Note that this number is lower than it should be (hashcat isn't compiled properly on my MacBook), but this isn't far off what you'd expect for a good bcrypt implementation. It's intentionally designed to be slow, in order to frustrate password cracking attempts.

### The difference between *cryptographic hashes* and  *password hashes*

This is the difference between a hash designed for cryptography (like SHA-256) and a hash designed for passwords (bcrypt):

- **Cryptographic hashes** are designed to be *secure and fast*, because you may need to calculate hashes for encrypted traffic at a rate of Gigabits per second.
- **Password hashes** are designed to be *secure and slow*, because you want to prevent someone cracking them

Hashing speed is much less of a consideration for a user logging into a website (measured in hundreds of milliseconds) than it is for a high-throughput crypto protocol (measured in microseconds).

Unfortunately, people still confuse cryptographic hashes and password hashes, even the techies. Now, you can avoid being one of them!