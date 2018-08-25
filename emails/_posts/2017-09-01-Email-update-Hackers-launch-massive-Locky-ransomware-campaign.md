---
layout: email
title: Hackers launch massive Locky ransomware campaign
---

Via [ITnews](https://www.itnews.com.au/news/hackers-launch-massive-locky-ransomware-campaign-472295): 
 
>The email messages are non-descript with subject lines such as "please print", "documents" and "scans", AppRiver said. Clicking on the ZIP compressed attachment launches a Visual Basic Script file that downloads Locky and executes the ransomware.
>
>Locky encrypts files on victims' computers, appending the .lukitus suffix to them. Users are instructed to pay a ransom of 0.5 Bitcoin (A$2975) to decrypt the files.

Ransomware in Javascript (`.js`) or Visual Basic (`.vbs`) files is quite popular because these lesser-known extensions don’t immediately flag users as “executables”, and the icons conveniently have a similar appearance to a text document. On most default Windows installations, both extensions are opened with the Windows Script Host (WSH) interpreter, which runs with the same permissions as the user. The effect is just the same as running an .exe file.

Often, these attachments will have a filename like `Invoice.pdf.js`, which is a clever way of masking the Javascript extension. By default, Windows will chop off the extensions for “Known file types”, which means the .js gets removed, and you’re left with `Invoice.pdf`.

The best mitigation for this type of ransomware campaign is to either [disable Windows Script Host entirely](https://technet.microsoft.com/en-us/library/ee198684.aspx) or to simply change the default program used to open .js and .vbs files. This can be done by going `Start -> Default Programs -> Associate a file type or protocol with a program`, and then changing the associations for `.js` and `.vbs` from “Microsoft Windows Based Script Host” to “Notepad”. It’s worth making this change for everything that opens with WSH, as you’ll almost never need that functionality (and if you do, you can Open With).

Have a good weekend everyone, and check your backups!