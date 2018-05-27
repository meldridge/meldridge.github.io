---
layout: email
title: ASD's responsibilities, wireless deauth attacks, and radio jamming
---

Good morning.

In the last email I mentioned the most recent update to [BloodHound](https://github.com/BloodHoundAD/Bloodhound/wiki), but mistakenly linked to the blog post for version 1.3. The latest update is in fact [version 1.5](https://blog.cptjesus.com/posts/bloodhound15), which introduces the ability to test attack paths which abuse Group Policy Objects (GPOs).

Once again, if you haven't seen it, I'd highly recommend watching the [presentation](https://www.youtube.com/watch?v=wP8ZCczC1OU) where BloodHound was introduced. The tool has changed quite significantly since then, but the core idea remains the same.


### ASD and unsolicited penetration testing

There's been some [very interesting news](http://www.abc.net.au/news/2018-05-01/cyber-spy-agency-expansion-should-be-considered-dutton-says/9715176) over the last couple of days regarding the Australian Signals Directorate, which is worth reading. One of the ideas in the leaked proposal is to allow ASD to perform unsolicited penetration tests on Australian companies:

>ASD would also be allowed to conduct covert "penetration tests" on Australian companies to test their cyber security and vulnerability to hacker attack.
>
>Such tests are already conducted on companies with their express permission.

For those of you back in Aus and working in the field, it's worth keeping a very close eye on this story.


### Wireless deauth attacks

This is a fun one. Someone has made a [Giant Red Button](https://www.youtube.com/watch?v=HWZrBoIKacw) which kicks everyone off of nearby Wi-Fi networks. It's ridiculous and unnecessary, and I want one.

The attack itself is what's known as a ["deauth attack"](https://en.wikipedia.org/wiki/Wi-Fi_deauthentication_attack), which abuses a feature of the 802.11 standard designed to allow Wi-Fi Access Points to kick off rogue users. Unfortunately, it's possible to pretend to be an Access Point and tell other users they've been kicked off their network - and their device will dutifully comply with your instruction—*even if you're not able to connect to the network they're using*. It's great fun.


### Jamming, SDR, and USB-VGA dongles

The deauth attack described above is effectively a sophisticated—and protocol specific—form of [radio jamming](https://en.wikipedia.org/wiki/Radio_jamming). Protection against jamming attacks has been part and parcel of military communications systems since World War II, but this protection is never really considered in civilian systems (protection against *unintentional interference* is a different issue).

This is for good reason: compared with other protections like encryption, properly protecting against jamming attacks requires very severe trade-offs in system performance, and those trade-offs just aren't justifiable in civilian systems which aren't intended to withstand a military threat.

For example, strategic military satellite communications links—designed to withstand intense jamming attacks and still provide reliable nuclear command & control—have data rates measured in [kilobits per second](https://en.wikipedia.org/wiki/Milstar). Even if 802.11 or 4G LTE are (by comparison) hopelessly vulnerable to jamming attacks, that sort of speed decrease isn't a compromise anyone in the civilian world would be willing to make. Jamming is a risk, but it's a risk which isn't worth mitigating.

Another factor in this equation, however, was that jamming historically required specialised hardware of the sort only the military had easy access to. It's also very illegal to jam commercial communications systems in most countries, which made manufacture of this sort of hardware not worth the effort even if you wanted to try it.

Given some of my earlier emails it might be obvious where this is going: [Software Defined Radio](https://en.wikipedia.org/wiki/Software-defined_radio). The widespread adoption of SDR has massively decreased the barrier of entry to anyone who wants to play with radio signals, and it no longer requires thousands of dollars in specialised equipment if you want to do something (again, very illegal) such as [jamming or spoofing nearby GPS receivers](https://www.rtl-sdr.com/spoofing-gps-locations-with-low-cost-tx-sdrs/).

The cost barrier has now gotten even lower, thanks to a new project:

[**Spoofing Cell Networks with a USB to VGA adapter**](https://hackaday.com/2018/04/23/spoofing-cell-networks-with-a-usb-to-vga-adapter/)
>At OsmoDevCon [Steve Markgraf] released osmo-fl2k, a tool which allows transmit-only SDR through cheap USB 3.0 to VGA adapters based on the Fresco Logic FL2000 chip. Available through the usual overseas suppliers for as little has $5 USD, these devices can be used unmodified to transmit low-power FM, DAB, DVB-T, GSM, UMTS and GPS signals. [...]
>
>To say this is a big deal is something of an understatement. For a few bucks, you’ll be able to get a device to spoof cellular networks and GPS signals. This was possible before, of course, but took SDR hardware that was generally outside the budget of the casual experimenter. If you bought a HackRF or an Ettus Research rig, you were probably responsible enough not to get into trouble with it, but that’s not necessarily the case anymore. As exciting as this technology is, we would be wise to approach it with caution. In an increasingly automated world, GPS spoofing can have some pretty bad results.

That's right: with a few dollars on an adapter and a lot of work in [GNU Radio](https://gnuradio.org/), you can make your Uber driver very confused.