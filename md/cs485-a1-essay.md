# LLM Coding Experience Reflection Essay

Originally written for Dr. Martin Kellogg's [CS 485: AI-Assisted Software Engineering](https://kelloggm.github.io/martinjkellogg.com/teaching/cs485-sp26/)

> Essay Prompt:
>
> _"Do you need to know anything about software engineering (e.g., any of the content of CS 490) to "vibe code"? Why or why not?"_

Whether or not someone needs traditional software engineering skills to "vibe code" depends heavily on how we choose to define what vibe coding is.

To answer this question, I'd like to share the experience of a close friend of mine who has zero programming experience. He knows his way around a computer, but don't ask him what a for loop is. Despite his absence of programming experience, he has been using a tool called [Base44](https://base44.com/) to "vibe code" a web app that assists him in his job as warehouse manager for a food production company. He has not written a single line of code. In fact, when I asked him if I could see the code that the project used, he initially did not know where to find it. His app is quite impressive, it allows him to efficiently plan his work through an "inventory flow simulation" including things like:

*   Tracking inventory such as ingredients to finished products
*   Track orders (Pending -> Confirmed -> Picked Up)
*   Determine what ingredients need to be ordered
*   Staff scheduling
*   and more…

He has taken processes that the previous manager had been doing _on pen and paper_, and radically streamlined it using nothing but prompting. In plain English. With no technical expertise. In his own words:

_”The end goal with this vibe coding is to create an application that is a specialized operations hub. Standard ERPs are too expensive (financially and staff time-wise) for a business of our size, but planning through paper math and tribal knowledge was not serving us anymore. My position as the operations manager allowed me to develop this as a concept within a day, and it improves constantly as I add features and bug-test.”_

So returning to the original question; is vibe coding without software engineering know-how possible? If vibe coding is creating a simple web app, absolutely. However, I wouldn't use the word _coding_ to describe this. My friend used an AI tool to create an awesome website. However, the ability to create a website without writing any code isn't novel. Tools have existed for this purpose for quite some time; while AI has completely altered the limits of these app-building tools, using one is not coding.

The capabilities of AI continue to constantly change; not only as LLMs grow and improve, but also as our techniques for interacting with them evolve as well. It is my belief that the limits of vibe coding can be clearly seen when working on projects that are "cutting-edge", fundamentally new, or at least less common than a simple web app. In addition to these limits, LLMs are severely limited by their "[context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows)". In simple terms, this means that AI models can only hold a limited amount of context in their "memory" at one time. When trying to work with LLMs in large codebases like [monorepos](https://en.wikipedia.org/wiki/Monorepo), the AI will often struggle due to information overload or "[context rot](https://research.trychroma.com/context-rot)". It seems as though the more transformative the project or task is, the less likely it is that AI can complete it without substantial guidance from an experienced software engineer.

I believe in the long run the idea of vibe coding with no technical experience will not last. Not because people won't be able to create awesome things using AI, but instead because the definition of what it means to code will change. Tools like Base44 are "AI-Assisted App Creation Tools", not coding tools.
