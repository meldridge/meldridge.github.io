---
layout: email
title: The AA bill, PrivExchange, and harmj0y breaks the Active Directory trust model
---

Good evening.

Many of you would be aware of the Australian [Assistance and Access Bill](https://www.aph.gov.au/Parliamentary_Business/Bills_Legislation/Bills_Search_Results/Result?bId=r6195) which was passed on the last sitting day of parliament last year. I haven't covered the bill in great detail here for the simple reason that there was already plenty of good coverage available, and I hadn't spent enough time reading the legislation to feel like I was adding to it.

Having said that, there has also been a lot of uninformed noise surrounding the bill, so in the interest of helping boost the signal - [this piece by Stilgherrian](https://www.zdnet.com/article/whats-actually-in-australias-encryption-laws-everything-you-need-to-know/) provides a good summary, and there's a FAQ [here](https://github.com/alfiedotwtf/AABillFAQ/blob/master/README.md) which seems to be reasonably well put-together.

Onto the news.

### PrivExchange: from Exchange mailbox to Domain Admin

Dirk-jan Mollema recently dropped an excellent write-up of a configuration issue in Microsoft's Exchange mail servers which allows escalation to Domain Administrator on most Active Directory networks if you have access to a valid mailbox account (for any user).

[**Abusing Exchange: One API call away from Domain Admin**](https://dirkjanm.io/abusing-exchange-one-api-call-away-from-domain-admin/)

>In most organisations using Active Directory and Exchange, Exchange servers have such high privileges that being an Administrator on an Exchange server is enough to escalate to Domain Admin. Recently I came across a blog from the ZDI, in which they detail a way to let Exchange authenticate to attackers using NTLM over HTTP. This can be combined with an NTLM relay attack to escalate from any user with a mailbox to Domain Admin in probably 90% of the organisations I’ve seen that use Exchange. This attack is possible by default and while no patches are available at the point of writing, there are mitigations that can be applied to prevent this privilege escalation.

This is a big deal, and it's worth reading the post in full. Mollema does an excellent job of explaining everything.

For those of you who aren't familiar with Exchange: if you're using email in a modern enterprise, your Outlook client is probably talking to one of two things:
1. Exchange (installed on-premises on a Windows server somewhere)
2. Office 365 (still Exchange, but hosted by Microsoft)

The problem discovered by Mollema only affects the former. (One of the selling points of the latter is to avoid exactly this sort of scenario.)

Quoting Mollema (emphasis mine):

>The main vulnerability here is that Exchange has high privileges in the Active Directory domain. The Exchange Windows Permissions group has WriteDacl access on the Domain object in Active Directory, which enables any member of this group to modify the domain privileges, among which is the privilege to perform DCSync operations. Users or computers with this privilege can perform synchronization operations that are normally used by Domain Controllers to replicate, **which allows attackers to synchronize all the hashed passwords of users in the Active Directory.**

Because of the way Active Directory works, accessing all of the hashed passwords is actually a lot worse than it sounds. One of those hashed passwords is for the `"krbtgt"` account, and this password hash is the encryption key material used by the Key Distribution Centre (KDC) to create all of the Kerberos tickets for the Domain. 

That's a bit of a mouthful, so to summarise: if someone gets the `krbtgt` hash, they own your domain. They can impersonate any user or system, and can trivially wipe every machine in the network - and that's if they lack imagination.

Again, it's worth reading the full post - particularly if you happen to manage Exchange servers.

### harmj0y breaks the Active Directory forest trust model

This bombshell was released back in November, but it didn't seem to get quite as much attention as it deserved over the break.

In Active Directory, a 'forest' is usually the boundary (in Windows terms) for an entire organisation. A forest might contain one or more 'domains', and an organisation might have several forests, but any given corporate network will usually involve a single Active Directory forest which needs to be protected very carefully  - if only because that's the forest where the CEO's laptop sits.

(Taking the previous story for example: Mollema's post was describing a way to compromise an entire forest with access to a single Exchange mailbox.)

In some cases, an organisation's forest will have a "trust" with another forest. For example: if Wombat Petroleum acquires Kangaroo Gas, part of the usual digestion process will involve setting up a trust between their respective forests, so that users in one company can access systems in the other.

In theory, this is a robust security boundary: setting up a trust with another forest doesn't automatically give them access to your stuff - only the specific things you want them to. As long as you do it correctly, a trust doesn't automatically increase the risk of your own forest being compromised.

You can probably guess where this is going.

From [harmj0y's blog](http://www.harmj0y.net/blog/redteaming/not-a-security-boundary-breaking-forest-trusts/):

>For years Microsoft has stated that the forest was the security boundary in Active Directory. For example, Microsoft’s “What Are Domains and Forests?” document (last updated in 2014) has a “Forests as Security Boundaries” section which states (emphasis added):
>
>>_Each forest is a single instance of the directory, the top-level Active Directory container, and **a security boundary** for all objects that are located in the forest. **This security boundary** defines the scope of authority of the administrators. In general, **a security boundary is defined by the top-level container for which no administrator external to the container can take control away from administrators within the container.** As shown in the following figure, no administrators from outside a forest can control access to information inside the forest unless first given permission to do so by the administrators within the forest._
>
>Unfortunately, this is not the case. The forest is no longer a security boundary.

This is a bit like walking into a physics conference and dropping the news that the speed of light isn't a constant.

For the sake of brevity I'll let harmj0y's excellent summary stand alone here:

>The tl;dr non-technical explanation of “Why Care?” is that if your organization has a two-way forest trust (possibly ‘external’ trusts as well, more on that later) with another Active Directory forest, and if an attacker can compromise a single machine with unconstrained delegation (e.g. a domain controller) in that foreign forest, then they can leverage this to compromise your forest and every domain within it. In our opinion, this is very bad.

Yep.