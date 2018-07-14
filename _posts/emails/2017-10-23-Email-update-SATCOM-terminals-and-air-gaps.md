---
layout: email
title: SATCOM terminals and air gaps
---

A meta note: I may miss an email or two this week - I'm at the [E-Vote-ID conference](https://www.e-vote-id.org/) in Austria to present my [paper](https://link.springer.com/chapter/10.1007/978-3-319-68687-5_8) on the WA online voting system, so I may not have time and/or connectivity in the evenings. 

Today's catfact is one close to my heart: security and satcom! Ken Munro from Pen Test Partners has done some interesting work on the Satellite Communications terminals used by commercial shipping companies to provide internet connectivity while at-sea:

[**OSINT from ship satcoms**](https://www.pentestpartners.com/security-blog/osint-from-ship-satcoms/) (The Register story [here](https://www.theregister.co.uk/2017/10/13/it_at_sea_makes_data_too_easy_to_see/))

>I gave a talk in Athens recently to a number of shipping lines about infosec. One thing that struck me were the similarities between the challenges maritime cyber is facing now and the challenges industrial controls security in utilities started addressing several years ago.
>
>Back in the day, ICS ran on dedicated, isolated networks. Network protocols were custom and arcane, security was non-existent in these safety critical systems. But it didn’t really matter that much, so long as physical security of the endpoints and comms was good. The threat vector and attacks seen were mostly grumpy, knowledgeable ICS/SCADA engineers.
>
>Now ships: complex industrial controls, but floating. Traditionally isolated, now always-on, connected through VSAT, GSM/LTE and even Wi-Fi. Crew internet access, mashed up with electronic navigation systems, ECDIS, propulsion, load management and numerous other complex, custom systems. A recipe for disaster.

For his research Munro just used the [Shodan](https://www.shodan.io/) search engine. For example, searching for "Sailor 900" nets you a bunch of publicly-accessible Cobham Sailor 900 Satcom control systems. 

One of the top 5 results is for an IP registered in Milan, and just browsing to the IP address on port 9001 gives you direct access to all of the information from the satcom terminal, including position (from GPS) and heading. If you were a pirate crew, that information alone would be quite useful.

Beyond this, Munro points out that all of the common systems have default credentials for the administrative panel (similar to your router at home), and there's a fair chance that the bulk of systems aren't set with strong passwords, if they're changed from the default at all. *(Disclaimer: do not try testing this yourself on other people's systems, for reasons which should be obvious.)*


### Your air gap will not save you... especially when someone later removes it.

One of the big lessons learned from the [Stuxnet](https://en.wikipedia.org/wiki/Stuxnet) attack on Iran back in 2010 was that you can't rely on an air gap alone to protect you from attackers - a sophisticated enough adversary will find away across that gap.

It has been depressingly common for IT personnel to assume that an air gap means they're automatically secure by virtue of not being physically connected to the internet, and that this gives them the excuse to throw normal security practices out of the window. 

This is still a problem now, even when we should know better. Air gaps are useful (and essential for many types of network), but they're not a panacea. Treating them as one will just lead to pain.

As Munro mentions in his blog post, this is part of the reason why Industrial Control Systems (ICS) have been so terrible from a security standpoint. Back in the day, these systems were on isolated networks with no internet connectivity, and so their security practices were lazy.

The same is true of ship-borne IT systems for commercial shipping, and for the same reasons. 10 years ago you never had to worry about someone hacking into your stuff while you were at sea, because... well, you were at sea. These days, everyone has satcom terminals for internet connectivity.

Unfortunately, as with the Internet of Things, the state of security on these terminals is a consequence of commercial demand - this is a cost-sensitive market, and customers aren't demanding that security be made a priority. Not yet, anyway.