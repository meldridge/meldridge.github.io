---
layout: email
title: LokiBot Android trojan
---

A short email today, taken on request. This one is cute: 

[**LokiBot Android Banking Trojan Turns Into Ransomware When You Try to Remove It**](https://www.bleepingcomputer.com/news/security/lokibot-android-banking-trojan-turns-into-ransomware-when-you-try-to-remove-it/)

>The malware works on Android 4.0 and higher and requires administrator privileges, which it asks during installation.
>
>If users detect something fishy about the malware and they move to remove its administrator privileges, LokiBot will trigger its ransomware behavior.

It's a run-of-the-mill banking trojan, designed to steal credentials and two-factor SMS messages for your bank, so the criminals can clean out your account. 

The novel bit is that if you get suspicious about the app after installation and try to remove its privileges, it retaliates by turning into ransomware and trying to encrypt your phone.

Fortunately, it turns out that they implemented this part extremely poorly: for each file, it encrypts a copy and then deletes the original, but then immediately decrypts the encrypted version and writes it back over the top. The result is that it doesn't end up encrypting anything - it just renames all of your files. Whoops.

As always, be careful what you download on Android phones, and avoid using sideloading or using third-party app stores unless you really know what you're doing.