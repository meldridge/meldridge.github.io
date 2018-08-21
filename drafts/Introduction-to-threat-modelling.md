## How long is a piece of string?

Pop quiz: 

_**If I need to secure something with a password, how long should that password be?**_

Answer:  
a) Three digits (`"326"`)  
b) 12 characters, alphanumeric and symbols (`"JasperTato!7"`)  
c) 32 hexadecimal characters (`"41c9db4d3674590033790f6924be64ad"`)

Of course, this is a trick question: the correct answer is that **it depends on what you're trying to secure, and who you're trying to secure it from**.


## Know your threat model

In very simple terms, a *threat model* is a combination of two pieces of knowledge:
1. What you are trying to protect from attack
2. What sort of person is likely to attack it

One example: I have a medicine cupboard at ground-level in my house, and I want to prevent my children from accessing it. I decide to use a combination lock with a three-digit code (answer 'a' above).

Another: I need a password to protect my personal email account, and I want to prevent hackers from trivially guessing it. In this case, I decide to use a 12 character password (answer 'b').

Finally: I need to encrypt a file for 20+ years, and I need it to be secure from even a government agency with access to billions of dollars worth of computing power. Along with a good encryption method, I use a 32-character alphanumeric password (answer 'c').

The differences in these answers seem obvious, because we tend to do basic threat modelling intuitively. *Obviously* I shouldn't use a 3-digit code for my email account (even if the service allowed me to). *Obviously* I don't need a 12+ character password protecting the medicine cupboard. *Obviously* neither of these is going to be good enough against the NSA.

We've made a compromise between convenience and security, without really thinking about it.