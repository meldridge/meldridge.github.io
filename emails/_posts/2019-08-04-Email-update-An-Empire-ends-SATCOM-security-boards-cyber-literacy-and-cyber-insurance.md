---
title: An Empire ends, SATCOM security, boards, cyber literacy, and cyber insurance
---

Good evening.

It's been quite a while since my last email! I hope those of you in Europe are enjoying your summer holidays and managing to avoid the heat.

### Death of an Empire 

[PowerShell Empire](https://www.powershellempire.com/) was released back in 2015 as a demonstration of how useful PowerShell was as a post-exploitation tool on Windows systems, and has been a mainstay of free offensive toolkits ever since. Many of you would have seen me use Empire in demonstrations: my [Bash Bunny party trick](https://www.youtube.com/watch?v=1ohSJiXx93w) uses an Empire stager.

In addition to being written in PowerShell, Empire included some fairly advanced command & control techniques (at least compared to other free toolkits like Meterpreter), such as the ability to set custom [jitter values](https://www.activecountermeasures.com/detecting-beacons-with-jitter/) for Empire agents.

These days, Empire has been well and truly overtaken. As I wrote [last September](https://markeldo.com/Email-update-WireGuard-complexity-security-education-and-C-sharp-for-post-exploitation/):

>There have been a few excellent offensive security tools released recently by the SpecterOps team, including GhostPack, SharpView, and now SharpSploit and Rubeus.
>
>Many of these tools are ports or re-implementations of existing PowerShell post-exploitation tools in C# .NET, because Microsoft has made such a vast improvement in detecting and blocking malicious PowerShell with PowerShell v5 and the Antimalware Scripting Interface (AMSI).

PowerShell-based attacks have been on borrowed time for a while, and last Thursday, the project maintainers [announced](https://mobile.twitter.com/xorrior/status/1156626182978383874) that they're pulling the pin: Empire is officially no longer being maintained. 

Thanks to the Empire team for all of their fantastic work over the last four years. It was a great run while it lasted.

### Last call for SATCOM security

Black Hat 2019 kicked off this weekend, and so I thought it was worth revisiting some of last year's presentations I missed.

Last August, [Reuben Santamarta presented](https://www.blackhat.com/us-18/briefings/schedule/#last-call-for-satcom-security-11192) on the security of satellite communications (satcom) systems, and various realistic attacks including hacking into the modems of in-flight aircraft:

>Some of the largest airlines in the US and Europe had their entire fleets accessible from the Internet, exposing hundreds of in-flight aircraft. Sensitive NATO military bases in conflict zones were discovered through vulnerable SATCOM infrastructure. Vessels around the world are at risk as attackers can use their own SATCOM antennas to expose the crew to RF radiation.

The actual vulnerabilities aren't particularly interesting—most of them are simply a result of satcom hardware left publicly accessible over the internet with hardcoded credentials. This is a common story for [Internet of Things devices](https://arstechnica.com/information-technology/2017/06/internet-cameras-expose-private-video-feeds-and-remote-controls/), but you would expect an airline satcom system to be better protected than an eBay IP camera.

One of the potential attacks described by Santamarta involves using the satcom antenna itself as a directed-energy weapon: pointing the antenna at passengers on aircraft or ocean vessels and increasing the transmit power to unsafe levels. This sort of attack is very Hollywood, but it's absolutely feasible. 

Satcom antennas are generally designed in such a way that they won't transmit (radiate) unless they have _receive lock_. In other words, the antenna must be pointing at the correct satellite before they enable the transmitter. The catch is that this safety feature often relies upon information provided by the satellite modem—the same modem which has Telnet open to the internet with hardcoded credentials. Once an attacker compromises the modem, they can tell the antenna whatever they like.

Another attack is less Hollywood but has far more practical implications: satcom antennas generally require a GPS signal in order to know where to point—otherwise they'd have to scan the entire sky looking for their satellite. Depending on the system, this location information might be accessible through the modem, so if you compromise the modem, you can pinpoint the antenna. If your position is sensitive (for example: if you're a military unit) this is less than ideal.

The full talk is available on YouTube [here](https://www.youtube.com/watch?v=8M8MurmuEtQ), and the white paper is [here](http://i.blackhat.com/us-18/Thu-August-9/us-18-Santamarta-Last-Call-For-Satcom-Security-wp.pdf).

### Boards and cyber literacy

This is an article which has been sitting in my list for a while. [Rachael Falk, for the AFR](https://www.afr.com/news/economy/good-cyber-security-starts-with-boards-that-ask-questions-20181125-h18bku):

>There is no doubt boards of listed companies have a lot of information to assimilate and with the right mix of skills on the board and excellent external advisors, they are able to shape and guide on complex risks and strategy. Not every board member needs to be a lawyer to understand legal risk or an accountant to understand the annual audited accounts. But they do need to know enough to be able to understand when something isn't quite right. [...]
>
>Recently, the director-general of the Australian Signals Directorate, which is Australia's signals intelligence agency, said in his first public speech, *"In the majority of hacking cases we investigate, I can tell you the root cause is a known problem with a known fix."* In last year's ASX 100 Cyber Health Check Report, in one answer to a question only 11 per cent of boards (who responded to the survey) had "a clear understanding of where the company's key information or data assets are shared with third parties". These two points alone are a clear indication that some boards are still struggling to get the basics right.

Long-time readers will recognise that this as a drum I've been beating for a while. From an email [last September](https://markeldo.com/Email-update-British-Airways-technical-leadership-and-cold-boot-attacks/):

>There are very few large projects which don’t include a significant IT component (even non-IT projects are delivered using IT), and good managers with technical skills are hard to find.
>
>I recently had a fairly candid discussion with a senior Swedish executive, who commented that they might be the last generation of executives who can get away without having a technical background.
>
>As I said, I have an obvious bias, but I think there’s something to this. **These days, every large company is a tech company**—it’s just a question of degree.

It would be laughable to have a board of a listed company without any members who could understand a financial audit report, but outside the tech sector you'd be doing well to see IT and cyber security issues treated with anywhere near the same level of diligence.

This shouldn't be surprising: compared to accounting, cyber security is an *extremely* immature field. Unfortunately it's also one of those non-financial risks which is [incredibly costly](https://www.newscientist.com/article/2208964-british-airways-faces-largest-ever-data-breach-fine-for-2018-hack/) if not managed well.

Speaking of which...

### Cyber insurance volatility causing a rethink by insurance providers

From Jeff Stone at [cyberscoop](https://www.cyberscoop.com/cyber-insurance-demand-cost-2019/):

>Direct cyber insurance premiums grew to $2 billion last year, up 26 percent since 2015, according to figures published July 25 by Moody’s Investors Service. That figure represents less than 1 percent of premium insurance revenue in the U.S., but it’s clear the increasing claims over the past three years are driven largely by concerns about data breaches, distributed denial-of-service attacks and, perhaps most notably, ransomware.
>
>The problem, despite all the demand, is that some insurers are now re-thinking whether it’s in their best interest to keep offering the plans that help clients recover from devastating cyberattacks.

We've discussed cyber insurance a few times in these emails, including the case where an insurer [refused to pay out a policy](https://www.zdnet.com/article/notpetya-an-act-of-war-cyber-insurance-firm-taken-to-task-for-refusing-to-pay-out/) for a victim of the NotPetya attack, claiming that it was an act of war and therefore fell under the war exclusion clause of the policy.

It seems that the issues with cyber insurance are much more fundamental than that:

>The problem, as Smith put it, is that it’s just difficult to gather the information necessary to build the mathematical models that determine how to assign risk. Unlike health, automotive or even natural disaster insurance, there are too few data points around cyber exposure and the attacks that cause business interruption. It’s much easier to quantify the risk and cost of a car crash or a hurricane than the result of a zero-day attack carried out by state-sponsored hackers.

This makes intuitive sense: while we do have insurance against intentional malicious acts such as burglary and arson, it's a lot harder for a single arsonist to wipe out an entire industry in one go.

It will be fascinating to see this issue play out over the next few years.