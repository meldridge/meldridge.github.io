---
layout: email
title: TEMPEST attacks on a budget
---

There have been a few interesting bits of security news over the past few days, but today's article ticks all of the boxes.

[TEMPEST](https://en.wikipedia.org/wiki/Tempest_(codename)) attacks have been around for a very long time, but historically required the resources of a state intelligence agency to pull off with any degree of effectiveness.

TEMPEST is a general term covering a whole spectrum (sorry) of techniques for retrieving unintentionally leaked signals. By way of example: it's possible to remotely recover the image on a computer monitor by sniffing the radio frequency (RF) radiation emitted by the physical cable carrying the signal from the computer's video card to the monitor. All electrical circuits, unless properly shielded, emit some form of RF radiation.

It sounds ridiculous, but it's absolutely a thing - there's an [entire set of standards](https://en.wikipedia.org/wiki/Tempest_(codename)#Shielding_standards) designed to prevent these attacks, including requiring a certain amount of [separation between power cables](https://www.stigviewer.com/stig/traditional_security/2013-07-11/finding/V-30982) if they're carrying data of differing classifications.

These days, with the increasing availability of software defined radio (SDR) tools, these attacks are now possible to perform at home:

### TempestSDR

[**TempestSDR: An SDR tool for Eavesdropping on Computer Screens via Unintentionally Radiated RF**](https://www.rtl-sdr.com/tempestsdr-a-sdr-tool-for-eavesdropping-on-computer-screens-via-unintentionally-radiated-rf/)

>If you didn't already know by definition "TEMPEST" refers to techniques used by some spy agencies to eavesdrop on electronic equipment via their unintentional radio emissions (as well as via sounds and vibrations). All electronics emit some sort of unintentional RF signals, and by capturing and processing those signals some data can be recovered. For example the unintentional signals from a computer screen could be captured, and converted back into a live image of what the screen is displaying.
>
>TempestSDR is an open source tool that allows you to use any SDR that has a supporting ExtIO (such as RTL-SDR, Airspy, SDRplay, HackRF) to receive the unintentional signal radiation from a screen, and turn that signal back into a live image. This can let you view what is on a screen without any physical connections. If a high gain directional antenna is used then it may be possible to receive images from several meters away as well.

It's kind of hard to picture what this means in practice, so this tweet should make it a lot easier:

![TEMPEST SDR](/images/tempest-sdr.png)

To explain: in that photo Jessop has a computer hooked up to a monitor on the left. On the right, he is using an antenna and the [TempestSDR library](https://github.com/martinmarinov/TempestSDR) to sniff the RF radiation produced by the DVI cable, and then recreating the image from that signal.

You can see from the result that it's far from perfect, and there's a lot of noise in the captured image. This is an unavoidable difficulty when capturing analogue signals you weren't supposed to be receiving. Even so, this isn't bad for cheap RF equipment and free software.

It's worth noting that the TempestSDR library has been around for several years, and the only reason it's in the news today is because the library is now easier to get working on Windows. That's not particularly exciting, but I'll take any excuse to write articles about SDR and security!