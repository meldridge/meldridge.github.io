

### Malware automation

https://www.zdnet.com/article/new-xbash-malware-combines-ransomware-coinminer-botnet-and-worm-features-in-deadly-combo/

https://usa.kaspersky.com/resource-center/threats/computer-viruses-vs-worms


### Innovative phishing style

https://stuffwithaurum.blog/2018/09/30/an-innovative-phishing-style/



https://www.contextis.com/blog/frag-grenade-a-remote-code-execution-vulnerability-in-the-steam-client

https://whisperlab.org/blog/2017/Trust-Implications-of-DDoS-Protection-in-Online-Elections.html

http://cd.textfiles.com/cuteskunk/Unix-Hacking-Documents/improve_by_breakin.txt



## wald0 on enterprise infosec
https://twitter.com/_wald0/status/1015939331012247552

>Imagine preparing a house for a home invasion, but you don’t know how the rooms are connected. And there’s 10,000 rooms with secret passages you don’t know about. And every time anyone enters a room, they leave a copy of their key behind. And no one is 100% sure just how many doors a given key will unlock. This is the state of enterprise information security.

<a href="https://mobile.twitter.com/thegrugq/status/1141945136122740736"><img src="/images/grugq-knife-door-handle.png" alt="Tweet by The Grugq" class="tweet"/></a>

## Telegram Unicode RTL

https://securelist.com/zero-day-vulnerability-in-telegram/83800/

Originally was going to write about this way back in October 2017:

Right-to-Left Override: Detecting Attacks With EDR Data
https://www.redcanary.com/blog/right-to-left-override/
>“Crafty attackers have been using Unicode characters to trick users into opening malicious files for years. These attacks most often try to trick the user into opening a file that they wouldn’t otherwise. The trick is to make the file look like a PDF or Office document when in reality it is a piece of malware.
>
>Let’s say we have a piece of malware we want Bobby to open, and it is named with the “scr” extension, a Windows Portable Executable (“PE”) associated with Windows screensaver files.
>
>As the attacker, we can name our file: "charity_fundraiser_bb\u202Excod.scr"
>
>Because of the Right-to-Left character, Bobby’s email client and operating system are going to display that as:
>
>Now Bobby is much more likely to open that file because it looks like a nice, safe, DOCX file.”

## Olympic Destroyer

http://blog.talosintelligence.com/2018/02/olympic-destroyer.html


## Accounting controls:

>Accounting controls" has to be way, way up there on the list of "systemically important technologies that almost no one would say One Of The Most Important Things Ever Invented.

And

>Double-entry bookkeeping (and other accounting controls) are widely regarded as one of the most important things ever invented, as they allowed larger-than-tiny-family-companies.

Patrick McKenzie on Twitter
https://twitter.com/patio11/status/957469600681140226

*hdsh*



## Exploit development rant by Bas Alberts

The old speak: Wassenaar, Google,	and why Spender is right
https://lists.immunityinc.com/pipermail/dailydave/2015-August/000976.html

This is an excellent read for anyone who is interested in the security industry. It takes a bit to get going, but it's worth it.

The tl;dr is that this is an exploit developer pointing out that we tend to fixate on the latest big new vulnerability, when effective security is designed around the assumption that stuff will, inevitably, be exploited.

In other words, if your security model collapses the moment a new 0day exploit is released, you have a shitty security model.

Bas Alberts:

"So if you truly, deeply, honestly care about security. Step away from
exploit development. All you're doing is ducking punches that you knew
were coming. It is moot. It is not going to stop anyone from getting
into anything, it's just closing off a singular route. [...]

"But if you care about systemic security. The kind where you don't give
two flying fucks if Bob's desktop gets clientsided or Jane's Android
doesn't know how big an mpeg4 frame oughta be, then you will stop circle
jerking over individual vulnerabilities and listen to what Spender has
been saying for years.

"Which is: you don't chase and fix vulnerabilities, you design a system
around fundamentally stopping routes of impact. For spender it is
eradicating entire bug classes in his grsecurity project. For network
engineers it is understanding each and every exfiltration path on your
network and segmenting accordingly.

"Containment is the name of the game. Not prevention. The compromise is
inevitable and the routes are legion. It is going to happen."


## Admin permissions on Windows systems

[![](/images/swift-administrator.PNG)](https://twitter.com/SwiftOnSecurity/status/1031592610622832640)


### Security Keys and Phishing

Okay, here’s the deal with Security Keys and #phishing, because even some experts don’t really get it. HT @boblord and @runasand for the idea 1/
https://twitter.com/mrisher/status/1111651130570792962