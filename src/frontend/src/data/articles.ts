import { ArticleType } from "../backend";

export interface SeedArticle {
  id: bigint;
  title: string;
  description: string;
  content: string[];
  articleType: ArticleType;
  author: string;
  createdAt: bigint;
  displayOrder: bigint;
}

export const seedConceptArticles: SeedArticle[] = [
  {
    id: 1n,
    title:
      "Do Extraordinary Humans Become 'Divine' in the Eyes of Future Generations?",
    description:
      "A philosophical exploration of how extreme excellence, combined with generational reinterpretation, may transform historical figures into divine or legendary entities.",
    content: [
      "Abstract: This philosophical note proposes that individuals with abilities, leadership, sacrifice, or skills far beyond the average of their time may be perceived as supernatural by later generations. Divinity-attribution can emerge from capability gaps, cultural storytelling, and generational reinterpretation.",
      "Core Question: Can a very large difference in human ability and way of living cause later generations to interpret a person as superhuman or divine?",
      "Main Idea: When an individual demonstrates skills, discipline, courage, or leadership far above the social average, observers often describe those abilities using supernatural language. Over time, stories become symbolic and amplified, turning exceptional humans into legendary or divine figures in cultural memory.",
      "Capability Gap Principle: If the ability gap between a person and the average population becomes extremely large, society may shift its explanation from 'highly skilled' to 'beyond human.' This is a perception shift driven by comparison limits.",
      "Future Generation Thought Experiment: If human training, technology, and cognition improve greatly over the next centuries, future societies may reinterpret today's top performers as myth-level figures — simply because of contextual difference in capability.",
      "Cultural Amplification: Across generations, facts become stories, stories become symbols, and symbols become sacred narratives. This transformation can occur naturally through cultural transmission.",
      "Conclusion: Divine perception of historical figures may partly arise from extreme excellence combined with generational reinterpretation. This model does not reject belief systems; it offers a perception-based explanatory framework for how divinity narratives can form. Note: This is a philosophical hypothesis intended for discussion and refinement.",
      "PDF:/assets/uploads/perception_divinity_paper-3.pdf",
    ],
    articleType: ArticleType.concept,
    author: "Piyush Yadav",
    createdAt: 1710000000000000000n,
    displayOrder: 1n,
  },
  {
    id: 2n,
    title: "Are We Living Inside a Simulation? — A Thought Experiment",
    description:
      "A philosophical and logical hypothesis exploring whether our universe operates as a simulated environment, drawing parallels with advanced computing and video game design.",
    content: [
      "Abstract: This thought experiment explores the possibility that reality could be a form of simulation, similar to a highly advanced video game environment. This is not presented as a factual claim but as a philosophical and logical hypothesis meant to encourage critical thinking.",
      "Core Question: Is it possible that our universe operates like a simulated environment controlled or observed by higher-level entities, similar to how humans design and control virtual worlds today?",
      "Background Idea: As computing power grows, humans are increasingly able to simulate complex worlds, intelligent agents, and realistic physics inside digital systems. If technology continues advancing over long time scales, future civilizations may be capable of running extremely detailed reality-scale simulations.",
      "Reasoning Model: If even one advanced civilization can run many conscious simulations, then the number of simulated minds could exceed the number of original biological minds. Under that assumption, a randomly existing observer would statistically be more likely to exist inside a simulation than in the base reality.",
      "Video Game Analogy: In modern video games, characters experience consistent rules, environments, and interactions defined by code. From inside the game, those rules appear as physics. Similarly, what we call laws of physics could theoretically be rule-sets of a deeper computational layer.",
      "Possible Indicators: Some thinkers have speculated about signs such as discrete physical limits, information bounds, or mathematical structure of nature as being compatible with simulation-like rules. However, none of these are confirmed proof — only interpretive arguments.",
      "Counterarguments: There is currently no experimental proof that reality is a simulation. The hypothesis may also be unfalsifiable. Many scientists argue that without testable predictions, the idea remains philosophical rather than scientific.",
      "Philosophical Value: Even if unproven, the simulation hypothesis is useful as a philosophical tool. It raises questions about consciousness, reality, ethics, and what it means for something to be real.",
      "Conclusion: The simulation idea should be treated as a hypothesis, not a fact. It is a framework for questioning reality, not replacing scientific explanation.",
      "PDF:/assets/uploads/simulation_hypothesis_paper-5-2.pdf",
    ],
    articleType: ArticleType.concept,
    author: "PsyQuantum",
    createdAt: 1710000100000000000n,
    displayOrder: 2n,
  },
  {
    id: 3n,
    title:
      "Dream Manipulation: Can Dreams Be Artificially Influenced or Shaped?",
    description:
      "An exploration of the neuroscience behind dreams and the theoretical possibility of artificially shaping dream content using brain-computer interfaces and AI-guided sleep systems.",
    content: [
      "Abstract: Dreams are internally generated simulations created by the human brain during sleep, especially in the REM phase. This article explores the hypothesis of artificial dream shaping — not as a current capability, but as a future possibility — using brain-computer interfaces, targeted stimulation, and AI-guided sleep systems.",
      "Core Question: Can human dreams ever be deliberately influenced or shaped using technology, and if so, what scientific principles and ethical limits would define such a system?",
      "Background: Dreams primarily occur during Rapid Eye Movement (REM) sleep, when neural activity is high and sensory input from the external world is reduced. The brain combines memory fragments, emotional signals, and imagination to create dream experiences. Traditionally, dreams have been considered spontaneous and uncontrollable.",
      "Current Scientific Observations: Studies indicate that mild external stimuli during sleep — such as sound cues, light signals, and smell — can sometimes influence dream mood or elements. Lucid dreaming research shows that trained individuals can become aware within dreams and exert limited control.",
      "Hypothesis: Future Dream Shaping Systems: A future system might combine sleep-stage detection, neural signal monitoring, and precisely timed sensory cues to guide dream themes. Brain-computer interfaces and non-invasive neural stimulation tools could theoretically activate selected memory networks. Artificial intelligence could personalize pre-sleep prompts and timing.",
      "Possible Applications: Potential uses may include trauma therapy support, creative visualization, skill rehearsal, emotional processing, and guided imagination experiences — only with full user awareness and consent.",
      "Risks and Ethical Concerns: Dream influence technology could raise serious ethical issues, including mental privacy, psychological manipulation, consent violations, and subconscious persuasion risks. Strict safeguards would be essential if such technology ever becomes viable.",
      "Conclusion: Artificial dream shaping remains a hypothesis, not a present-day reality. However, ongoing neuroscience and interface research suggests that partial influence may become possible in the future. Dreams may be the final private space of the human mind.",
      "PDF:/assets/uploads/Dream_Manipulation_Article-1.pdf",
    ],
    articleType: ArticleType.concept,
    author: "PsyQuantum",
    createdAt: 1710000200000000000n,
    displayOrder: 3n,
  },
  {
    id: 4n,
    title: "Did Humans Invent Mathematics or Discover It?",
    description:
      "An investigation into whether mathematics is a human invention or a pre-existing structure of the universe, illustrated through natural patterns, historical discoveries, and philosophical debate.",
    content: [
      "Everywhere we look in the universe, mathematics appears to exist. From the branching structure of trees to the motion of planets and the spiral shapes of galaxies, many natural phenomena follow clear mathematical patterns. Scientists and philosophers have long asked: did humans invent mathematics as a language to describe reality, or did we discover something already built into the universe?",
      "Mathematics Appearing in Nature: Nature frequently produces patterns that can be explained mathematically. Many plants grow in arrangements related to the Fibonacci sequence. Mountains, coastlines, and clouds often follow fractal-like structures that repeat similar patterns at different scales.",
      "When Mathematics Looks Invented: Sometimes mathematics appears to come from human creativity first. Isaac Newton developed calculus as a mathematical method for studying motion — later it became essential for describing gravity and planetary motion. Paul Dirac created an equation that unexpectedly predicted the existence of antimatter years before it was experimentally discovered.",
      "When Mathematics Looks Discovered: In other situations, mathematics seems to emerge from observing the universe itself. Astronomer Johannes Kepler analyzed the motion of planets and discovered mathematical laws that describe their orbits — laws that existed in nature long before humans understood them. Spiral galaxies show structures that can be modeled with logarithmic spiral equations.",
      "Conclusion: The debate about whether mathematics is invented or discovered is still open today. If the universe truly follows mathematical structures at every level — from atoms to galaxies — then mathematics might not just describe reality. It may actually be the deep structure of reality itself.",
      "PDF:/assets/uploads/math_invented_or_discovered_visual-1-5.pdf",
    ],
    articleType: ArticleType.concept,
    author: "PsyQuantum",
    createdAt: 1710000300000000000n,
    displayOrder: 4n,
  },
  {
    id: 5n,
    title:
      "A Generalization of a Square Root Inequality Involving Linear Relationships",
    description:
      "A formal mathematical paper proving that under equal differences, a pair with greater sum yields a greater sum of square roots — derived using calculus and properties of concave functions.",
    content: [
      "Abstract: This paper explores a mathematical inequality involving square roots and linear relationships. Specifically, we prove that if the difference between two pairs of real numbers is equal, and the sum of one pair is greater, then the sum of the square roots of the first pair is also greater. The result is derived using calculus and properties of concave functions.",
      "1. Introduction: Mathematical inequalities play a crucial role in algebra, geometry, and analysis. The inequality we prove: If a − b = c − d and a + b > c + d, then √a + √b > √c + √d.",
      "2. Theorem and Proof: Let a, b, c, d > 0 with a − b = c − d and a + b > c + d. We introduce the substitution: a = x + y, b = x − y, c = u + y, d = u − y where y > 0 and x > u. Consider the function f(x) = √(x+y) + √(x−y). Its derivative f'(x) = 1/(2√(x+y)) + 1/(2√(x−y)) > 0 for all x > y. Since f'(x) > 0, the function is strictly increasing. Therefore if x > u, then f(x) > f(u), which gives √a + √b > √c + √d.",
      "3. Graphical Representation: Plotting f(x) = √(x+y) + √(x−y) for fixed y confirms the function increases with x, validating that for any fixed difference a − b = c − d, a greater sum results in a greater total of square roots.",
      "4. Generalization: The result remains valid if the square root is replaced with any concave increasing function, such as cube roots or logarithms. This approach may extend to more complex inequalities using tools like Jensen's Inequality.",
      "5. Extended Generalization: For multiple pairs with equal differences, if the total sum of one group exceeds another, the total sum of square roots also exceeds. This follows from the strictly increasing nature of f(x) applied to each pair.",
      "6. Conclusion: We proved √a + √b > √c + √d under the conditions a − b = c − d and a + b > c + d, and proposed generalizations to multiple variables. This opens the door for further study in advanced inequality problems.",
    ],
    articleType: ArticleType.concept,
    author: "Piyush Yadav (Age 17)",
    createdAt: 1710000400000000000n,
    displayOrder: 5n,
  },
  {
    id: 6n,
    title:
      "Deep Ocean Pressure Differential Energy Storage (DOPDES): A Scalable Approach for Long-Duration Renewable Energy Storage",
    description:
      "A research concept proposing an underwater energy storage system that harnesses hydrostatic pressure at 500–1,000 meter ocean depths using flexible bladders and submerged turbines — achieving projected round-trip efficiencies of 70–80%.",
    content: [
      "Abstract: The rapid integration of renewable energy sources requires scalable and long-duration energy storage solutions. This paper presents Deep Ocean Pressure Differential Energy Storage (DOPDES), an underwater energy storage concept that utilizes hydrostatic pressure at ocean depths of 500–1,000 meters. The system employs flexible composite bladders anchored to the seabed, which store energy by pumping seawater against ambient pressure using surplus renewable electricity. During discharge, the stored pressure drives seawater through submerged turbines to generate electricity. Preliminary analysis indicates a projected round-trip efficiency of 70–80%, making DOPDES competitive with pumped hydro storage while avoiding land-use constraints.",
      "1. Introduction: Renewable energy sources such as solar and wind are inherently intermittent, creating a growing demand for large-scale and long-duration energy storage. Existing solutions such as lithium-ion batteries face cost and scalability limitations at grid scale. Pumped hydro storage, while mature and efficient, is constrained by geographical requirements. DOPDES proposes a novel alternative that leverages the vast and largely untapped energy potential of deep ocean environments.",
      "2. System Design: The DOPDES system consists of flexible composite bladders anchored to the ocean floor at depths of 500–1,000 meters. During periods of excess renewable generation, surplus electricity powers pumps that compress seawater into these bladders against the ambient hydrostatic pressure. The stored pressure differential represents potential energy ready for release.",
      "3. Energy Generation: During discharge, seawater is released from the pressurized bladders and flows through submerged turbine-generator units back into the surrounding ocean. The pressure differential drives the turbines to produce electricity, which is transmitted to the surface via underwater cables. The cycle can be repeated continuously as renewable energy availability fluctuates.",
      "4. Efficiency and Scalability: Preliminary analysis suggests round-trip efficiency of 70–80%, comparable to pumped hydro storage. The system scales with the number and size of bladder units deployed. Unlike land-based storage, DOPDES avoids competition for surface area and can be sited along continental shelves globally. The deep ocean provides a stable, temperature-consistent environment that reduces material degradation.",
      "5. Environmental Considerations: Deployment must account for deep-sea ecosystems. Bladder anchoring systems should minimize seabed disturbance. The absence of chemical processes (unlike battery storage) eliminates toxic byproduct risks. Long-term studies on acoustic and pressure impacts on marine life would be required before large-scale deployment.",
      "6. Conclusion: DOPDES represents a promising approach for large-scale, long-duration renewable energy storage. By utilizing the natural pressure environment of the deep ocean, this concept offers a geographically flexible, scalable, and environmentally cleaner alternative to existing grid-scale storage technologies. Further research into materials science, marine engineering, and ecological impact is required to advance this concept toward feasibility.",
      "PDF:/assets/uploads/DOPDES_Concept_Energy_Storage-1.pdf",
    ],
    articleType: ArticleType.concept,
    author: "Piyush Yadav",
    createdAt: 1710000500000000000n,
    displayOrder: 6n,
  },
];

export const seedExplainedArticles: SeedArticle[] = [
  {
    id: 101n,
    title: "When Legends Are Born: The Making of a God from a Human",
    description:
      "A storytelling journey through history exploring how extraordinary people become divine legends over generations.",
    content: [
      "Imagine living in a small village two thousand years ago. One day, a stranger arrives — he can heal wounds with herbs no one has heard of, predict the weather with uncanny accuracy, and lead armies with a calmness that defies fear. To you, he seems impossibly skilled. To your grandchildren, he may already be a legend. To their grandchildren? Perhaps a god.",
      "This is the quiet mechanism behind how humans become divine. It isn't magic — it's the mathematics of perception and time. The wider the gap between one person's abilities and everyone else's, the harder it becomes to find a human explanation for what they could do.",
      "Think about it like this: if you handed a smartphone to someone in medieval Europe, they wouldn't call it technology. They'd call it sorcery. The device didn't change — only the context did. And that's exactly what happens to extraordinary humans across centuries.",
      "Stories don't stay still. Each generation that retells them adds color, emphasis, and meaning. A general who won a battle becomes a warrior blessed by the sky. A healer who saved a village becomes someone who could raise the dead. These aren't lies — they're the natural amplification of something that felt incomprehensibly large.",
      "The philosopher Nietzsche wrote about extraordinary humans — those who shape the future, not just follow it. History is full of such people: scientists, warriors, artists, and thinkers who seemed to operate on a different plane entirely. And what did humanity do with them? It turned many of them into myths.",
      "So the next question is this: are extraordinary humans alive today who will be reimagined as divine a thousand years from now? It's not impossible. The gap just needs to be wide enough — and the stories to travel far enough.",
    ],
    articleType: ArticleType.explained,
    author: "PsyQuantum",
    createdAt: 1710000500000000000n,
    displayOrder: 1n,
  },
  {
    id: 102n,
    title:
      "What If You're Not Real? The Simulation Thought Experiment, Explained",
    description:
      "A casual, imaginative walk through the mind-bending idea that our entire reality could be a program running on some cosmic computer.",
    content: [
      "You're sitting in a chair, reading these words. The chair feels solid. The light feels warm. Everything around you feels undeniably, completely real. But here's a thought that might keep you up tonight: what if none of it is?",
      "Let's start with video games. When you play a detailed game, the characters inside don't know they're in a simulation. The physics of that world — gravity, light, cause and effect — all follow the rules coded into the game engine. From inside, everything seems completely real.",
      "Now zoom out. Way out. Our universe also has rules — the laws of physics. They're extraordinarily mathematical and precise. Some physicists have noticed that reality behaves a lot like information. At the smallest scale, the universe seems almost... pixelated.",
      "Here's where it gets philosophically wild: imagine that millions of years in the future, a civilization becomes powerful enough to simulate entire universes — with conscious beings inside them. If they ran thousands of such simulations, then statistically, you'd be far more likely to be one of those simulated minds than the one real one.",
      "The philosopher Nick Bostrom formalized this argument. He says: either civilization always goes extinct before it can run simulations, or civilizations don't want to run simulations, or we're almost certainly living in one. At least one of those must be true.",
      "Of course, there's no proof. And it might be impossible to ever prove or disprove. But that's sort of the point — this thought experiment isn't about knowing the answer. It's about asking deeper questions. If reality is a simulation, does that make it less real? Does it change how you should live? Most philosophers say no. The experience is real, even if the substrate isn't.",
      "And maybe that's enough.",
    ],
    articleType: ArticleType.explained,
    author: "PsyQuantum",
    createdAt: 1710000600000000000n,
    displayOrder: 2n,
  },
  {
    id: 103n,
    title:
      "Inside Your Sleeping Mind: Could Technology One Day Shape Your Dreams?",
    description:
      "A story-driven exploration of the science of dreams and a speculative future where AI and brain interfaces guide what we dream.",
    content: [
      "Every night, your brain does something extraordinary. It shuts out the world, dims the lights of consciousness, and begins to construct an entirely private universe — one where you can fly, revisit your childhood, or face monsters you've never seen. This is dreaming: one of the most mysterious things a human brain does.",
      "For most of history, dreams were considered messages from gods, echoes of the unconscious, or just random noise. Today, neuroscience tells us they're generated during REM sleep — when the brain is almost as active as when you're awake, but completely disconnected from the outside world.",
      "Here's the fascinating part: the outside world can already sneak in, a little. Studies have shown that smells, sounds, and even gentle touches during sleep can influence what you dream about. A researcher played recordings of specific words to sleepers, and those words sometimes appeared in their reported dreams. The door isn't completely closed.",
      "Now imagine we develop precise tools — brain-computer interfaces that can read and gently nudge the specific neural patterns associated with certain memories or emotions. You go to sleep, you connect your interface, and you choose: tonight, I want to rehearse that presentation. Or: tonight, I want to process the grief I'm still carrying.",
      "The science isn't there yet. But the direction it's heading is unmistakable. Lucid dreaming research shows some people can learn to become aware that they're dreaming — and even steer the narrative. Technology might extend that capability to everyone.",
      "Of course, this raises questions that should make us pause. If someone can influence your dreams, they can influence your subconscious. Mental privacy — the idea that your sleeping mind belongs only to you — might become something we have to legally protect. Dreams could become the last private space.",
      "And maybe that's the most important thing we could build: not the technology to enter dreams, but the wisdom to know when not to.",
    ],
    articleType: ArticleType.explained,
    author: "PsyQuantum",
    createdAt: 1710000700000000000n,
    displayOrder: 3n,
  },
  {
    id: 104n,
    title: "Was Mathematics Always There, Waiting to Be Found?",
    description:
      "A curious journey into one of philosophy's oldest debates: did we invent the language of numbers, or did we find it written into the universe itself?",
    content: [
      "Picture the moment a caveman first counted pebbles — one, two, three. Did they invent numbers? Or did they simply notice something that was always already there, as real as the rocks themselves?",
      "This question has haunted mathematicians and philosophers for centuries. And it turns out, there's no easy answer.",
      "Look at the way nature grows. Sunflowers arrange their seeds in spirals that follow the Fibonacci sequence — a mathematical pattern no sunflower ever studied. Hurricanes form logarithmic spirals. Snowflakes express perfect hexagonal symmetry. Did nature consult a textbook? Obviously not. But somehow, mathematics keeps showing up.",
      "Then there are moments in history that feel almost eerie. In the 1800s, mathematician Paul Dirac was working with abstract equations about electrons. He wasn't looking for new particles — he was just solving equations. But the math forced a conclusion: there must be an opposite particle, a mirror of the electron. Scientists called it crazy. Then, years later, they discovered it. The positron was real. Mathematics had found it before experiments could.",
      "That's the 'discovery' argument. Mathematics seems to exist independently of human minds. We find it; we don't create it.",
      "But then consider calculus. Isaac Newton didn't find calculus lying around. He invented it because he needed a tool to describe how gravity works. It was problem-first, math-second. That's the 'invention' argument — we build mathematical tools to solve problems we encounter in the physical world.",
      "Maybe the truth lives somewhere between. Perhaps we invent the language — the symbols, the notation, the formal systems — but the relationships those symbols describe are built into reality itself. Like how different civilizations across history discovered the same geometric truths without ever meeting each other. The forms were always there, waiting.",
      "Mathematics, then, might be the universe's own language — and we're still learning to read it.",
    ],
    articleType: ArticleType.explained,
    author: "PsyQuantum",
    createdAt: 1710000800000000000n,
    displayOrder: 4n,
  },
];

export const allSeedArticles = [
  ...seedConceptArticles,
  ...seedExplainedArticles,
];
