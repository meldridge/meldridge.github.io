---
layout: email
title: Bad Rabbit and the Shadow Internet
---

A couple of weeks ago, a piece of ransomware called 'Bad Rabbit' started spreading like wildfire around Ukraine and Russia. It looks superficially similar to the NotPetya worm from earlier in the year (the one which cost [Maersk Shipping](https://www.theregister.co.uk/2017/08/16/notpetya_ransomware_attack_cost_us_300m_says_shipping_giant_maersk/) and [Merck Pharmaceuticals](https://www.techrepublic.com/article/notpetya-ransomware-outbreak-cost-merck-more-than-300m-per-quarter/) hundreds of millions of dollars in losses).

In contrast to NotPetya, which was a [wiper](https://en.wikipedia.org/wiki/Wiper_(malware)) masquerading as ransomware, Bad Rabbit actually appears to perform the ransomware component correctly. The initial infection vector is significantly less sophisticated than NotPetya: the latter used a compromised auto-update in an accounting software used by companies doing business in Ukraine, while Bad Rabbit just relies on drive-by downloads of a fake Adobe Flash update.

The most interesting thing about Bad Rabbit (aside from the links to NotPetya) is the lateral movement techniques it uses to infect other machines once it had obtained a foothold on a network.

[**Bad Rabbit used NSA “EternalRomance” exploit to spread, researchers say**](https://arstechnica.com/information-technology/2017/10/bad-rabbit-used-nsa-eternalromance-exploit-to-spread-researchers-say/)

>Bad Rabbit, named for the Tor hidden service page that it directs victims to, initially landed on affected networks through a "driveby download" attack via compromised Russian media websites. Arriving disguised as an Adobe Flash update, Bad Rabbit has multiple ways of spreading itself across networks. It can exploit open SMB connections on the infected Windows system, and it can also exploit the Windows Management Instrumentation Command-line (WMIC) scripting interface to execute code remotely on other Windows systems on the network, according to analysis by EndGame's Amanda Rousseau. And the malware has a collection of hard-coded usernames and passwords, as Rousseau and researcher Kevin Beaumont noted.

Part of the reason NotPetya was so effective was because it used a version of [Mimikatz](https://github.com/gentilkiwi/mimikatz) to retrieve credentials from the systems it had compromised, and then used these credentials to move laterally within the network with standard administrative tools like [PsExec](https://docs.microsoft.com/en-us/sysinternals/downloads/psexec).

For organisations which happened to use the same password for local administrator accounts on every system, this was absolutely devastating: if NotPetya owned a single endpoint, it could own the entire enterprise. One assumes Maersk and Merck were in this category.

The important thing to note here is that this is not a novel technique: this is exactly what a pentester will do once they've got a foothold on a corporate network (it's literally "Lateral Movement 101"). 

What **is** novel is that ransomware authors are starting to apply these techniques to their malware, and, more importantly, just how successful they're being when they do.

Those of you who have been on this mailing list for a while (back when it was sent from my KPMG account) might remember the email I sent out regarding WannaCry and the EternalBlue exploit back in June:

>For an even more effective attack, once we've exploited a system in a corporate network we could use EternalBlue to escalate our access until we've obtained access to the Domain Controller, or DC. This is usually a manual process, but could potentially be automated.
>
>Once we have the DC, we instruct every system in the domain to execute the ransomware using normal Windows administrative tools like PsExec or Group Policy. For bonus points we first tell every system to turn off antivirus and other endpoint protection, delete all backups, and temporarily lock out other administrators so they can't interfere while we're encrypting everything.
>
>None of the above is particularly advanced by the standards of modern offensive security. Minus the ransomware, this is exactly the process used in pentesting engagements, except usually without access to recently leaked NSA exploits.  
>
>To put it mildly, if our infrastructure can get wrecked this badly by a few guys in North Korea who didn't even do a good job of writing their malware, we're going to have a bad time once someone good comes calling.

Someone good did come calling, in the form of NotPetya. Now they've improved on those techniques again with Bad Rabbit, by building in techniques such as basic brute-forcing of common passwords, on top of the credential theft and SMB exploits used previously.

Cisco's Talos team has a good [technical writeup](http://blog.talosintelligence.com/2017/10/bad-rabbit.html), for those interested.


### The grugq and The Shadow Internet

The grugq has written another interesting article in the wake of Bad Rabbit, discussing how these worms have managed to propagate worldwide despite being designed to only perform lateral movement inside a local network:

[**The Shadow Internet**](https://blog.comae.io/the-shadow-internet-d42b7195a118)

>Critically though, each worm used only lateral traversal methods, and the latter two restricted themselves to only accessible targets. Despite these limitations on mobility, which objectively should seem to limit the victims to intranet targets within the confines of a network perimeter, these worms became global epidemics. This empirically demonstrates that there is a Shadow Internet of linked networks that provides pathways to compromise targets globally without targeting public facing Internet systems.
>
>The artificial conceptual idea of a private bounded intranet, and a public Internet is mostly fantasy. Cold reality is that alongside the public Internet, there is a private Shadow Internet which connects intranets to each other in unpredictable ways. The Home Depot breach revealed deliberate exploitation of this Shadow Internet (attackers gained access to a trusted supplier and then used their private connection to reach Home Depot’s network).
>
>The porous nature of perimeter defences is nothing new, nor is attacker abuse of trust relationships, these worms merely reveal the global reach of these problems. Aggressive autonomous malware has demonstrated, repeatedly, just how many private networks are connected to each other. A sort of infosec “six degrees of separation.”

As always, the full article is worth a read.