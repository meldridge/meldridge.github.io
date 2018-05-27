---
layout: email
title: NotPetya Attribution, Cyber Insurance, and Inoculating Networks
---

Good morning!

I've finally made the switch from writing these directly in Gmail to using MailChimp. Hopefully this means you'll be less likely to see  weird formatting and font issues, and I'll be less likely to have my Gmail account blacklisted by spam filters.

As always, I welcome any feedback to these emails, so let me know what you think.

### NotPetya: Five Eyes countries name Russia as culprit

That Russia was behind last year's devastating [NotPetya](https://en.wikipedia.org/wiki/Petya_(malware)#2017_Cyberattack) attack was never really in doubt, but we now have [official statements](https://www.bleepingcomputer.com/news/security/all-five-eyes-countries-formally-accuse-russia-of-orchestrating-notpetya-attack/) blaming Russia from the US, UK, Australia, Canada, and New Zealand.

From the [U.K. statement](https://www.gov.uk/government/news/foreign-office-minister-condemns-russia-for-notpetya-attacks):

> The UK’s National Cyber Security Centre assesses that the Russian military was almost certainly responsible for the destructive NotPetya cyber-attack of June 2017.
> 
> Given the high confidence assessment and the broader context, the UK government has made the judgement that the Russian government – the Kremlin – was responsible for this cyber-attack.

It's worth pointing out that "almost certainly" is as definitive as you will ever get for something like this. 

It's also worth pointing out that the [Australian statement](https://minister.homeaffairs.gov.au/angustaylor/Pages/notpetya-russia.aspx) came from our Minister for Law Enforcement and Cyber Security, whose official website doesn't even support HTTPS. (Nice work, Australia.)

### NotPetya: Recap

A quick recap for those who haven't been following this story: NotPetya was a piece of malware delivered via a pretty sophisticated [supply chain attack](https://en.wikipedia.org/wiki/Supply_chain_attack): the attackers compromised the auto-update servers for a piece of Ukrainian accounting software known as [M.E.Doc](https://www.theregister.co.uk/2017/07/05/ukraine_authorities_raid_me_docs_in_notpetya_investigation/), and then pushed out an update to all users which included the malware.

Aside from the incredible damage done to Ukranian companies by the attack, NotPetya also impacted several large multinational companies who did business in Ukraine (and therefore used M.E.Doc to file their taxes).

 One of these companies was Danish conglomerate Maersk, who reported that the attack cost them [300 million USD](https://www.theregister.co.uk/2017/08/16/notpetya_ransomware_attack_cost_us_300m_says_shipping_giant_maersk/), and required a complete rebuild of their entire IT infrastructure:

[**The Register: IT 'heroes' saved Maersk from NotPetya with ten-day reinstallation bliz**](
https://www.theregister.co.uk/2018/01/25/after_notpetya_maersk_replaced_everything/)

> Speaking on a panel at the World Economic Forum this week, Møller-Maersk chair Jim Hagemann Snabe detailed the awful toll of the ransomware epidemic as necessitating the reinstall “4,000 new servers, 45,000 new PCs, and 2,500 applications”. Or as Snabed described it: "a complete infrastructure."
>
> "And that was done in a heroic effort over ten days," he said.

That's a hell of a job to pull off in ten days. In a weird way, seeing the total number of systems which were wiped by NotPetya drives home the impact of the attack more than the "$300 million" cost figure.

### NotPetya and Lateral Movement

The technique NotPetya used to spread across a network can be very roughly summarised as:

1. Execute on a machine
2. Use the NSA's *EternalBlue* exploit to obtain SYSTEM privileges on this system or other systems on the network (if they haven't been patched)
3. Use Mimikatz to dump stored usernames and passwords/hashes from memory
4. Use these usernames and passwords to propagate to more systems, if *EternalBlue* didn't work on them

This isn't particularly difficult or complicated: it's the same technique that any penetration tester would use once they have a foothold on an internal network. NotPetya just automated the process (and wiped any system it managed to compromise).

The critical part is that this technique is absolutely *devastating* in any network where multiple Windows computers share the same password for the built-in "Administrator" account. Once NotPetya compromises a single system in the network and retrieves that password, it can spread across the entire network in a matter of minutes.

Unfortunately, using the same Administrator password for every computer in a domain was one of Microsoft's officially supported methods for managing systems until 2014, when they released official guidance telling people to stop doing it:
1. [MS14-025: Vulnerability in Group Policy Preferences could allow elevation of privilege: May 13, 2014](https://support.microsoft.com/en-us/help/2962486/ms14-025-vulnerability-in-group-policy-preferences-could-allow-elevati)
2. [(Don’t) Set or Save Passwords Using Group Policy Preferences](https://blogs.technet.microsoft.com/ash/2014/11/10/dont-set-or-save-passwords-using-group-policy-preferences/)
3. [cpassword – MS14-025](https://blogs.technet.microsoft.com/positivesecurity/2017/02/23/cpassword-ms14-025/)

(For an excellent summary of this whole issue, see Sean Metcalf's post [here](https://adsecurity.org/?p=2288))

It wasn't until 2015 when Microsoft released a much better solution for managing Administrator passwords ([LAPS](https://technet.microsoft.com/en-us/library/security/3062591.aspx)), but it's still very common to find corporate networks where the Administrator account is identical across all of the Windows systems in the domain.

Finally, and most importantly: if any one of the systems compromised by NotPetya is the laptop or desktop being used by a Domain Administrator ('God', in a Windows network), NotPetya will grab their credentials as well. At that point, you're probably going to be in the position of [needing to rebuild your entire infrastructure from scratch](https://www.theregister.co.uk/2018/01/25/after_notpetya_maersk_replaced_everything/).


### Cyber Security Insurance and War Exclusion Clauses

As a side-note, one of the interesting aspects of the NotPetya story is its implications for insurance. 

I'm *far* from an expert on cyber security insurance, but it's fairly typical for insurance policies to contain a [War Exclusion Clause](https://www.investopedia.com/terms/w/war-exclusion-clause.asp), which means that damages caused by "acts of war" will not be covered by the insurer.

When it comes to kinetic warfare this is reasonably well-defined, but when it comes to the cyber domain it's still an open question. One could very easily make the argument that NotPetya was an act of cyber warfare by Russia against Ukraine, which would not be very fun if you were counting on your insurance to cover $300 million worth of losses.

Cyber security is still a very new field, and it will be interesting to see how this plays out.


### Innoculating networks: NCC Group releases a de-fanged NotPetya

This one is fascinating. From the NCC Group [blog](https://www.nccgroup.trust/uk/about-us/newsroom-and-events/blogs/2018/february/eternalglue-part-two-a-rebuilt-notpetya-gets-its-first-execution-outside-of-the-lab/):

>In June 2017, we were asked by a client to rebuild NotPetya from scratch. Instead of the data destruction payload, they asked for telemetry and safeguards. Why? Because they wanted to measure what the impact of NotPetya would have been.

The result:

>* The customer ran it on one machine in their engineering network with no privileges.
>* It found three machines unpatched.
>* It exploited those three machines to obtain kernel level access.
>* It infected those three machines.
>* Within ten minutes it had gone through the entire engineering network using recovered/stolen credentials.
>* It then took the domain about two minutes later.
>* 107 hosts were owned in roughly 45 minutes before the client initiated the kill and remove switch.

Twelve minutes from release until *complete domain compromise*, after being dropped on a single domain-connected computer with no privileges.

I doubt rewriting malware and dropping it on client networks will become a standard tool for consulting firms, but this sort of project is an very effective way to demonstrate the potential consequences of poor patching practices or not managing privileged accounts properly. 

When it comes to cyber security it can be easy to watch the headlines and think "Russia wouldn't target us", but that's the problem: they didn't target Maersk either, Maersk just happened to be caught in the crossfire.