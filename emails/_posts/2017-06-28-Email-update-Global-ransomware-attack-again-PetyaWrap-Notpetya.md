---
layout: email
title: "Global ransomware attack again: PetyaWrap/NotPetya"
---

Big news overnight. There’s another ransomware worm on the move, which appears to be based on the Petya ransomware. So far it’s hit multiple countries in Europe, most notably Ukraine and Russia. It’s also apparently hit Maersk hard.

Several places are calling it PetyaWrap, NotPetya, or (if they’re lazy) just Petya.

https://threatpost.com/second-global-ransomware-outbreak-under-way/126549/

All of the below is based on early reverse-engineering from other sources, so take it with a hefty grain of salt. Detailed analysis is always difficult this early on.

### Encryption

Petya reboots affected systems and then encrypts the Master Boot Record (MBR). It’s quick, and makes systems unusable. If you see your system suddenly reboot and start running a “CHKDSK”, power it off and hope you were quick enough.

### Infection Method

According to some early reports, it uses both CVE-2017-0199 (Office/WordPad client-side vulnerability) and EternalBlue (MS01-010), along with harvesting credentials from systems it’s compromised and moving laterally using PsExec.

The last one is new, and the combination of all three makes for an extremely advanced and virulent worm. It shouldn’t be – lateral movement using PsExec on modern systems requires you to use the built-in Administrator account (RID), which should be different on every system in an organisation (but often isn’t). Expect to hear a lot more about Microsoft Local Administrator Password Solution (LAPS) in the next few days, along with various Group Policy settings for preventing PsExec and other lateral movement methods like Pass-the-Hash.

### ‘Killswitch’

There’s word that adding the file “C:\Windows\perfc” can act as a killswitch, though I haven’t seen 100% confirmation. In a similar vein blocking “C:\Windows\perfc.dat” from writing or executing can kill it, [according to Dave Kennedy](https://twitter.com/HackingDave/status/879779361364357121 ).

### Digital Signature

The malware uses a faked Microsoft digital signature. Not faked well (it just contains the Microsoft metadata, but the signature is not validly signed by Microsoft). 

According to some tests by Andrew Morris, doing this actually fools several major AV tools, including Malwarebytes, TrendMicro, and Kaspersky. Mind-blowingly stupid, if so. [This twitter chain](https://twitter.com/Andrew___Morris/status/879715123849568256) is worth reading in full.

### Who is behind it?

Unknown at this stage. As with WannaCry paying the ransom is a waste of time – the email address in the ransom note is no longer functional. Very early speculation from grugc is that this is a nation state wanting to cause damage while making it look like another inept crimeware attack.

### _Update 9:09am_

A few people have asked: “So is it fair to say that if you patched your windows PC in may (after WannaCry) you're safe?”

Yes, with a caveat. 

If you have applied the March updates, you’ve been patched for MS17-010 and CVE-2017-0199. However, that only helps you against the Word exploit and the SMB propagation.

Even if you’re fully patched, if you’re sitting on a network with someone else who has been owned, and you’re sharing the same Administrator password as them, you’re still vulnerable to the PsExec lateral movement component. No patch can protect you from sharing passwords across systems. That’s what makes this strain of Petya so dangerous.

### _Update 9:17am_

Here’s the best summary I’ve seen written so far, [by Dan Goodin at Ars Technica](https://arstechnica.com/security/2017/06/a-new-ransomware-outbreak-similar-to-wcry-is-shutting-down-computers-worldwide/): 

>The malware attack, according to researchers at Kaspersky and AV provider F-Secure, uses a modified version of EternalBlue. Researchers from AV provider Eset said in an e-mail that the malware also used the PSExec command-line tool. The precise relationship among the various infection methods isn't yet clear. Eset said it appears the attacks use EternalBlue to get inside a network and then use PSExec to spread from machine to machine. "This dangerous combination may be the reason why this outbreak has spread globally and rapidly, even after the previous outbreaks have generated media headlines, and hopefully most vulnerabilities have been patched," an Eset researcher told Ars. "It only takes one unpatched computer to get inside the network, and the malware can get administrator rights and spread to other computers.


and

>Tuesday's ransomware package took the highly unusual step of instructing victims who had paid the ransom to e-mail their payment information, rather than using a different receiving wallet for each victim. Within a few hours, the e-mail address was shut down, making it impossible for people who paid the ransom to recover their data. It also used no command and control server to keep track of and send instructions to infected computers. Those traits, which are sure to torpedo chances of the malware generating profits for its creators, prompted International Computer Science Institute researcher Nicholas Weaver to speculate the true intent of the malware developers was to sow destruction, not make money.