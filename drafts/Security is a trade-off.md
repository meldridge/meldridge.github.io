# Security is a trade-off

*Briefly* describe threat modelling
Convenient/Productivity

(Example of a 3-digit PIN combination lock to keep out the kids)
If your threat model is a 6-year old...

A 3-digit pin is probably fine - a 6 year-old probably won’t be sitting there brute-forcing combinations



This isn’t a new concept - engineering is build around the concept of trade offs - but not understanding it is the root of many disagreements I seee online. 

“You should use PGP, it’s more secure!”

Etc

### Links

https://troyhunt.com/cloudflare-ssl-and-unhealthy-security-absolutism/

Rule 777:
If you don’t make a system usable and secure, the user will make it usable and insecure.
https://twitter.com/SwiftOnSecurity/status/1002383281550233601
 

Notebooks for password managers
 
https://www.theregister.co.uk/2018/07/09/conran_amazon_password_notebooks/

troy hunt post about this

### CDNs, DDoS mitigation, and MITM-as-a-service

Should maybe save this for the online voting post?

using a CDN like cloudflare is a good idea for most websites

can provide TLS

sifnificantly improve loadntikes for users and reduce bandwidth costs for you

remember how a CDN works
they are a reverse proxy for all incoming connections, and TLS connections are terminated there

Still important to remember that there is a trade-off here: it’s just one which most websites are justified in making - their threat model is one where the trade-off is the right decision. 

Trade-off 


