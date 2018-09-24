---
layout: email
title: 
---

Good morning.

Some quick links before we get into the news. Bruce Schneier recently linked to a [report](https://csis-prod.s3.amazonaws.com/s3fs-public/publication/180227_Cancian_CopingWithSurprise_wAppen_Web.pdf?0rD0fcMI7gGXNLM1AYJWoVsNT_xSxOiu) on future cyber warfare by Mark Cancian from the Centre for Strategic and International Studies. I'd recommend reading [this excerpt](https://www.schneier.com/blog/archives/2018/08/future_cyberwar.html) on Schneier's blog, it's compelling stuff.

If you're in the mood for reading security papers, Nick Sullivan from Cloudflare has posted [this Twitter thread](https://twitter.com/grittygrease/status/1028769194643353600), which links to some of the seminal works in the field of security and cryptography. It's an excellent list.

### Skills Shortages and Security Education

Ret2 Systems

[Ret2 systems blog](https://blog.ret2.io/2018/09/11/scalable-security-education/):

>Traditional exploitation based wargames often require players to `ssh` into an open (educational) linux server that hosts the wargame’s challenge binaries. By exploiting the first challenge, players will gain access to a protected flag file that contains the password to the next level, allowing them to login to the next level and continue the game.
>
>The problem with using these resources for self-guided education is that there often isn’t a clear understanding of what knowledge is required to complete a given challenge. On top of that, the metric for success is often black and white, making it hard for players to know if they are progressing down the right path or simply wasting their time.

They've developed a browser-based education platform which simulates all of the tools you'd normally use for binary exploit development and reverse-engineering:an x86 disassembler, debugger, 

 [Corruption wargame](https://wargames.ret2.systems/level/corruption)

### SharpSploit, GhostPack, and the shift to C# post-exploitation tools

There have been a few excellent offensive security tools released recently by the SpecterOps team, including [GhostPack](https://www.harmj0y.net/blog/redteaming/ghostpack/), [SharpView](https://github.com/tevora-threat/SharpView), and now [SharpSploit](https://posts.specterops.io/introducing-sharpsploit-a-c-post-exploitation-library-5c7be5f16c51).

Many of these tools are ports or re-implementations of existing PowerShell post-exploitation tools in C# .NET, because Microsoft has made such a vast improvement in detecting and blocking malicious PowerShell with PowerShell v5 and the Antimalware Scripting Interface (AMSI) I discussed in my [last email](/Email-update-AMSI-for-macros-iPhone-PACs-reinventing-the-URL-and-infosec-resilience/).

As Ryan Cobb puts it in his [SharpSploit post](https://posts.specterops.io/introducing-sharpsploit-a-c-post-exploitation-library-5c7be5f16c51):

>There seems to be a trend developing on the offensive side of the security community in porting existing PowerShell toolsets to C#, particularly with the recent releases from my SpecterOps teammates, including: @harmj0y's GhostPack toolset and @0xthirteen's SharpView. And SharpSploit is another piece to that puzzle. With the added security features in PowerShell (ie. ScriptBlock Logging, AMSI, etc.), it makes sense that red teamers are investing in other options. And C# is the logical next step from PowerShell, seeing that they both are based on the .NET framework and porting toolsets from PowerShell to C# is fairly easy to do.

I always found PowerShell a horrible language to write complex software in, so I can't say I'm saddened by this development!

Cobb's post goes into some detail about the complications introduced by using C# rather than PowerShell for post-exploitation, and it's well worth a read if you're interested.

### Malware automation

https://www.zdnet.com/article/new-xbash-malware-combines-ransomware-coinminer-botnet-and-worm-features-in-deadly-combo/

https://usa.kaspersky.com/resource-center/threats/computer-viruses-vs-worms


### WireGuard

https://arstechnica.com/gadgets/2018/08/wireguard-vpn-review-fast-connections-amaze-but-windows-support-needs-to-happen/
Complexity =/= security: https://www.schneier.com/blog/archives/2018/06/thomas_dullien_.html