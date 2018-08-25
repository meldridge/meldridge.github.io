---
layout: email
title: Lateral movement using DCOM and Excel macros
---

Today’s CATFACT is an excellent technical write-up by Matt Nelson (@enigma0x3) from SpecterOps. He discusses using DCOM applications, specifically Excel.Application, for lateral movement/code execution on systems where you already have Local Administrator credentials.

[**Lateral Movement using Excel.Application and DCOM**](https://posts.specterops.io/lateral-movement-using-excel-application-and-dcom-enigma0x3-on-wordpress-com-d11d56e504dc)

In short, the technique involves creating an Excel document with a VBA macro, uploading it to the target, and then triggering it to execute. It doesn’t sound particularly impressive, but this particular method will bypass the Office Macro security settings (including the “disallow all macros” group policy). Existing methods for lateral movement use tools like psexec or WMI, so using DCOM is kind of novel and less likely to be detected by good blue teams. It’s worth reading this and this, which cover other DCOM techniques.

As an aside, it’s well worth bookmarking both the SpecterOps website and subscribing to the Medium posts by all of their team members. They’ve pretty much hoovered up the best red team security people in the U.S., including guys like Matt Nelson and Will Schroeder (who developed Empire/Empyre), and made a security Avengers.