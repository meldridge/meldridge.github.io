---
layout: email
title: KRACK Attacks against WPA2 Wi-Fi encryption
---

Some big news today: it looks like the *Wi-Fi Protected Access II* security protocol, more commonly known as WPA2, has some significant problems. This is the protocol which is used on virtually every secure Wi-Fi access point, from enterprise through to consumer-grade routers. 

Basically, any secure Wi-Fi network you connect to is most likely using WPA2, and the security on all of them is now broken.

Disclosure of the vulnerability was coordinated to occur at 8pm U.S. Eastern time (2pm here, 9:30pm in Australia), so there was several hours for everyone to freak out before we actually received details about the problem. Now we have them:

[**KRACK Attacks: Breaking WPA2 by forcing nonce reuse**](https://www.krackattacks.com/)

>We discovered serious weaknesses in WPA2, a protocol that secures all modern protected Wi-Fi networks. An attacker within range of a victim can exploit these weaknesses using key reinstallation attacks (KRACKs). Concretely, attackers can use this novel attack technique to read information that was previously assumed to be safely encrypted. [...]
>
>The weaknesses are in the Wi-Fi standard itself, and not in individual products or implementations. Therefore, any correct implementation of WPA2 is likely affected.

Every big vulnerability now seems to have its own nickname, logo, and webpage, but in this case it's probably justified. The page explains the whole issue quite well, and in enough technical detail to satisfy people like me who want to know exactly what the problem is. 

The researcher who discovered the vulnerability is [Mathy Vanhoef](https://twitter.com/vanhoefm) from KU Leuven in Belgium. Note that he uses 'we' instead of 'I' throughout the paper and website, but this is just the style of technical papers - he deserves all of the credit for himself.


### Summary/tl;dr

The bad news is that this is a big deal. Every WPA2 encrypted WiFi network is affected: all variants of WPA (personal, enterprise) and every cipher type (TKIP, AES, GCMP). The vulnerability is in the protocol itself, not a particular implementation, which means it's not limited to a certain device or operating system.

The good news is that this is a vulnerability in the client, not the wireless access point (AP). That means that in the vast majority of cases you will be able to update your device (phone, tablet, laptop) and be secure against this particular attack. It's still a good idea to update your AP if there is an update available, but that's not the primary threat.


### Crypto Basics: "What is a nonce?"

To explain how the attack works, we'll need to dive into some basic cryptography, including the concept of a nonce (number used once), also known as an Initialization Vector, or IV. 

I'll use nonce for this explanation because it's the term used in the paper. (For those of you who know more about crypto than I do, please excuse any technical errors below.)

A nonce is a number which should only ever be used once. The value itself is usually irrelevant, and can be generated in a bunch of different ways. The important bit is that **a nonce should never repeat**.

In a lot of modern cryptographic systems a nonce is used to prevent [known-plaintext attacks](https://en.wikipedia.org/wiki/Known-plaintext_attack). A known-plaintext attack is where I don't know the key that you used, but I do know the message you encrypted (the *plaintext*), and I know the encrypted output (the *ciphertext*). In weaker ciphers, this lets me figure out the key, by comparing the plaintext with the ciphertext.

This scenario might seem contrived since I already know the plaintext message, but it also means I can decrypt any future message - because now I have the key. To give one example: a known-plaintext attack was [how the Nazi Enigma system was broken](https://en.wikipedia.org/wiki/Cryptanalysis_of_the_Enigma#Crib-based_decryption).

The use of a nonce is critical for preventing these attacks, because it's different every time. Provided I'm using a strong cipher like AES, combining a nonce with every message means that I can repeatedly send the same message, an attacker can know what my message is, and yet the attacker can't recover the encryption key. Because the nonce is different every time and never repeats, the plaintext always differs just enough to defeat a known-plaintext attack. 

This is a big deal in modern communications systems, because "sending exactly the same thing several times in a predictable fashion" is how a lot of communications protocols work.

The broad takeaway is this: when it comes to using modern crypto protocols: **if you ever use the same nonce twice for a given encryption key, you're screwed.**


### How the KRACK attack works

The KRACK attack manipulates the 4-way handshake used to authenticate clients with a Wi-Fi access point and generate a key for use when encrypting traffic. 

This handshake is what happens when you type in a password for a WiFi network (or re-connect to one you've previously joined): your device and the access point perform a handshake to confirm that the client is allowed to join, and decide on an key to use for encrypting wireless traffic. Once the handshake is complete, all future traffic is encrypted with this key.

After message 3 of the 4-way handshake, the client installs the negotiated key - at which point it can be used to encrypt data. If the client doesn't respond to message 3 in an adequate time frame, the wireless access point will re-transmit message 3. The WPA protocol is written to allow this, which is understandable given how flaky wireless networks can be.

Unfortunately, this means that message 3 can be collected and [replayed](https://en.wikipedia.org/wiki/Replay_attack) by an attacker. Upon receiving the replayed message, the client will re-install the same key over the top of the existing key. This doesn't affect the key at all, but it *does* affect the "incremental transmit packet number", which is reset to zero whenever a key is installed - even if it's the same key. 

**The problem: the "incremental transmit packet number" is used as the nonce when encrypting data.**

In practice, this means that an attacker can listen in on a handshake, capture message 3, and then repeat it to the client later on. This won't change the key used by the client*, but it *will* cause the client to reset its nonce back to zero. 

This means that the nonce will start repeating, breaking a lot of the assumptions built into the crypto, and causing known-plaintext attacks to be possible.

**with the notable exception of the Linux/Android case described below*


### So what now?

Until there are patches available and you have updated your devices, you should basically treat all Wi-Fi networks the same way that you'd treat an unencrypted/unprotected Wi-Fi network. 

This isn't a big deal if you're only accessing HTTPS websites (because HTTPS is providing its own encryption), but it's one less layer on your security-in-depth. Similarly, if you're paranoid like me and you use a VPN on any wireless network anyway, you're no less secure than if you were on an unprotected network.

Where this is a big deal is any wireless network which is designed with the assumption that hostile parties can't get access to the clients using it. This means any business wireless network using WPA2, and your home WiFi. 

For example: I have all sorts of things hanging off my apartment's WPA2 wireless network which don't have any additional protection above that provided by WPA2, so they'll be sitting ducks until I can patch them. 

Some of the key takeaways from the KRACK webpage itself:

>**The attack works against all modern protected Wi-Fi networks.**

Again, this means the vulnerability affects everything using WPA. It works against WPA, WPA2, WPA2 Personal, WPA2 Enterprise, TKIP/AES/GCMP, everything.

>Note that our attacks **do not recover the password of the Wi-Fi network**. They also do not recover (any parts of) the fresh encryption key that is negotiated during the 4-way handshake.

This is important - this isn't an attack on the access point itself, but an attack on the client. If you have a ridiculously long WPA2 password, you don't need to go and change it on all of your clients (and it wouldn't help if you did). 

Similarly, if you're using WPA Enterprise, you don't need to re-issue certificates for every endpoint. You just need to patch all of your clients, once there's a patch available.

>Our attack is especially catastrophic against version 2.4 and above of wpa_supplicant, a Wi-Fi client commonly used on Linux. Here, the client will install an all-zero encryption key instead of reinstalling the real key. This vulnerability appears to be caused by a remark in the Wi-Fi standard that suggests to clear the encryption key from memory once it has been installed for the first time. When the client now receives a retransmitted message 3 of the 4-way handshake, it will reinstall the now-cleared encryption key, effectively installing an all-zero key. Because Android uses wpa_supplicant, Android 6.0 and above also contains this vulnerability. This makes it **trivial to intercept and manipulate traffic sent by these Linux and Android devices**. Note that currently 41% of Android devices are vulnerable to this exceptionally devastating variant of our attack.

Ouch. The summary here is that when you perform the attack described above and retransmit message 3 of the 4-way handshake, vulnerable Android and Linux systems will zero the key rather than just re-loading it. A zeroed key is a Very Bad Thing, because you've effectively just turned off your encryption.

To put it mildly, this is kind of a big deal, especially given that Android devices in particular often have problems receiving security updates.

This one is going to be making headlines for a while, so stay tuned.

---

**UPDATE:** It looks like I was a bit too hasty in my first email regarding the threat against wireless access points (APs) as a result of the WPA2 vulnerability.

It turns out that a *lot* of wireless access points can also operate in a pseudo-client mode, especially when they're acting as a wireless repeater or using functions like fast roaming ([802.11r](https://en.wikipedia.org/wiki/IEEE_802.11r-2008)). When using these features they're vulnerable to the same key reinstallation attack as a regular client, because they go through the same handshake.

Indeed, this is specifically mentioned in the KRACK Attack website:

>Our main attack is against the 4-way handshake, and does not exploit access points, but instead targets clients. So it might be that your router does not require security updates. We strongly advise you to contact your vendor for more details. In general though, you can try to mitigate attacks against routers and access points by disabling client functionality (which is for example used in repeater modes) and disabling 802.11r (fast roaming). For ordinary home users, your priority should be updating clients such as laptops and smartphones.

So the priority remains "patch your devices", but you shouldn't discount your access points - especially if you use either of the above features. If you can't get a patch for your AP, it's probably a good idea to disable them entirely.