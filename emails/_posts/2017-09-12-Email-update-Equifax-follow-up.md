---
layout: email
title: Equifax follow-up
---

More news from the Equifax hack (the one where half of America had their social security numbers stolen).

### FireEye Backs Away From Burning Tires

The first one is good fun. Security company FireEye had a whitepaper on their website boasting of how they protect Equifax from zero-day exploits and Advanced Persistent Threats, with a [case study](https://www.theregister.co.uk/AMP/2017/09/11/equifax_incident_response_omnishambles/) containing several glowing endorsements from Equifax.

Unsurprisingly, this endorsement is looking less impressive in the wake of one of the biggest corporate hacks of all time, and FireEye is doing a bit of damage control.

To be to fair to FireEye, from what I could gather their software was only used for endpoint protection (i.e. running on desktops), so wouldn’t have had any chance of picking up a server breach from someone exploiting an Apache Struts bug and then pivoting into the customer database. There are plenty of poor security practices to blame in this incident, but endpoint protection isn’t one of them.

Even so, you can’t blame them for wanting to disassociate themselves with Equifax.

### Equifax and How Not to Generate Random PINs

In other news, it turns out the Equifax uses a facepalmingly-stupid method for generating user PINs. These are used for Equifax’s “Premier Service”, and allows a user to set a credit freeze on themselves (preventing anyone else from opening credit in their name). The service [gives you a PIN in order to authenticate yourself](https://arstechnica.com/information-technology/2017/09/equifax-moves-to-fix-weak-pins-for-security-freeze-on-consumer-credit-reports/) down the track (to remove the freeze).

Unfortunately, Equifax’s method for generating the PINs was just a timestamp of when you registered. If someone else knew the approximate date and time that you registered, they’d have a pretty easy time guessing your PIN:

<a href="https://twitter.com/webster/status/906346071210778625"><img src="/images/webster-equifax-freeze-pins.png" alt="Tweet by Tony Webster" class="tweet"/></a>

Not ideal.