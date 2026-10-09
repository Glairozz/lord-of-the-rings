import type { Theme } from '@/types/content';

/**
 * Literary themes of the legendarium.
 *
 * These entries are explicitly labeled `interpretation`: each one states a
 * thesis, gathers textual evidence, and then records the strongest competing
 * readings. No single theme is presented as Tolkien's own settled verdict.
 */
export const themes: Theme[] = [
  {
    id: 'power-and-corruption',
    slug: 'power-and-corruption',
    name: 'Power and Corruption',
    summary:
      'The One Ring magnifies whatever desire already exists in its bearer, so resisting it means resisting a flattering version of oneself rather than an external enemy.',
    sourceIds: ['lotr', 'silmarillion', 'tolkien-letters', 'unfinished-tales'],
    continuity: 'interpretation',
    tags: ['the-one-ring', 'sauron', 'gollum', 'boromir'],
    question: 'Why is the Ring so difficult to resist?',
    thesis:
      'The Ring is hard to resist because it does not invent evil from nothing; it recruits the bearer\u2019s own legitimate loves and turns them into instruments of domination. Its offers are tailored, patient and plausible, which is why the strongest-willed characters are often the most endangered.',
    evidence: [
      {
        point: 'The Ring scales its temptation to the bearer',
        detail:
          'Galadriel is shown a vision in which she rules a beloved realm as a benevolent queen, and the horror of the offer lies in how close it sits to her real desire to preserve Lothl\u00f3rien. The danger is not that she wants power for its own sake but that she wants to protect something good.',
        sourceIds: ['lotr'],
      },
      {
        point: 'Power reveals rather than replaces character',
        detail:
          'Boromir begins as a brave defender of Gondor, yet the Ring works through his genuine fear for his people. His fall is a corruption of a virtue, which suggests the Ring exploits existing motives instead of manufacturing new ones.',
        sourceIds: ['lotr'],
      },
      {
        point: 'Prolonged possession erodes the person',
        detail:
          'Gollum\u2019s long ownership is depicted as a slow shrinking of his personality until the Ring dominates his thinking. The tragedy is that he is not simply a monster but a ruined hobbit-like creature, so the Ring is shown as dehumanizing over time.',
        sourceIds: ['lotr', 'hobbit'],
      },
      {
        point: 'Origin reveals the Ring\u2019s design',
        detail:
          'The Silmarillion and the tale of the Rings of Power present the One Ring as a device forged to control the other rings and their keepers, tying domination into its purpose from the outset. Its seduction is thus a function of its original intent.',
        sourceIds: ['silmarillion', 'unfinished-tales'],
      },
      {
        point: 'Tolkien frames the issue through humility, not strength',
        detail:
          'In his letters Tolkien reflects that the humble seem to endure the Ring better than the mighty, which supports reading the theme as a critique of the will-to-power rather than a celebration of heroism.',
        sourceIds: ['tolkien-letters'],
      },
    ],
    counterarguments: [
      'A competing reading holds that the Ring is less a psychological mirror and more an almost mechanical force of evil, so its effects should be read as supernatural coercion rather than an amplification of character.',
      'Some readers argue the text actually celebrates great power when it is rightly held, since Aragorn and Galadriel are admired rulers; on this view the problem is not power itself but illegitimate or coercive power.',
      'Others stress that the Ring mainly punishes possessiveness and attachment, so the theme is better described as a warning about greed and letting go than about political power in general.',
    ],
    discussionPrompt:
      'If the Ring works through what people already love, does that make its victims morally responsible, or does it make them tragic?',
    relatedThemeIds: ['pity-and-mercy', 'providence-and-free-will', 'hope-and-despair'],
  },
  {
    id: 'pity-and-mercy',
    slug: 'pity-and-mercy',
    name: 'Pity and Mercy',
    summary:
      'Bilbo\u2019s refusal to kill Gollum, passed on to Frodo, preserves the creature whose accidental role becomes decisive for the Ring\u2019s destruction.',
    sourceIds: ['hobbit', 'lotr', 'tolkien-letters', 'silmarillion'],
    continuity: 'interpretation',
    tags: ['gollum', 'bilbo', 'frodo', 'sam'],
    question: 'How does Bilbo\u2019s mercy toward Gollum shape the fate of the Ring?',
    thesis:
      'Mercy is portrayed as a form of foresight: by sparing Gollum, Bilbo keeps alive the one hand through which the Ring will eventually be undone, so pity operates as a hidden mechanism of the plot rather than a soft sentiment.',
    evidence: [
      {
        point: 'Bilbo\u2019s decision is framed as inward, not strategic',
        detail:
          'In the riddle-game chapter Bilbo spares Gollum partly from fear and partly from a pity he cannot fully explain, which later readings treat as a moment of grace working through an ordinary person.',
        sourceIds: ['hobbit'],
      },
      {
        point: 'Gandalf defends mercy before Frodo knows its cost',
        detail:
          'Gandalf warns that it was pity that stayed Bilbo\u2019s hand and that Gollum still has a part to play, explicitly linking mercy to a purpose Frodo cannot yet see.',
        sourceIds: ['lotr'],
      },
      {
        point: 'Frodo inherits and extends the same restraint',
        detail:
          'Frodo repeatedly refuses to kill Gollum even when betrayal would justify it, and this restraint keeps Gollum traveling with the hobbits toward the Fire.',
        sourceIds: ['lotr'],
      },
      {
        point: 'The Ring\u2019s destruction depends on Gollum\u2019s fall',
        detail:
          'At the Cracks of Doom Frodo finally claims the Ring, but Gollum\u2019s intervention sends both Ring and creature into the fire, so the spared enemy becomes the instrument of deliverance.',
        sourceIds: ['lotr'],
      },
      {
        point: 'Tolkien names pity as a central virtue',
        detail:
          'Authorial commentary treats pity and the refusal to deal death lightly as moral anchors of the story, reinforcing a reading in which mercy is a governing principle rather than a plot convenience.',
        sourceIds: ['tolkien-letters'],
      },
    ],
    counterarguments: [
      'A deterministic reading argues that Gollum was always fated to fall into the fire, so Bilbo\u2019s mercy is narratively decorative rather than causally decisive.',
      'Some readers contend that mercy toward Gollum also enables his betrayals, including the danger to Frodo and the near-failure at Shelob\u2019s lair, so pity carries real and under-acknowledged costs.',
      'Others read the ending as largely a failure of Frodo\u2019s will, with the Ring destroyed only by accident, which would make mercy a thematic grace note rather than the mechanism of victory.',
    ],
    discussionPrompt:
      'Does mercy remain admirable if it also produces suffering along the way, or is it only judged by outcomes?',
    relatedThemeIds: ['power-and-corruption', 'providence-and-free-will', 'hope-and-despair'],
  },
  {
    id: 'mortality-and-immortality',
    slug: 'mortality-and-immortality',
    name: 'Mortality and Immortality',
    summary:
      'Elves and Men face opposite burdens: Elves endure the world without release, while Men receive the strange gift of death and the freedom it implies.',
    sourceIds: ['silmarillion', 'lotr', 'unfinished-tales', 'tolkien-letters'],
    continuity: 'interpretation',
    tags: ['elves', 'men', 'numenor', 'death'],
    question: 'How do Elves and Men experience time and death differently?',
    thesis:
      'The theme is not simply that Elves live forever and Men do not; it is that immortality is presented as a weariness and death as a gift whose meaning depends on how it is received. The two fates illuminate each other\u2019s limits.',
    evidence: [
      {
        point: 'Elven longevity comes with grief',
        detail:
          'Elves are bound to Arda and to its slow unfolding, so they accumulate memory and loss across ages; their permanence is repeatedly depicted as a source of sorrow rather than simple triumph.',
        sourceIds: ['silmarillion', 'lotr'],
      },
      {
        point: 'Death is called a gift to Men',
        detail:
          'The legendarium frames the human mortality that Men receive as a distinct fate, one they neither understand nor comfortably accept, and the unease around it drives much of their history.',
        sourceIds: ['silmarillion', 'tolkien-letters'],
      },
      {
        point: 'N\u00famenor shows envy turning to disaster',
        detail:
          'The N\u00famen\u00f3reans\u2019 fear of death and desire for prolongation lead them toward rebellion, illustrating that the refusal to accept mortal limits can be catastrophic.',
        sourceIds: ['silmarillion', 'unfinished-tales'],
      },
      {
        point: 'Mortal and immortal love is inherently tinged with parting',
        detail:
          'Tales such as Beren and L\u00fathien and Aragorn and Arwen turn on the choice to join a mortal fate, showing that love across the divide requires accepting loss as its price.',
        sourceIds: ['lotr', 'beren-and-luthien', 'silmarillion'],
      },
      {
        point: 'Ring-wraiths invert the theme',
        detail:
          'The Nazg\u00fbl pursue a kind of unholy long life and become neither living nor dead, which suggests that clinging to existence beyond its proper term deforms a person.',
        sourceIds: ['lotr'],
      },
    ],
    counterarguments: [
      'One reading treats death as genuinely good only within a specific theology, and secular readers may see the text as romanticizing mortality rather than honestly valuing it.',
      'A competing view holds that Elven sorrow is largely circumstantial, a product of particular wars and partings, so immortality itself is not presented as inherently tragic.',
      'Some readers argue the real contrast is between acceptance and refusal, not between immortal and mortal natures, which shifts the theme from ontology to attitude.',
    ],
    discussionPrompt:
      'Is death in Middle-earth a limitation, a gift, or simply a different kind of fate that neither Elves nor Men fully understand?',
    relatedThemeIds: ['grief-and-loss', 'providence-and-free-will', 'hope-and-despair'],
  },
  {
    id: 'friendship-and-loyalty',
    slug: 'friendship-and-loyalty',
    name: 'Friendship and Loyalty',
    summary:
      'Frodo and Sam survive because each compensates for the other\u2019s limits: Frodo carries the burden and the vision, while Sam supplies endurance, care and the will to keep going.',
    sourceIds: ['lotr', 'tolkien-letters', 'hobbit'],
    continuity: 'interpretation',
    tags: ['sam', 'frodo', 'fellowship', 'the-shire'],
    question: 'How do Sam and Frodo depend on one another?',
    thesis:
      'The relationship is deliberately asymmetric but mutual: Frodo bears the Ring and its erosion, while Sam bears Frodo himself. The quest reaches its end not because either is sufficient alone but because their weaknesses interlock.',
    evidence: [
      {
        point: 'Sam\u2019s loyalty is grounded in service and love',
        detail:
          'Sam begins as a gardener and companion and refuses to abandon the quest even when he could reasonably return home, which frames loyalty as a chosen continuing act rather than an obligation.',
        sourceIds: ['lotr'],
      },
      {
        point: 'Frodo depends on Sam for the most basic survival',
        detail:
          'Across Mordor Sam carries, feeds, forgives and physically supports Frodo, and without that care the Ring-bearer could not have gone on at all.',
        sourceIds: ['lotr'],
      },
      {
        point: 'Frodo offers Sam perspective and a share in something larger',
        detail:
          'Sam\u2019s imagination is repeatedly lifted by stories and by Frodo\u2019s example, so the dependence runs both ways: Frodo gives the journey meaning that sustains Sam in turn.',
        sourceIds: ['lotr'],
      },
      {
        point: 'The Ring isolates, friendship reconnects',
        detail:
          'The Ring works by isolating its bearer, and Sam\u2019s presence is the counter-force that keeps Frodo tethered to ordinary affection and identity.',
        sourceIds: ['lotr'],
      },
      {
        point: 'The Fellowship models loyalty beyond the pair',
        detail:
          'The company\u2019s willingness to accompany Frodo, and later alliances like that with Faramir\u2019s men, echo the same theme of commitment sustained under pressure.',
        sourceIds: ['lotr'],
      },
    ],
    counterarguments: [
      'A class-conscious reading notes that Sam\u2019s devotion to a social superior can be read as idealizing servant loyalty, which complicates any simple celebration of equality in the friendship.',
      'Some readers emphasize that Frodo\u2019s deepest burden is ultimately solitary and incommunicable, so friendship eases but does not truly solve his isolation.',
      'Others argue the true hero of the quest is Sam, which would invert the supposed mutuality and make the theme about unrecognized devotion rather than partnership.',
    ],
    discussionPrompt:
      'Is Sam\u2019s loyalty a freely chosen friendship or a hierarchically conditioned devotion, and does it matter which?',
    relatedThemeIds: ['pity-and-mercy', 'hope-and-despair', 'kingship-and-responsibility'],
  },
  {
    id: 'nature-and-industrialization',
    slug: 'nature-and-industrialization',
    name: 'Nature and Industrialization',
    summary:
      'Isengard\u2019s felled, reworked landscape stands against Fangorn\u2019s ancient forest, staging a conflict between domination of nature and reverence for it.',
    sourceIds: ['lotr', 'silmarillion', 'tolkien-letters', 'peter-jackson-lotr'],
    continuity: 'interpretation',
    tags: ['saruman', 'isengard', 'fangorn', 'ents', 'the-shire'],
    question: 'What does Isengard represent in contrast to Fangorn?',
    thesis:
      'The contrast is less a simple war of trees against machines than a study of two attitudes toward the living world: one that treats nature as raw material to be organized, and one that treats it as old, sentient and worth heeding.',
    evidence: [
      {
        point: 'Isengard is described as stripped and reorganized',
        detail:
          'The region around Orthanc is depicted as deforested, pitted and put to productive use, an image of industry imposed on land as Saruman pursues power.',
        sourceIds: ['lotr'],
      },
      {
        point: 'Fangorn is old, slow and aware',
        detail:
          'The forest and the Ents embody deep time and patient memory, and Treebeard speaks for a natural order that does not hurry and cannot be commanded.',
        sourceIds: ['lotr'],
      },
      {
        point: 'The Ents\u2019 march turns the conflict active',
        detail:
          'When the Ents move against Isengard, nature is shown not as passive scenery but as an agent capable of answering destruction, which complicates any reading of the forest as merely symbolic.',
        sourceIds: ['lotr'],
      },
      {
        point: 'Saruman\u2019s fall is a misuse of knowledge',
        detail:
          'Saruman begins as a scholar and craftsman rather than a mere brute, so his ruin suggests that the danger is prideful instrumental reason, not technology in itself.',
        sourceIds: ['lotr', 'silmarillion'],
      },
      {
        point: 'The Shire\u2019s later despoiling extends the theme homeward',
        detail:
          'The returning hobbits find their own land industrializing under Saruman\u2019s influence, showing that the conflict is not confined to distant war but reaches ordinary life.',
        sourceIds: ['lotr'],
      },
    ],
    counterarguments: [
      'One reading resists seeing this as anti-technology, since curing, building and craft are valued in the texts; on this view only domination and waste are condemned.',
      'Some readers argue the forest is presented just as ambivalently as industry, since Fangorn is dangerous and Old Man Willow is predatory, so "nature good, machine bad" oversimplifies.',
      'Others treat the theme as nostalgic for a pre-industrial order, a stance that can be criticized for romanticizing the past rather than analyzing it.',
    ],
    discussionPrompt:
      'Does the text condemn industry as such, or only the prideful drive to master living things?',
    relatedThemeIds: ['power-and-corruption', 'providence-and-free-will', 'kingship-and-responsibility'],
  },
  {
    id: 'providence-and-free-will',
    slug: 'providence-and-free-will',
    name: 'Providence and Free Will',
    summary:
      'The story repeatedly pairs deliberate choice with chance and coincidence, leaving the reader to wonder whether outcomes are guided by fate or assembled from free decisions.',
    sourceIds: ['lotr', 'hobbit', 'silmarillion', 'tolkien-letters'],
    continuity: 'interpretation',
    tags: ['gandalf', 'frodo', 'eucatastrophe', 'the-one-ring'],
    question: 'How do choice and unexpected events shape the story?',
    thesis:
      'Choices are depicted as genuinely meaningful, yet they are continually met by circumstances no one planned. The narrative keeps both claims alive, presenting a providence that works through freedom rather than replacing it.',
    evidence: [
      {
        point: 'Bilbo finds the Ring by apparent accident',
        detail:
          'The Ring is encountered through a stray fall and a dark passage in The Hobbit, an origin that later looks providential only in retrospect, so chance and purpose are hard to separate.',
        sourceIds: ['hobbit', 'lotr'],
      },
      {
        point: 'The Council chooses the least likely Ring-bearer',
        detail:
          'Frodo volunteers at the council, and the choice to send a hobbit rather than a great lord is a free decision on which the plot turns.',
        sourceIds: ['lotr'],
      },
      {
        point: 'Frodo\u2019s own mercy and Gollum\u2019s fall align',
        detail:
          'The destruction of the Ring results from Frodo\u2019s repeated choices plus Gollum\u2019s unforeseen stumble, a convergence that readers often call providential.',
        sourceIds: ['lotr'],
      },
      {
        point: 'Tolkien describes eucatastrophe and a higher order',
        detail:
          'In his letters and essays Tolkien writes of sudden joyous turns and of a story shaped behind apparent chance, supplying language for the providence side of the tension.',
        sourceIds: ['tolkien-letters'],
      },
      {
        point: 'The Music of the Ainur frames creation itself',
        detail:
          'The Silmarillion presents a world sung into being in which discord is woven into a larger harmony, a cosmological image of purpose working through apparent disorder.',
        sourceIds: ['silmarillion'],
      },
    ],
    counterarguments: [
      'A naturalistic reading explains the coincidences as narrative craft, so the text need not imply any literal providence at all.',
      'Some readers emphasize free will so strongly that they treat every seeming coincidence as the accumulated result of ordinary choices, leaving no room for fate.',
      'Others argue the text is simply inconsistent, mixing a religiously shaped providence with arbitrary luck, and that the tension is an unresolved feature rather than a designed theme.',
    ],
    discussionPrompt:
      'If the outcome depends on Gollum\u2019s stumble, can Frodo\u2019s choices still be said to have saved Middle-earth?',
    relatedThemeIds: ['pity-and-mercy', 'hope-and-despair', 'power-and-corruption'],
  },
  {
    id: 'kingship-and-responsibility',
    slug: 'kingship-and-responsibility',
    name: 'Kingship and Responsibility',
    summary:
      'Aragorn earns kingship through service, healing, restraint and humility, presenting rule as a duty owed to others rather than a prize to be seized.',
    sourceIds: ['lotr', 'silmarillion', 'unfinished-tales', 'tolkien-letters'],
    continuity: 'interpretation',
    tags: ['aragorn', 'gondor', 'denethor', 'stewards'],
    question: 'What makes Aragorn worthy of kingship?',
    thesis:
      'Aragorn\u2019s right to rule is bound to his willingness to serve and to wait. The text legitimizes him less by bloodline alone than by the character his long probation produces, and it contrasts him with rulers who claim authority without responsibility.',
    evidence: [
      {
        point: 'Aragorn serves in obscurity for years',
        detail:
          'Before claiming any throne Aragorn fights as a Ranger and a captain under other names, so his eventual kingship is earned through labor and patience rather than inheritance alone.',
        sourceIds: ['lotr', 'unfinished-tales'],
      },
      {
        point: 'Healing hands signal true kingship',
        detail:
          'Aragorn\u2019s skill at healing, tied to an old saying about the king\u2019s hands, presents authority as restorative and life-serving rather than merely commanding.',
        sourceIds: ['lotr'],
      },
      {
        point: 'He refuses the Ring',
        detail:
          'By not taking the Ring when it is offered, Aragorn demonstrates the self-restraint that a ruler in the text is expected to possess.',
        sourceIds: ['lotr'],
      },
      {
        point: 'Denethor and Saruman show authority misused',
        detail:
          'The proud steward and the wizard who want to rule without consent model the corruption of stewardship and power, sharpening the contrast with Aragorn.',
        sourceIds: ['lotr'],
      },
      {
        point: 'The line is tied to a claim of return, not conquest',
        detail:
          'Aragorn\u2019s claim is framed as the return of a rightful line and the renewal of a kingdom, an image of authority that is inherited and then justified by service.',
        sourceIds: ['lotr', 'silmarillion'],
      },
    ],
    counterarguments: [
      'A critical reading notes that Aragorn\u2019s legitimacy still rests on lineage, so the theme may ultimately endorse hereditary rule despite its emphasis on personal merit.',
      'Some readers see the ideal king as a wish-fulfilment figure, so the contrast with Denethor risks simplifying complex political reality into good and bad rulers.',
      'Others argue the text also questions kingship, since Denethor\u2019s despair and the Fall of N\u00famenor show that power concentrated in one person is inherently perilous.',
    ],
    discussionPrompt:
      'Is Aragorn worthy because of who he is, or because of what the kingship needs him to become?',
    relatedThemeIds: ['power-and-corruption', 'friendship-and-loyalty', 'grief-and-loss'],
  },
  {
    id: 'grief-and-loss',
    slug: 'grief-and-loss',
    name: 'Grief and Loss',
    summary:
      'The end of the Third Age brings many kinds of leaving, and the characters\u2019 varied responses to loss frame mourning as both a burden and a form of fidelity.',
    sourceIds: ['lotr', 'silmarillion', 'unfinished-tales', 'children-of-hurin'],
    continuity: 'interpretation',
    tags: ['galadriel', 'elrond', 'arwen', 'the-havens', 'turins'],
    question: 'How do characters respond to the passing of an age?',
    thesis:
      'Loss is presented not as a single event but as a long process of parting, and the story dignifies several responses to it, from open grief to quiet acceptance, without insisting that any one is the correct way to mourn.',
    evidence: [
      {
        point: 'The Elves\u2019 departure is a slow bereavement',
        detail:
          'The sailing into the West is portrayed as the end of an age and the withdrawal of a whole people, so the Elves experience loss at the scale of a civilization.',
        sourceIds: ['lotr'],
      },
      {
        point: 'Arwen\u2019s choice carries lifelong grief',
        detail:
          'Choosing a mortal life and love means accepting eventual separation from both her father and her people, which situates grief at the center of her fate.',
        sourceIds: ['lotr'],
      },
      {
        point: 'Mourning is sung and remembered',
        detail:
          'Laments and songs recur throughout the narratives, presenting grief as something publicly carried and shaped through memory rather than privately suppressed.',
        sourceIds: ['lotr', 'silmarillion'],
      },
      {
        point: 'First Age tragedy explores ruinous grief',
        detail:
          'The tale of T\u00farin and his family presents loss compounding into desperation, showing how grief can curdle into self-destruction when it has no outlet.',
        sourceIds: ['children-of-hurin', 'silmarillion'],
      },
      {
        point: 'The hobbits\u2019 return is bittersweet',
        detail:
          'The Scouring of the Shire and the survivors\u2019 altered home life show that even victory brings irrecoverable change, so the ending resists pure consolation.',
        sourceIds: ['lotr'],
      },
    ],
    counterarguments: [
      'One reading argues the text finally subordinates grief to a consoling providence, so losses are ultimately redeemed and mourning is tempered.',
      'A contrasting view holds that the ending is genuinely unresolved, with Frodo\u2019s departure and the Elves\u2019 exile leaving no adequate comfort at all.',
      'Some readers focus on how different characters grieve differently, suggesting the theme is about plural responses rather than one shared lesson about loss.',
    ],
    discussionPrompt:
      'Is the departure into the West a consolation or a defeat, and whose grief does the ending mainly serve?',
    relatedThemeIds: ['mortality-and-immortality', 'hope-and-despair', 'kingship-and-responsibility'],
  },
  {
    id: 'hope-and-despair',
    slug: 'hope-and-despair',
    name: 'Hope and Despair',
    summary:
      'Characters repeatedly act without assurance of success, and the story treats defiant hope, small kindness and stubborn perseverance as meaningful even when victory looks impossible.',
    sourceIds: ['lotr', 'hobbit', 'silmarillion', 'tolkien-letters'],
    continuity: 'interpretation',
    tags: ['sam', 'frodo', 'gandalf', 'eowyn', 'eucatastrophe'],
    question: 'Why do seemingly hopeless acts still matter?',
    thesis:
      'Hope in the legendarium is rarely certainty; it is a choice to act well without a guarantee. The narrative honors desperate perseverance, courage against the odds and small goods done at the end of the world.',
    evidence: [
      {
        point: 'The quest is undertaken against unlikely odds',
        detail:
          'The Council knows the Ring should be destroyed and yet acknowledges how improbable success is, so the decision to try is itself an act of hope.',
        sourceIds: ['lotr'],
      },
      {
        point: 'Sam\u2019s hope is concrete and daily',
        detail:
          'Sam keeps hope alive through ordinary care, food and refusal to abandon Frodo, presenting hope as practical endurance rather than grand optimism.',
        sourceIds: ['lotr'],
      },
      {
        point: 'Despair is dramatized as a temptation',
        detail:
          'Denethor\u2019s defeatism and the lure of the Ring\u2019s offers to remove all uncertainty show despair as a seductive conclusion that the enemy can exploit.',
        sourceIds: ['lotr'],
      },
      {
        point: 'Courage appears in the least powerful',
        detail:
          '\u00c9owyn and Merry act at great risk when the cause appears lost, and the story frames their deeds as valuable regardless of their apparent futility.',
        sourceIds: ['lotr'],
      },
      {
        point: 'Tolkien\u2019s idea of eucatastrophe names the turn',
        detail:
          'The author\u2019s reflections on sudden joyous reversals support reading the theme as an embrace of hope that survives even the edge of ruin.',
        sourceIds: ['tolkien-letters'],
      },
    ],
    counterarguments: [
      'A pessimistic reading notes that the good outcome depends on accident and mercy, which may undercut the claim that hope itself accomplishes anything.',
      'Some readers argue the text\u2019s hope presupposes a providence, so without that framework the same acts might be simply desperate rather than meaningful.',
      'Others contend the story acknowledges hope\u2019s dark twin, since even after victory Frodo is wounded and the Elves depart, so hope is not treated as unqualified triumph.',
    ],
    discussionPrompt:
      'If hope is not certainty, what distinguishes it from wishful thinking—and does the story ever settle the question?',
    relatedThemeIds: ['providence-and-free-will', 'pity-and-mercy', 'grief-and-loss'],
  },
];
