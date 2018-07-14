---
layout: email
title: Email security and PEXA
---

Good morning. 

It's been a few weeks since my last email, as I've been on holiday in Scotland (Skye), and I'll soon be heading to Norway until mid-August. For those of you in the northern hemisphere, I wish you a nice summer holiday!

### Email security

There has been a lot of news over the past few months regarding low-tech attacks against business email, whereby the attacker first gains access to someone's email inbox and then either persuades someone else to make a large transfer (the "CFO attack") or performs a man-in-the-middle attack on the email communication of bank details for large transactions.

A recent Risky Business [episode](https://overcast.fm/+IbKxbcsjs) interviewed Alex Tilly from Dell Secureworks regarding these attacks, and it's an excellent summary. 

There's also an article by Telstra [here](https://exchange.telstra.com.au/business-email-compromise-scams/), where they describe the problem in some detail and propose various solutions.

The attacks are technically very simple. In the case of real estate agents or conveyancers, they look something like this:

1. Break into a company email account (for example, if they're using Gmail or Office 365 without multi-factor authentication, [password spraying](https://cloudblogs.microsoft.com/enterprisemobility/2018/03/05/azure-ad-and-adfs-best-practices-defending-against-password-spray-attacks/) or [credential stuffing](https://owasp.org/index.php/Credential_stuffing) attacks are very effective)
2. Identify an upcoming real-estate settlement
3. Set up inbox rules to intercept the communication between the buyer and seller
4. Just before settlement, change the bank account or other transaction details, so that the buyer's money goes to your account instead
5. Enjoy your several hundred thousand dollar windfall

It's simple, effective, and the return-on-investment beats the hell out of other attack techniques like ransomware or cryptomining.

The moral of the story is simple: **don't rely on email to communicate bank details for large transactions**. Email is not a secure communications method. If you're about to transfer half a million dollars, at least pick up the phone and call the seller to confirm that the details in the email they sent you are correct.

More broadly, this underscores [the importance of choosing good passwords and using multi-factor authentication](https://markeldo.com/Email-update-Security-trade-offs/): if the companies targeted with these attacks were using multi-factor authentication (MFA) for their email accounts, the attackers likely wouldn't have bothered. MFA isn't foolproof, but it significantly raises the bar for remotely compromising accounts.

### PEXA and Australian real estate settlements

One of these attacks hit headline news in Australia recently, in large part because the victim was former _MasterChef_ contestant Dani Venn:

[**MasterChef finalist caught in conveyancing hacker attack**](https://smh.com.au/business/companies/masterchef-finalist-caught-in-conveyancing-hacker-attack-20180622-p4zn4o.html)

>MasterChef finalist Dani Venn woke to a housing nightmare on Monday when it was confirmed $250,000 from the settlement of her semi-rural property on the outskirts of Melbourne was stolen after her conveyancer’s account was hacked.
>
>Unbeknown to Ms Venn and her conveyancer, Sargeants Knox Conveyancing, the proceeds of the sale were transferred to a fraudster’s bank account after hackers accessed the conveyancer’s electronic property transfer account and added themselves as another user.

This example was slightly more sophisticated than a simple email man-in-the-middle: in this case, the attackers actually accessed the conveyancer’s account on Property Exchange Australia (PEXA). They did so by first gaining access to the conveyancer’s email (likely through a guessed password), and then used their email access to create a new PEXA account where they could modify the settlement details.

At first glance this sounds like a security failure on PEXA’s end. There are a lot of online systems which have the same flaw (first compromise a user’s email, then reset their password), but a system designed for settlement of multi-million dollar transactions should be held to a higher standard than a Facebook account.

At the very least, PEXA's security model shouldn't be relying on conveyancers and real estate agents—who in many cases are individuals or small businesses with limited security knowledge and resources—to properly secure their email.

Making things more complicated, it's not at all clear who has legal responsibility for this sort of this incident. Immediately after the story broke, PEXA denied any responsibility for the loss, and the banks involved could quite rightly claim that they were simply acting on the instructions from their client. 

A lot of the [coverage since the incident](https://www.smh.com.au/business/companies/masterchef-finalist-conveyancer-hack-prompts-pexa-backlash-20180626-p4znv3.html) has tended to focus on PEXA in the context of electronic settlement generally, and using the attack as an example of why doing such settlements online is inherently insecure. This is a bit wrong-headed: the root of the problem is insecure email inboxes, and a lack of secondary verification before making large bank transfers.

Once again, Patrick Gray from Risky Business had an excellent overview of the issue in his latest [podcast episode](https://overcast.fm/+IbKwVXl9k/10:52), and it's well worth a listen.
