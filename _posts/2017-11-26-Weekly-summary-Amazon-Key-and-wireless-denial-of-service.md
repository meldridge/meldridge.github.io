---
layout: email
title: Amazon Key and wireless denial-of-service
---

Today's article is about Amazon Key:

[**Amazon Key flaw makes entering your home undetected a possibility**](https://arstechnica.com/gadgets/2017/11/amazon-key-flaw-makes-entering-your-home-undetected-a-possibility/)

>Security research firm Rhino Security Labs found a vulnerability in the Amazon Key in-home delivery service's security procedures that could allow either the courier or even a savvy and malicious bystander to enter your home undetected after the delivery is completed. Amazon has promised to change how Key works in order to make it easier for you to tell when something unusual is happening in this event, but the changes proposed by Amazon don't necessarily resolve the vulnerability.

For those of you who aren't familiar with it, Amazon Key is a service where you can install a camera and electronic lock on your front door, allowing delivery drivers to deliver parcels inside your house. 

The point of the camera is to provide a disincentive for delivery people to abuse the feature, and also to provide proof of wrongdoing for the resident. It's a simple streaming IP camera which streams footage to Amazon, and can then be viewed by the homeowner through an app or the Amazon website.

The vulnerability described in the article occurs because of how the camera reacts to a Wireless denial-of-service attack: instead of going blank (therefore indicating that something has gone wrong), it continues showing the last frame that it had recorded before being knocked offline. This is the classic trope from Hollywood heist movies - film the last X seconds of footage, and replay it so the security guard is none the wiser!

The interesting part in this story isn't the vulnerability itself, but in the fact that it's a real-world example of the problems caused when we rely on commercial wireless technology for security features. You may recall my email from a couple of weeks ago regarding radio frequency (RF) attacks against commercial airliners, which covered the same ground.

In this particular case, Amazon has tried to fix the issue by stopping the camera from just displaying the last frame when it loses its connection. However, this still doesn't prevent delivery drivers from breaking into a house and stealing things - the camera still won't have any footage of the theft.

This is a problem shared by all streaming security cameras which don't also perform local caching of their recorded footage: if the connection they're using gets interrupted, that footage is lost.

Note that it's important not to get carried away with this class of vulnerabilities - there are far cheaper and easier methods to perform denial-of-service on a video camera, such as spray paint, or a paintball gun! Wireless denial-of-service is just one more option at your disposal.