---
layout: email
title: Meltdown and Spectre
---

What a day.

To summarise, we have two vulnerabilities:
* The **‘Meltdown’** vulnerability affects most Intel CPUs manufactured in the last 20 years
* The **‘Spectre’** vulnerability affects all CPUs which use ‘speculative execution’ (which is effectively _any_ modern CPU)
The vulnerabilities were independently discovered by two separate groups of researchers (namedrop: this included Dr Yuval Yarom, my Master's supervisor) and privately disclosed to the affected parties in mid-2017.

**Meltdown** is easier to exploit, only applies to Intel CPUs, and allows userspace processes to read arbitrary kernel memory. For hypervisors using paravirtualisation (like Xen, used by Amazon Web Services), this means that guest virtual machines (VMs) can read the memory of the host OS, which includes the memory of every other guest VM running on the same hardware. This is a massive deal for anyone using shared cloud services such as AWS, and also potentially explains the news from back in November that AWS was moving to a [different hypervisor](https://www.theregister.co.uk/2017/11/07/aws_writes_new_kvm_based_hypervisor_to_make_its_cloud_go_faster/).

**Spectre** is harder to exploit, but the impacts are potentially even greater, and it affects basically everything, not just Intel. Currently, it only allows userspace processes to read the memory of other userspace processes, but that may change.


### What happens when your security assumptions break

To put it bluntly, these vulnerabilities mean that the security assumptions underpinning modern operating systems are broken. One of the fundamental jobs that a CPU is trusted to do is to provide effective isolation between the memory of userspace processes and the kernel, and it turns out that they aren't.

The vulnerabilities are hardware design flaws in the affected CPUs, and can’t be easily fixed in software without incurring significant performance costs. In addition, the fact that these vulnerabilities were found independently strongly suggests that they have been known by intelligence services for quite a while.

A lot of people are very unhappy, and rightly so. If your company relies heavily on cloud services like AWS, your virtual machines are potentially going to take a [performance hit](https://forums.aws.amazon.com/thread.jspa?threadID=269858) due to the mitigations being applied by Amazon (which directly translates into more $$$). On top of that, you have to assume that these vulnerabilities have been known by state actors for some time, and therefore there's a chance that all of your sensitive data has already been stolen if such an actor managed to rent an AWS instance on the same hardware as your VM. That means SSL/TLS keys, SSH keys, kernel keyring, bitcoin wallets, and anything else in memory that you care about.

It's unlikely that anyone managing really sensitive data would be using shared cloud services in the first place ([you would think](https://twitter.com/peterktodd/status/948700964227375104)), but I certainly wouldn't want to be an AWS salesperson right now. 
There's still a lot still to come in this story, and that's just the technical side - we haven't even covered the juicy details about Intel's CEO [selling his stock back in November](http://nordic.businessinsider.com/intel-ceo-krzanich-sold-shares-after-company-was-informed-of-chip-flaw-2018-1?r=US&IR=T), or the potential for [class action lawsuits](https://twitter.com/twiddlekins/status/948796560472670208) against Intel over the Meltdown vulnerability, or the [absurdly bad damage control attempts by Intel PR](http://www.theregister.co.uk/2018/01/04/intel_meltdown_spectre_bugs_the_registers_annotations/). 

### Speculative execution and security tradeoffs

Although 'Meltdown' is the more immediately serious issue, the 'Spectre' vulnerability is the more insidious one, and it's going to be incredibly difficult to fix. Both of these vulnerabilities exist because of speculative execution: the fact that modern CPU's don't execute instructions in order - they tend to execute them in parallel, guessing which instructions will be needed in the future and then discarding the results if the guess was wrong.

There's an excellent explanation of speculative execution in the [Xen security advisory](https://xenbits.xen.org/xsa/advisory-254.html):

>Processors give the illusion of a sequence of instructions executed one-by-one.  However, in order to most efficiently use cpu resources, modern superscalar processors actually begin executing many instructions in parallel.  In cases where instructions depend on the result of previous instructions or checks which have not yet completed, execution happens based on guesses about what the outcome will be.  If the guess is correct, execution has been sped up.  If the guess is incorrect, partially-executed instructions are cancelled and architectural state changes (to registers, memory, and so on) reverted; but the whole process is no slower than if no guess had been made at all.  This is sometimes called "speculative execution".
>
>Unfortunately, although architectural state is rolled back, there are other side effects, such as changes to TLB or cache state, which are not rolled back.  These side effects can subsequently be detected by an attacker to determine information about what happened during the speculative execution phase.  If an attacker can cause speculative execution to access sensitive memory areas, they may be able to infer what that sensitive memory contained.

When it comes to Meltdown, Intel's mistake was making their speculative execution even more aggressive - not only does it guess and execute future instructions, but it will also load memory before it has checked to see that the memory access is permitted for the process performing the memory read. This memory is loaded into the CPU cache, and isn't properly flushed when the CPU realises that the instructions should never have occurred. The malicious process can then perform a side-channel attack to retrieve the memory that was loaded, over time allowing it to read memory that it should never be able to read.

The result is that the speculative memory loads give the CPU a performance boost... with the slight downside of breaking every security assumption underpinning modern OS design. In effect, Intel has been unknowingly making a trade-off of security in favour of performance for ~20 years, and it's come back to bite them (and the rest of us) squarely in the ass.

To play devil's advocate in Intel's defence: hindsight is always 20-20, and when they made these trade-offs it was much less obvious how much impact this class of bugs would have. Side-channel attacks against CPU caches much less well known in public circles back then. In addition, virtualisation was relatively young, and no one would have predicted a world where the majority of the internet runs on paravirtualised hypervisors like Amazon Web Services (The Xen hypervisor itself was [introduced in 2003](http://www.cs.yale.edu/homes/yu-minlan/teach/csci599-fall12/papers/xen.pdf)). 

If it wasn't for the impact on services like AWS, these vulnerabilities might have remained mildly interesting privilege escalation exploits, and nothing more. However, we now live in a world where a guest virtual machine being able to read host memory breaks the security model for a large chunk of modern tech.


### Takeaway

As with every big new public vulnerability, over the next few days you will see people both wildly overstating the risk ("everything is broken, put your PC in the bin, live in a cave"), and wildly understating the risk ("everything is fine, no normal person needs to care about this").

To be clear, this is a huge deal: both vulnerabilities have caused entire operating systems to drastically redesign how they handle memory, and enterprises will be chasing down both their AWS footprint and their internal systems for weeks. Amazon themselves will see a massive increase in demand for CPU due to their guest VMs suddenly being less efficient, and will have to battle an increased perception that sharing hardware with other random people just isn't worth the risk. There will be threats of lawsuits and actual lawsuits, and these vulnerabilities will shadow every CPU release by both Intel and AMD for the next several years. The fact that the 'patches' have a performance impact means that a lot of people, justified or not, won't apply them.

On the other hand, your PC at home is just fine: your browser should be automatically patched against the JavaScript attack vectors in the next week or so, and Windows, macOS, and Linux are releasing updates to fix or mitigate the issues. These updates shouldn't have any significant performance impact for regular users, and gamers won't even notice (games are limited by compute, not system calls).

One of the saving graces about these vulnerabilities is that there's basically nothing that any security vendor could have done to stop them, so we should see less ambulance chasing and "buy my blinky light box" than we did after previous disasters like WannaCry.


### Links

There has been a lot of ink spilled over this, and there will be a lot more to come. In the meantime, I've compiled the links below for your reading pleasure:

* <https://spectreattack.com/> (and <https://meltdownattack.com> - both point to the same site)
* <https://googleprojectzero.blogspot.se/2018/01/reading-privileged-memory-with-side.html> (Google's Project Zero writeup)
* <http://blog.cyberus-technology.de/posts/2018-01-03-meltdown.html> (Excellent summary of the ‘Meltdown’ vulnerability by one of the researchers)
* <https://arstechnica.com/gadgets/2018/01/meltdown-and-spectre-every-modern-processor-has-unfixable-security-flaws/> (Good summary of both vulnerabilities and the root cause)