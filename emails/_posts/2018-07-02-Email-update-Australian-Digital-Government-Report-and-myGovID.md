---
layout: email
title: Australian Digital Government Report and 'myGovID'
---

Good morning.

A second update in two days, partly to make up for missing previous weeks, and partly because there has been a lot of important news lately.

Before we get into it, I wanted to call out a [fantastic Twitter thread](https://twitter.com/jepayneMSFT/status/1012815189345857536) on Windows logon types by Jessica Payne, from Microsoft's Windows Defender Security Research team. The various types of Windows logon are not well understood by a lot of IT professionals, but they're absolutely essential to understanding the risk of credential theft in an organisation.

Payne has also performed some excellent presentations in the past (examples [here](https://channel9.msdn.com/Events/Ignite/Australia-2015/WIN433) and [here](https://channel9.msdn.com/Events/Ignite/New-Zealand-2016/M377)) which are well worth watching if you have time.

### The Digital Delivery of Government Services Report

The Australian Senate Finance and Public Administration References Committee recently released its [report](https://aph.gov.au/Parliamentary_Business/Committees/Senate/Finance_and_Public_Administration/digitaldelivery/Report) into the "Digital delivery of government services" by the Australian Government.

After the release, [Justin Warren](https://twitter.com/jpwarren) wrote an absolutely hilarious Twitter thread summarising the main points of the report and injecting his own commentary. It's a great read. The original post is [here](https://twitter.com/jpwarren/status/1011900214725054464), and the properly unrolled thread can be found [here](https://threadreaderapp.com/thread/1011900214725054464.html).

Warren does slightly overdo the snark, but given the sordid history of major Australian Government IT projects, you can hardly blame him for being a bit jaded.

One highlight from the thread:

>There's a recommendation to set up a specific IT career path inside APS, which I think is a fabulous idea. Like the engineering path inside big tech companies for those who want to move up without having to manage people. #tljr

Yep. As I've mentioned in a [previous email](https://markeldo.com/Email-update-Tweetstorms-Technical-vs-management-and-blockchain-authentication/), this is one of the main issues the APS faces when trying to hire the technical competence needed to deliver projects:

>The root of the problem is that technical specialisations and management are two entirely orthogonal skillsets, and promoting from one to the other only makes sense for the small proportion of workers who happen to be excellent at both. However, in a traditional organisational hierarchy, technical jobs are at the bottom, and moving into management is the only way to get a pay rise.

This isn't a problem which can be solved via outsourcing, either - at some point, someone employed by the Government is going to have to make technical decisions, even if those decisions are just about which product to procure or which contractor to employ.

As Warren succinctly puts it (quoting the report):

>"At a minimum, a level of ICT expertise is required to be able to understand a project's digital needs" 
>
>Yep. Otherwise you could get sold a lemon.

Government in Australia has has a [long history](https://docs.google.com/spreadsheets/d/14z6rl8zHTTEPktjAfnu5QXlhYDmfdroBe2FnkYVWMeA/htmlview) of mismanaged IT projects, and this is just one of the many reasons why.



### The Australian 'myGovID'

Speaking of large Australian Government IT projects:

[**Digital Minister Michael Keenan flags plan for multibillion-dollar ID plan**](https://thewest.com.au/politics/federal-politics/digital-minister-michael-keenan-flags-plan-for-multibillion-dollar-id-plan-ng-b88862627z)

>Face-to-face meetings with government departments will be a thing of the past within six years, according to Digital Minister Michael Keenan, who will today flag a multibillion-dollar campaign to give every Australian a “single digital identity” by 2025.
>
>Almost every interaction with local, State, and Federal governments, including registering a dog with the local council, to recording the birth of a child or a marriage would be digitised under the ambitious scheme.
>
>Speaking at a event in Can-berra today, Mr Keenan will flag the establishment of a “single digital identity” for all Australians, called myGovID and announce he wants Australia to be a world-leader in digital government within the decade.

So far there hasn't been much detail about the 'myGovID' system, but it sounds like the Government intends to use Australian [Tax File Numbers](https://ato.gov.au/Individuals/Tax-file-number/) as the identification basis for a system similar to digital government ID's issued elsewhere in the world (most notably [Estonia](https://e-estonia.com/solutions/e-identity/id-card/)).

Sweden also has a similar system (Bank-ID), which we've [covered previously](https://markeldo.com/Web-Authentication-Bank-ID-and-the-death-of-the-password/). Similarly to the myGovID proposal, the Swedish system also uses a unique per-resident identifier issued by the tax authority (Skatteverket).

This is likely to be one of the biggest Australian Government IT projects ever undertaken, so expect to hear a lot more about it in the coming years.

### Utopia: #GovPort

I'd usually leave it there, but this story can't pass without a mention of [Utopia](http://abc.net.au/tv/programs/utopia/), the excellent ABC Australia comedy made by Working Dog Productions.

In Season 3, they produced an episode regarding a delayed Government IT project called 'GovPort': an online portal for all Australian Government services. It has its own [Twitter hashtag](https://twitter.com/hashtag/govport?lang=en), and there was no end of parallels drawn to myGovID after Keenan's announcement.

Unfortunately, the Utopia 'GovPort' clip isn't easily available online, but to give the non-Australians a taster of what the show is like, here's a clip from Season 1: [Utopia: Episode 1 Logo Decision](https://www.youtube.com/watch?v=UfTBdqF5Vgw)