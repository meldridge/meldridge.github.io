---
layout: email
title: 'Maersk and NotPetya, incentives, and "Gentweemia"'
---

Good morning.

My last email had problems rendering correctly on certain clients, notably Outlook 2016. I apologise for the inconvenience, I'm still bedding down the template for these emails. The full post can be found [here](https://markeldo.com/Security-is-always-a-trade-off/).

### Maersk and NotPeta

Wired has published [an excellent long-form piece](https://www.wired.com/story/notpetya-cyberattack-ukraine-russia-code-crashed-the-world/) on last year's NotPetya attack by Russia and how it wiped out the IT infrastructure of Maersk.

As Ned Pyle [pointed out](https://twitter.com/NerdPyle/status/1032740918917386240), one excerpt in particular _"should be required reading for every C-suite and IT director on this planet"_:

>Snabe, however, didn’t say much about the company’s security posture pre-NotPetya. Maersk security staffers tell WIRED that some of the corporation’s servers were, up until the attack, still running Windows 2000—an operating system so old Microsoft no longer supported it. In 2016, one group of IT executives had pushed for a preemptive security redesign of Maersk’s entire global network. They called attention to Maersk’s less-than-perfect software patching, outdated operating systems, and above all insufficient network segmentation. That last vulnerability in particular, they warned, could allow malware with access to one part of the network to spread wildly beyond its initial foothold, exactly as NotPetya would the next year.
>
>The security revamp was green-lit and budgeted. But its success was never made a so-called key performance indicator for Maersk’s most senior IT overseers, so implementing it wouldn’t contribute to their bonuses. They never carried the security makeover forward.

Improving security wasn't incentivised by management, and so it didn't happen. Quelle surprise.

This is the constant thorn in the side of any corporate security team: in most organisations, all of the incentives you need to improve security are monetary, and your department is a cost centre. Even if you are lucky enough to have a management team and board full of techies who care about security, it's hard to set a KPI which amounts to proving a negative.

Some companies go as far as to make their bonuses contingent on avoiding breaches, which sounds like a great idea in theory - except that you've now incentivised your security team not to report breaches when they occur.

Remember, [culture eats strategy for breakfast](https://twitter.com/mckinsey/status/957757321681174529), and your culture is a product of your incentives.

It's also worth noting that the above excerpt could be describing any number of corporate or government IT environments. The only reason their names don't appear in this article is because they were lucky enough not to get hit.

As a reminder, the incident resulted in losses on a truly **insane** scale:

>All told, Snabe estimated in his Davos comments, NotPetya cost Maersk between $250 million and $300 million. Most of the staffers WIRED spoke with privately suspected the company’s accountants had low-balled the figure. [...]
>
>The wider cost of Maersk’s disruption to the global supply chain as a whole—which depends on just-in-time delivery of products and manufacturing components—is far harder to measure. And, of course, Maersk was only one victim. Merck, whose ability to manufacture some drugs was temporarily shut down by NotPetya, told shareholders it lost a staggering $870 million due to the malware. FedEx, whose European subsidiary TNT Express was crippled in the attack and required months to recover some data, took a $400 million blow. French construction giant Saint-Gobain lost around the same amount. Reckitt Benckiser, the British manufacturer of Durex condoms, lost $129 million, and Mondelēz, the owner of chocolate-maker Cadbury, took a $188 million hit. Untold numbers of victims without public shareholders counted their losses in secret.

That's getting close to 2 trillion USD worth of damages. On a dollar basis, that makes NotPetya by far the most damaging cyber attack in history.

And it was all easily avoidable.

### Modern development practices and "Gentweemia"

On a more cheerful note, a podcast recommendation: [this episode](https://overcast.fm/+Loq9FyGy8) of _Application Security Weekly_ is well worth the time. The discussion includes the teaching of secure programming, modern development practices, and the risk of supply-chain attacks, including the [very topical example](https://markeldo.com/Email-update-The-Mueller-Indictments-NPM-Arch-Gentoo-and-Ticketmaster-UK/) of the NPM JavaScript package manager. 

[This bit in particular](https://overcast.fm/+Loq9FyGy8/22:18) (direct link to 22:18) had me in stiches. Dr Doug White has coined the term "Gentweemia" to describe the form of mania which occurs when you're desperately trying to get some piece of technology to work, whatever the cost:

>At first you take notes. You're writing them down, you're going "I added build 10579 of this driver", and you're really nice and engineering about it. 
>
>By 12 hours later, when you've had 96 cups of coffee, and now you're pouring whiskey in the coffee, and vodka into red bull or whatever works for you, you're like... all the notes are on the floor, under the empty pizza boxes, and you're going "WORK! WORK! WORK! WORK! DAMN YOU! WORK! WORK!" and all of a sudden it works and you go "DONE! I'M OUT!", and I have no idea what I just did, or what I pulled in there, or what builds are in there, or what I added, or took away... and that, I call Gentweemia.

Yep.

If you've never experienced this particular type of insanity, I have reassuring news: [that's how most of the tech you rely on was built](https://medium.com/message/everything-is-broken-81e5f33a24e1). You're welcome.