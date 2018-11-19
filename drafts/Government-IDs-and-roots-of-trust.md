### Government identification and roots of trust

One of the fun aspects of moving countries is that you become intimately familiar with all of the differences in provision of government services. I've covered the Swedish BankID authentication system in a [previous post](https://markeldo.com/Web-Authentication-Bank-ID-and-the-death-of-the-password/):

>BankID is ubiquitous in Sweden, and for most of the services you’ll encounter as a resident, there is no username and password. You login to services using your personnummer, and you authenticate using Mobile BankID on your phone.
>
>It works remarkably well—so well that many online services in Sweden have never had to worry about usernames and passwords, or the usual issues associated with them: storing passwords securely, password resets, and protection against credential stuffing. BankID handles this for them, and if they only cater to Swedish residents, that’s all they need.
>
>And it can be used for much more than just logging in to websites. Because BankID uses a unique government-issued identifier (the personnummer), a service is able to identify users with enough confidence that they can use BankID for legally binding agreements. For example, you can obtain a loan from a Swedish bank using nothing but BankID.
>
>One of the major disadvantages is this same reliance on the Swedish personnummer: if you’re not eligible for a number, or you haven’t received one yet, you simply can’t use BankID, and by extension, any service which uses it. For a foreigner living in Sweden, this is exactly as frustrating as it sounds.

The 'root of trust' in the BankID system is the physical BankID card issued by your bank. The combination of the chip in this card and a PIN number allows you to prove—to a pretty good degree of certainty—that you are who you say you are online.

![A BankID card and reader](/images/bankid-card.jpg)
<em class="caption">A card reader and Swedish ID card.</em>

In modern usage, the primary job of this card is to set up [Mobile BankID](https://support.bankid.com/sv/bankid/mobilt-bankid) on a smartphone, which is significantly more convenient for most uses at the expense of being slightly less trustworthy than connecting the BankID card directly.

The benefit of all of this is that you can prove your identity to any Swedish government agency or business, no matter where in the world you currently happen to be, as long as you have your BankID card with you.

In Australia, of course, there's no such thing as BankID, and Australian banks and Government services often rely on SMS two-factor authentication for identity verification.

SMS has never been a particularly robust identification method, but one of the biggest problems is usability: users can become locked out of services if they leave the country and no longer have the ability to receive SMS' on their Australian phone number. Indeed, the Australian Government's official advice on the [myGov website](https://my.gov.au/mygov/content/html/securitycodes.html#travelling) is to disable SMS two-factor authentication when leaving the country - reducing security in order to ensure users don't lock themselves out. This is far from optimal.

The failed [Australia Card](https://en.wikipedia.org/wiki/Australia_Card) was as close as we ever got to a national ID system, but the federal government recently announced a multibillion-dollar project to create a national digital identity system known as [myGovID](https://markeldo.com/Email-update-Australian-Digital-Government-Report-and-myGovID/) (also covered in a [previous email](https://markeldo.com/Email-update-Australian-Digital-Government-Report-and-myGovID/)). 

It will be interesting to see what comes of the myGovID project, and whether it ends up looking like BankID and similar systems.