---
layout: email
title: Another day, another leaky S3 bucket
---

Apparently, 50,000 Australians had their personal details stored on an Amazon S3 bucket without the correct permissions:

[**Credit card details, salary information published by government contractor**](http://www.abc.net.au/news/2017-11-02/major-government-data-breach-prompts-investigation/9112246?pfmredir=sm&sf136140759=1)

>The personal details of up to 50,000 Australians — including some credit card numbers and salaries — have been mistakenly posted online by a contractor, in one of the biggest data breaches to date.
>
>The information, including full names, emails, expenses and payment details, was publicly available online until early October.
>
>The breach, first reported by ItNews, was discovered by a Polish security researcher who searched for data that should have been protected online.
>
>Close to 25,000 credit card transactions of staff at insurer AMP were disclosed by the contractor, which has not yet been named.
>
>The Finance Department, the Australian Electoral Commission and the National Disability Insurance Agency have also been compromised.

Calling it "one of the biggest data breaches to date" is slightly overselling it in the context of Equifax's 130 million records, but they probably mean "In Australia". 

This is just the latest in a [very](https://www.theregister.co.uk/2017/08/22/open_aws_s3_bucket_leaked_hotel_booking_service_data_says_kromtech/) [long](https://www.theregister.co.uk/2017/09/04/us_security_clearance_aws_breach/) [string](https://www.theregister.co.uk/2017/09/19/viacom_exposure_in_aws3_bucket_blunder/) [of S3 storage buckets](https://www.theregister.co.uk/2017/09/22/verizon_falls_for_the_old_unguarded_aws_s3_bucket_trick_exposes_internal_system/) left open for anyone to access. At this point they're practically a weekly occurrence.

To be clear, there's no excusing this sort of poor security practice by the owners of the data, but I do have some sympathy: Amazon's AWS interface is famously unintuitive, and their S3 access permissions are even more so. Getting this wrong is easier than it should be, and usability is half the battle in any security model. Blaming the user only gets you so far.

The problem in a lot of these stories seems to be the use of the "Authenticated Users" access control group within S3. When setting this permission, it's likely that people are interpreting it as "only me and other people I specify", when it actually means "anyone with an AWS account" - i.e., public.

Mark Nunnikhoven has written up a [useful](https://read.acloud.guru/how-to-secure-an-s3-bucket-7e2dbd34e81b) [guide](https://read.acloud.guru/how-to-secure-an-s3-bucket-7e2dbd34e81b) explaining how to get this right, which is worth reading if you want to avoid being the next "leaky bucket" headline.