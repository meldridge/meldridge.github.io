---
layout: email
title: "Satellite Turla: APT Command and Control in the Sky"
---

It’s a Sunday, but this one was so cool I wanted to share it immediately before I forgot about it. 

[Command and Control via satellite DVB2 broadcast!](https://securelist.com/satellite-turla-apt-command-and-control-in-the-sky/72081)

>Although relatively rare, since 2007 several elite APT groups have been using — and abusing — satellite links to manage their operations — most often, their C&C infrastructure. Turla is one of them. Using this approach offers some advantages, such as making it hard to identify the operators behind the attack, but it also poses some risks to the attackers.
>
>On the one hand, it’s valuable because the true location and hardware of the C&C server cannot be easily determined or physically seized. Satellite-based Internet receivers can be located anywhere within the area covered by a satellite, and this is generally quite large. The method used by the Turla group to hijack the downstream links is highly anonymous and does not require a valid satellite Internet subscription.
>
>On the other hand, the disadvantage comes from the fact that satellite-based Internet is slow and can be unstable.

This technique takes advantage of the fact that many satellite internet solutions (like ViaSat or Hughes) use asymmetric links: usually your downlink is a wideband broadcast over DVB2, and your uplink is a comparatively smaller TDMA transmission. All users in a given satellite footprint ('beam') receive the same downlink signal, and just discard any packets not meant for them.

Importantly, in this design the downlink is usually unencrypted, both for cost and practicality reasons. This means that if you're in the downlink beam with a receiver, you can see everything sent to other users. You don’t need to be a legitimate subscriber - all you need is a cheap DVB2 receiver tuned to the right frequency.

The article doesn't do an amazing job of explaining it, so I'll have a go at summarising:

1. The attackers first determine which IPv4 ranges correspond to satellite internet customers - i.e. a set of IP addresses where, if you send a packet to that address, it'll get sent out from the satellite provider’s teleport over the DVB2 downlink.
2. Payloads are encoded to call out to a customer IP address in this range, using an uncommon port unlikely to actually be open on the customer's router (the attackers can test for this ahead of time).
3. The attacker positions a DVB2 receiver terminal in the downlink beam, so that they can receive the same packets sent to the selected customer IP address.
4. When the payload executes, it sends a SYN to this IP address and port, which is received by the attacker.
5. The attacker spoofs a reply SYN ACK to the payload, verifying reception and establishing the command & control (C2) link.

As the article points out:

>The technical method used to implement these Internet circuits relies on hijacking downstream bandwidth from various ISPs and packet-spoofing. This is a method that is technically easy to implement, and provides a much higher degree of anonymity than possibly any other conventional method such as renting a VPS or hacking a legitimate server.

This is a fantastic way to anonymise your C2 traffic, because your implant/payload is calling out to an IP address owned by a legitimate satellite internet subscriber, and you're just intercepting it. At no point do you need to encode the IP address for any attacker-controller infrastructure in your payload, so there's nothing to trace. The best an incident response team would be able to do is pinpoint which satellite downlink beam you used, and this is basically useless. 

Very neat.