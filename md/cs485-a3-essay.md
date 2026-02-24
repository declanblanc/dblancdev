# LLM Frontend Development Reflection Essay

Originally written for Dr. Martin Kellogg's [CS 485: AI-Assisted Software Engineering](https://kelloggm.github.io/martinjkellogg.com/teaching/cs485-sp26/)

> Essay Prompt: 
> 
> _Discuss the legal and ethical implications of an LLM inadvertently helping you to design a UI that looks like a clone of another application. Has this happened to you before? Have you heard of this happening to others? What would you do if you got an email from the originator of your project's startup saying they saw your clone?_

If I paint a giant red smiley face on the front of my house, do I get to sue my neighbors willy-nilly if they do it too? _Oh boy… What is this guy on about?_

AI has sparked a lot of heated debate surrounding copyright and intellectual property. These debates can be far more complicated than they appear on the surface, and they are also far from brand new. As much as I would love to spend the next ~421 words of this essay explaining my thoughts on intellectual property, the book _Against Intellectual Monopoly_ (Boldrin & Levine, 2008) does that far more eloquently than I would. I'll try to keep the rest of my writing grounded in the realities of our legal systems.

When considering the legal implications of creating a UI that looks like another application, my personal belief is that intention should matter more than anything. Did the user know they were ripping off another site? Do they intend to profit off of this recreation, or is it just for fun? The Supreme Court has historically ruled that infringement requires proof of actual copying, and that genuine independent creation is not considered copyright infringement (_Arnstein v. Porter_, 1946; _Feist Publications, Inc. v. Rural Telephone Service Co._, 1991). If the cloning is something that occurs unwittingly due to an AI model, as the prompt suggests, you _would think_ the user who prompted the model should not be held accountable for copyright infringement so long as they could prove they never accessed the site that was copied. However, personal ignorance of the AI's copying _does not_ absolve the user of infringement, though it does strongly support an "innocent infringer" defense (_17 U.S. Code § 504_) to lower the financial penalties. _De Acosta v. Brown_ (1944) established that distribution of an infringing work is strictly liable for copyright infringement, even if the distributor is completely unaware that the material provided to them was copied.

I have yet to spend enough time coding with AI to have this happen to me, though I assume it is a common occurrence due to the fact that AI models are trained on existing data. In class, many of us are creating nearly 1:1 clones of existing websites. Even though our intention is not to deploy these sites and make money from them, this distinction is irrelevant in the eyes of copyright law. Still, I don't believe we should worry about ending up in court. Copyright is a civil matter, meaning it is entirely up to the "injured" party to file a lawsuit seeking damages (Legal Information Institute, n.d.; 17 U.S.C. § 501, 1976). Most companies understand that it is not worth their time to chase down every individual that infringed on their copyright, and it would also be a public relations nightmare. Imagine if the Walt Disney Company sued every child who drew a crude drawing of Mickey Mouse. With this in mind, if my group received an email from Discord threatening legal action, I would be quite surprised and of course swiftly take down the clone.

**Citations**

Boldrin, M., & Levine, D. K. (2008). Against Intellectual Monopoly. Cambridge University Press.

Arnstein v. Porter, 154 F.2d 464 (2d Cir. 1946).

Feist Publications, Inc. v. Rural Telephone Service Co., 499 U.S. 340 (1991).

_17 U.S. Code § 504 (1976)._

_17 U.S. Code § 501 (1976)._

_De Acosta v. Brown_, 146 F.2d 408 (2d Cir. 1944).

Legal Information Institute. (n.d.). Civil law. Cornell Law School. [https://www.law.cornell.edu/wex/civil\_law](https://www.law.cornell.edu/wex/civil_law)
