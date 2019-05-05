---
title: 
---

Good evening.

### Last call for SATCOM security

This story is a bit old, but still very relevant. At Black Hat [last August](https://www.blackhat.com/us-18/briefings/schedule/#last-call-for-satcom-security-11192), Ruben Santamarta presented on the security of satellite communications (SATCOM) systems, and various realistic attacks including hacking into the modems of in-flight aircraft. 

>Some of the largest airlines in the US and Europe had their entire fleets accessible from the Internet, exposing hundreds of in-flight aircraft. Sensitive NATO military bases in conflict zones were discovered through vulnerable SATCOM infrastructure. Vessels around the world are at risk as attackers can use their own SATCOM antennas to expose the crew to RF radiation.

The actual vulnerabilities aren't particularly interesting - most of them are simply a result of incompetence: hardware left publicly accessible over the internet with hardcoded credentials. This is a common story for [Internet of Things devices](https://arstechnica.com/information-technology/2017/06/internet-cameras-expose-private-video-feeds-and-remote-controls/), but you would expect an airline SATCOM system to be better protected than an eBay IP camera.

One of the potential attacks described by Santamarta involves using the SATCOM antenna itself as a directed-energy weapon: pointing the antenna at passengers on aircraft or ocean vessels and upping the transmit power to unsafe levels. 

It's ridiculous and very Hollywood, but it's absolutely feasible. SATCOM antennas are designed in such a way that they won't transmit unless they have _receive lock_: that is, they won't radiate unless they're pointing at the correct satellite. The catch is that this safety feature relies upon information provided by the satellite modem—the same modem which has Telnet open to the internet with hardcoded credentials.

Another attack is less Hollywood but has far more practical implications. SATCOM antennas generally require a GPS signal in order to know where to point - otherwise they'd have to scan the entire sky looking for their satellite. Depending on the system, this location information is accessible through the modem—and if you own the modem, you can pinpoint the antenna. If your position is sensitive (for example: if you're a military unit) this is less than ideal.

The full talk is available on YouTube [here](https://www.youtube.com/watch?v=8M8MurmuEtQ), and the white paper is [here](http://i.blackhat.com/us-18/Thu-August-9/us-18-Santamarta-Last-Call-For-Satcom-Security-wp.pdf).



 Downloaded a publicly accessible version of the modem firmware, which contained hardcoded credentials
Can log into modems over the satellite link
Can overwrite the firmware once you have this access
Usually there are safety interlocks which prevent the satcom antenna from transmitting (radiating) unless it has a ‘receive lock’ on the satellite. In other words: if it’s pointing at somone’s head, it shouldn’t transmit.
If you turn this off…
Transmit power is usually controlled by the anchor station, so you can change this too
Pointing error (used by the ACU to control point) is based on EsNo sent from the modem data unit (which we now own)
He was also able to find military satcom terminals exposed to the internet, and could access the GPS data from those terminals. Satcom terminals need to know their own position to a reasonable degree of accuracy in order to find the satellite in the sky.


### Boeing 373 MAX

How the Boeing 737 Max Disaster Looks to a Software Developer https://spectrum.ieee.org/aerospace/aviation/how-the-boeing-737-max-disaster-looks-to-a-software-developer



### Security and boards asking questions

Good cyber security starts with boards that ask questions | afr.com

>There is no doubt boards of listed companies have a lot of information to assimilate and with the right mix of skills on the board and excellent external advisors, they are able to shape and guide on complex risks and strategy. Not every board member needs to be a lawyer to understand legal risk or an accountant to understand the annual audited accounts. But they do need to know enough to be able to understand when something isn't quite right. 

https://www.afr.com/opinion/columnists/good-cyber-security-starts-with-boards-that-ask-questions-20181125-h18bku

### WiPro breach

Experts: Breach at IT Outsourcing Giant Wipro — Krebs on Security
https://krebsonsecurity.com/2019/04/experts-breach-at-it-outsourcing-giant-wipro/

This is epic : 
1. Brian Krebs @briankrebs breaks a huge story on the WiPro breach. He tried to get comment from WiPro for several days. 
2. WIPro claims on their earnings call that Brian’s reporting is inaccurate 
3. Brian dials in LIVE and asks what he got wrong
4. Hilarity
https://twitter.com/RayRedacted/status/1118270712886824960?s=19

### Security Keys and Phishing

Okay, here’s the deal with Security Keys and #phishing, because even some experts don’t really get it. HT @boblord and @runasand for the idea 1/
https://twitter.com/mrisher/status/1111651130570792962