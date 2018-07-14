---
layout: email
title: Yahoo and very large numbers, Android apps and Dirty COW
---

Good morning!

Today's story broke a couple of days ago, and didn't make that many waves - probably because everyone is just numb to news of large data breaches at this point. It turns out that when Yahoo was [hacked in 2013](https://en.wikipedia.org/wiki/Yahoo!_data_breaches), it was actually all of their accounts which were compromised, not the mere 1 billion they'd previously stated.

As a few people have noted with numbers that large it's almost irrelevant, and we already knew that Yahoo was worked over pretty well by whoever hacked them (signs point to a state intelligence service).

This news isn't the best bit though - the best bit is the images from the [Reuters article covering the story](https://www.reuters.com/article/us-yahoo-cyber/yahoo-says-all-three-billion-accounts-hacked-in-2013-data-theft-idUSKCN1C82O1).

It looks like someone forgot to get rid of the stock photo descriptions before they posted the article. Luckily for us, because they're hilarious:

>"A photo illustration shows a Yahoo logo on a smartphone in front of a displayed cyber code and keyboard on December 15, 2016."

I don't know what "cyber code" is, but it apparently has to be green.

>"A photo illustration shows a man in front of a Yahoo logo seen through a magnifying glass in front of a displayed cyber code on December 16, 2016."

Or maybe not - this cyber code is white. With purple bits.


### Android apps and Dirty COW

An interesting article from Ars Technica on an ongoing threat to Android handsets: apparently there are over 1,200 apps available in third-party Android app marketplaces which include the Dirty COW Linux privilege escalation exploit. (Note that "third party marketplaces" means the apps are **not** in the Google Play store.)

[**In a first, Android apps abuse serious “Dirty Cow” bug to backdoor phones**](https://arstechnica.com/information-technology/2017/09/in-a-first-android-apps-abuse-serious-dirty-cow-bug-to-backdoor-phones/)

The way app sandboxing works on Android is that each app effectively runs as its own Linux user, and doesn't have the ability to do anything outside of it's own sandbox (hence the name) without the express permission of the operating system.

Unfortunately for this security model, Dirty COW is a very reliable privilege escalation exploit which allows you to obtain root privileges on any Linux system with a kernel which hasn't been patched for the vulnerability... which is a lot of Android handsets.

>While Google released a patch for Dirty Cow last December, it's not clear what percentage of devices are eligible to receive it. Researcher David Manouchehri said it's likely any phone running Android version 5.1.1 or earlier is susceptible, and even phones running later versions may be, too. Based on figures supplied by Google, that would leave at least half of devices vulnerable. Google officials weren't able to provide an estimate of how many devices are patched.
>
>Google-branded phones—including the Nexus 5X, Nexus 6, Nexus 6P, Nexus 9, Android One, Pixel C, Nexus Player, Pixel, and Pixel XL—should all be immune to attacks, assuming users are installing over-the-air updates on a regular basis. Concerned readers using other devices should check with the manufacturer or carrier to find out if their devices have been patched.

Not receiving patches from the manufacturer has always been the achilles heel of Android security. Updating the kernel is one of the harder things to update on a phone, so many manufacturers just don't bother once they've shipped a device. 

It's the same problem faced by the Internet of Things: when you're selling something for cheap, it's hard to justify the cost of providing updates - unless consumers start demanding them. It's a negative externality we haven't yet figured out how to deal with.