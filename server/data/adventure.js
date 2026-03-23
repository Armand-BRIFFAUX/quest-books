export const adventure = {
  id: 1,
  title: "La Crypte du Roi Oublié",
  description:
    "On raconte qu'un ancien roi a été enterré avec son trésor dans une crypte oubliée au cœur de la forêt de Sombrebois. Quatre épreuves vous attendent : la Forêt Maudite, les Cavernes Souterraines, le Village des Ombres et la Crypte elle-même. Personne n'en est jamais revenu...",
  startChapterId: 1,
};

// ============================================
// OBJETS
// ============================================
export const items = [
  // --- Potions ---
  {
    id: 1,
    name: "Petite potion de soin",
    description: "Restaure 6 points de vie",
    type: "potion",
    effect: { type: "heal", value: 6 },
  },
  {
    id: 2,
    name: "Potion de soin",
    description: "Restaure 10 points de vie",
    type: "potion",
    effect: { type: "heal", value: 10 },
  },
  {
    id: 3,
    name: "Grande potion de soin",
    description: "Restaure 16 points de vie",
    type: "potion",
    effect: { type: "heal", value: 16 },
  },
  {
    id: 4,
    name: "Élixir du phénix",
    description: "Restaure 25 points de vie",
    type: "potion",
    effect: { type: "heal", value: 25 },
  },
  {
    id: 5,
    name: "Fiole de vigueur",
    description: "Restaure 8 points de vie",
    type: "potion",
    effect: { type: "heal", value: 8 },
  },
  // --- Armes ---
  {
    id: 10,
    name: "Dague rouillée",
    description: "Augmente votre attaque de 2",
    type: "equipment",
    slot: "weapon",
    effect: { type: "attack", value: 2 },
  },
  {
    id: 11,
    name: "Épée du forestier",
    description: "Augmente votre attaque de 3",
    type: "equipment",
    slot: "weapon",
    effect: { type: "attack", value: 3 },
  },
  {
    id: 12,
    name: "Lame d'ombre",
    description: "Augmente votre attaque de 5",
    type: "equipment",
    slot: "weapon",
    effect: { type: "attack", value: 5 },
  },
  {
    id: 13,
    name: "Épée du Roi Oublié",
    description: "Augmente votre attaque de 7",
    type: "equipment",
    slot: "weapon",
    effect: { type: "attack", value: 7 },
  },
  // --- Armures ---
  {
    id: 20,
    name: "Amulette du voyageur",
    description: "Augmente votre défense de 2",
    type: "equipment",
    slot: "armor",
    effect: { type: "defense", value: 2 },
  },
  {
    id: 21,
    name: "Bouclier de bois",
    description: "Augmente votre défense de 3",
    type: "equipment",
    slot: "armor",
    effect: { type: "defense", value: 3 },
  },
  {
    id: 22,
    name: "Cotte de mailles",
    description: "Augmente votre défense de 4",
    type: "equipment",
    slot: "armor",
    effect: { type: "defense", value: 4 },
  },
  {
    id: 23,
    name: "Armure du Gardien",
    description: "Augmente votre défense de 6",
    type: "equipment",
    slot: "armor",
    effect: { type: "defense", value: 6 },
  },
];

// ============================================
// CHAPITRES
// ============================================
// Acte 1 : La Forêt de Sombrebois (1-25)
// Acte 2 : Les Cavernes Souterraines (26-50)
// Acte 3 : Le Village des Ombres (51-75)
// Acte 4 : La Crypte du Roi Oublié (76-100)
// ============================================

export const chapters = [
  // ========================================
  //  ACTE 1 — LA FORÊT DE SOMBREBOIS
  // ========================================
  {
    id: 1,
    title: "L'orée de la forêt",
    text: "Vous vous tenez à l'entrée de la forêt de Sombrebois. Les arbres sont si denses que la lumière du soleil peine à percer le feuillage. Un sentier étroit s'enfonce dans l'obscurité. À votre droite, un vieux panneau en bois à moitié pourri indique : « Danger — Demi-tour conseillé ». L'air est lourd, chargé d'une odeur de mousse et de terre humide.",
    choices: [
      { id: 1, text: "Suivre le sentier principal", nextChapterId: 2 },
      { id: 2, text: "Contourner par la rivière", nextChapterId: 3 },
      { id: 3, text: "Explorer les fourrés à gauche", nextChapterId: 4 },
    ],
  },
  {
    id: 2,
    title: "Le sentier obscur",
    text: "Vous avancez prudemment sur le sentier. Au bout de quelques minutes, vous entendez un grognement sourd derrière les buissons. Une paire d'yeux jaunes vous fixe dans l'obscurité. Un loup énorme se dresse devant vous, babines retroussées.",
    choices: [
      { id: 4, text: "Tirer votre épée et combattre", nextChapterId: 5 },
      { id: 5, text: "Reculer lentement sans geste brusque", nextChapterId: 6 },
      { id: 6, text: "Grimper à l'arbre le plus proche", nextChapterId: 7 },
    ],
  },
  {
    id: 3,
    title: "La rivière murmurante",
    text: "Vous longez la rivière. L'eau est claire et le bruit du courant est apaisant. Après une dizaine de minutes, vous découvrez un petit pont de pierre. De l'autre côté, vous apercevez l'entrée d'une grotte. Juste avant le pont, un vieil homme est assis sur un rocher. Il vous regarde approcher avec un sourire édenté.",
    choices: [
      { id: 7, text: "Parler au vieil homme", nextChapterId: 8 },
      {
        id: 8,
        text: "Ignorer le vieil homme et traverser le pont",
        nextChapterId: 9,
      },
      { id: 9, text: "Examiner la rivière de plus près", nextChapterId: 10 },
    ],
  },
  {
    id: 4,
    title: "Les fourrés mystérieux",
    text: "Vous écartez les branches épineuses et découvrez un petit camp abandonné. Un sac à dos moisi repose contre un tronc d'arbre. À l'intérieur, vous trouvez une dague rouillée mais encore tranchante, ainsi qu'une petite fiole remplie d'un liquide rougeâtre.",
    loot: [10, 1],
    choices: [
      { id: 10, text: "Rejoindre le sentier principal", nextChapterId: 2 },
      { id: 11, text: "Continuer à explorer les fourrés", nextChapterId: 11 },
    ],
  },
  {
    id: 5,
    title: "Le combat contre le loup",
    text: "Le loup bondit vers vous, babines retroussées. Vous dégainez votre épée. Il va falloir vous battre !",
    type: "combat",
    enemy: {
      name: "Loup de Sombrebois",
      hp: 12,
      attack: 4,
      defense: 2,
    },
    onVictory: {
      text: "Le loup s'effondre avec un dernier gémissement. En fouillant les alentours, vous découvrez les restes d'un voyageur moins chanceux. Parmi ses affaires, une potion de soin et une amulette brillante.",
      loot: [2, 20],
      choices: [
        { id: 12, text: "Continuer sur le sentier", nextChapterId: 12 },
        {
          id: 13,
          text: "Quitter le sentier vers la rivière",
          nextChapterId: 3,
        },
      ],
    },
    onDefeat: {
      text: "Le loup est trop puissant. Ses crocs se referment sur votre bras...",
      nextChapterId: 100,
    },
  },
  {
    id: 6,
    title: "Une retraite prudente",
    text: "Vous reculez lentement, les yeux fixés sur le loup. La bête grogne mais ne vous poursuit pas. Vous atteignez un embranchement que vous n'aviez pas remarqué. Un chemin descend vers une clairière, l'autre mène vers des rochers escarpés.",
    choices: [
      { id: 14, text: "Descendre vers la clairière", nextChapterId: 13 },
      { id: 15, text: "Grimper vers les rochers", nextChapterId: 14 },
    ],
  },
  {
    id: 7,
    title: "Refuge dans les branches",
    text: "Vous grimpez à l'arbre juste à temps. Le loup tourne en rond en contrebas, frustré. Depuis votre perchoir, vous apercevez une lueur étrange au loin, entre les arbres. Après une longue attente, le loup finit par s'en aller.",
    choices: [
      { id: 16, text: "Suivre la lueur mystérieuse", nextChapterId: 15 },
      {
        id: 17,
        text: "Redescendre et continuer sur le sentier",
        nextChapterId: 12,
      },
    ],
  },
  {
    id: 8,
    title: "L'énigme du vieil homme",
    text: "Le vieil homme vous observe attentivement. « Beaucoup passent par ici, peu en reviennent », dit-il d'une voix rauque. « Je vous propose un marché. Résolvez mon énigme et je vous donnerai quelque chose d'utile. Échouez, et vous devrez prendre le chemin le plus dangereux. » Il se racle la gorge : « Je n'ai ni bouche ni poumons, pourtant je rugis. Je n'ai ni vie ni âme, pourtant je grandis. Qui suis-je ? »",
    choices: [
      { id: 18, text: "Répondre : Le feu", nextChapterId: 16 },
      { id: 19, text: "Répondre : Le vent", nextChapterId: 9 },
      { id: 20, text: "Répondre : La rivière", nextChapterId: 9 },
    ],
  },
  {
    id: 9,
    title: "Le pont maudit",
    text: "Vous traversez le pont en ignorant les avertissements. À mi-chemin, la pierre se fissure sous vos pas. Le pont cède brutalement ! Vous parvenez de justesse à vous accrocher au rebord. Avec un effort surhumain, vous vous hissez de l'autre côté, mais vous êtes blessé.",
    choices: [
      { id: 21, text: "Boiter vers la grotte", nextChapterId: 17 },
      { id: 22, text: "Longer la falaise vers le nord", nextChapterId: 18 },
    ],
  },
  {
    id: 10,
    title: "Le reflet dans l'eau",
    text: "En vous penchant sur la rivière, vous remarquez quelque chose de brillant au fond de l'eau. Vous plongez la main et en retirez un petit bouclier de bois gravé de runes anciennes. Il est léger mais semble solide.",
    loot: [21],
    choices: [
      { id: 23, text: "Parler au vieil homme", nextChapterId: 8 },
      { id: 24, text: "Traverser le pont", nextChapterId: 9 },
    ],
  },
  {
    id: 11,
    title: "Le nid de serpents",
    text: "Plus profondément dans les fourrés, vous tombez sur un nid de serpents venimeux. L'un d'eux vous mord au mollet avant que vous puissiez réagir. La douleur est vive mais supportable. Vous reculez précipitamment.",
    choices: [
      {
        id: 25,
        text: "Rejoindre le sentier principal en boitant",
        nextChapterId: 2,
      },
    ],
  },
  {
    id: 12,
    title: "La croisée des chemins",
    text: "Le sentier débouche sur une clairière. Trois chemins s'offrent à vous. Un panneau de bois gravé indique : à gauche « Les Cavernes », tout droit « Le Village », à droite « Le Marais ». Des traces de pas récentes mènent vers les cavernes.",
    choices: [
      { id: 26, text: "Prendre le chemin des Cavernes", nextChapterId: 26 },
      { id: 27, text: "Aller vers le Village", nextChapterId: 51 },
      { id: 28, text: "S'aventurer dans le Marais", nextChapterId: 19 },
    ],
  },
  {
    id: 13,
    title: "La clairière enchantée",
    text: "La clairière est baignée d'une lumière dorée irréelle. Au centre, un autel de pierre est couvert de mousse. Une épée est plantée dans la pierre, sa lame encore brillante malgré les années. Une inscription dit : « Seul celui qui en est digne pourra me retirer. »",
    choices: [
      { id: 29, text: "Essayer de retirer l'épée", nextChapterId: 20 },
      {
        id: 30,
        text: "Examiner l'autel sans toucher l'épée",
        nextChapterId: 21,
      },
      { id: 31, text: "Quitter la clairière", nextChapterId: 12 },
    ],
  },
  {
    id: 14,
    title: "Les rochers escarpés",
    text: "L'escalade est difficile mais vous atteignez un promontoire rocheux. De là-haut, vous avez une vue imprenable sur la forêt. Vous repérez la fumée d'un village au nord-est et l'entrée sombre de cavernes à l'ouest. Plus près, vous apercevez un faucon posé sur un rocher, une petite sacoche attachée à sa patte.",
    choices: [
      { id: 32, text: "Examiner le faucon", nextChapterId: 22 },
      { id: 33, text: "Descendre vers les cavernes", nextChapterId: 26 },
      { id: 34, text: "Se diriger vers le village", nextChapterId: 51 },
    ],
  },
  {
    id: 15,
    title: "Le feu follet",
    text: "La lueur vous guide à travers les arbres. C'est un feu follet, une petite sphère de lumière bleutée qui danse dans l'air. Il semble vouloir vous montrer quelque chose. Après plusieurs minutes de marche, vous arrivez devant un arbre creux géant.",
    choices: [
      { id: 35, text: "Entrer dans l'arbre creux", nextChapterId: 23 },
      {
        id: 36,
        text: "Ne pas faire confiance au feu follet",
        nextChapterId: 12,
      },
    ],
  },
  {
    id: 16,
    title: "La récompense du sage",
    text: "Le vieil homme éclate de rire. « Bien joué, jeune aventurier ! Le feu, bien sûr. » Il fouille dans sa besace et en sort une épée magnifique. « Ceci appartenait à un forestier qui protégeait ces bois autrefois. Puisse-t-elle vous servir aussi bien. » Il vous tend également une fiole de soin.",
    loot: [11, 2],
    choices: [
      {
        id: 37,
        text: "Remercier le vieil homme et traverser le pont",
        nextChapterId: 24,
      },
      {
        id: 38,
        text: "Demander au vieil homme d'autres conseils",
        nextChapterId: 25,
      },
    ],
  },
  {
    id: 17,
    title: "La grotte humide",
    text: "La grotte est sombre et humide. Des stalactites pendent du plafond. Vous avancez à tâtons quand soudain, une chauve-souris géante fond sur vous !",
    type: "combat",
    enemy: {
      name: "Chauve-souris géante",
      hp: 8,
      attack: 3,
      defense: 1,
    },
    onVictory: {
      text: "La chauve-souris s'effondre. Au fond de la grotte, vous découvrez un passage qui descend vers les profondeurs. Une potion gît au sol.",
      loot: [1],
      choices: [
        { id: 39, text: "Descendre dans le passage", nextChapterId: 26 },
        { id: 40, text: "Ressortir de la grotte", nextChapterId: 18 },
      ],
    },
    onDefeat: {
      text: "La chauve-souris est plus vicieuse que prévu. Ses griffes acérées vous lacèrent le visage...",
      nextChapterId: 100,
    },
  },
  {
    id: 18,
    title: "La falaise venteuse",
    text: "Vous longez la falaise battue par les vents. Le chemin est étroit et dangereux. En contrebas, vous apercevez l'entrée des cavernes. Un escalier taillé à même la roche descend vers elles.",
    choices: [
      { id: 41, text: "Descendre l'escalier de pierre", nextChapterId: 26 },
      { id: 42, text: "Continuer le long de la falaise", nextChapterId: 51 },
    ],
  },
  {
    id: 19,
    title: "Le marais empoisonné",
    text: "Le marais est un piège mortel. Chaque pas vous enfonce un peu plus dans la boue. Des vapeurs toxiques s'élèvent de l'eau stagnante. Vous apercevez un tronc d'arbre qui pourrait servir de pont improvisé, mais aussi une créature tapie dans les roseaux.",
    choices: [
      { id: 43, text: "Traverser sur le tronc d'arbre", nextChapterId: 26 },
      { id: 44, text: "Affronter la créature du marais", nextChapterId: 27 },
      { id: 45, text: "Rebrousser chemin", nextChapterId: 12 },
    ],
  },
  {
    id: 20,
    title: "L'épreuve de l'épée",
    text: "Vous saisissez la poignée de l'épée. Une énergie puissante parcourt votre bras. La lame vibre puis... se libère de la pierre dans un éclat de lumière ! C'est l'Épée du Forestier, une arme légendaire.",
    loot: [11],
    choices: [{ id: 46, text: "Reprendre votre chemin", nextChapterId: 12 }],
  },
  {
    id: 21,
    title: "Les inscriptions anciennes",
    text: "L'autel est couvert de runes que vous ne pouvez pas lire. Cependant, vous remarquez un compartiment secret sur le côté. À l'intérieur, une potion de soin et un parchemin qui indique un passage secret dans les cavernes.",
    loot: [2],
    choices: [
      { id: 47, text: "Tenter de retirer l'épée", nextChapterId: 20 },
      {
        id: 48,
        text: "Reprendre votre chemin avec le parchemin",
        nextChapterId: 12,
      },
    ],
  },
  {
    id: 22,
    title: "Le faucon messager",
    text: "Le faucon vous laisse approcher. La sacoche contient un message : « La clé de la crypte est gardée par le Seigneur des Ombres dans le village maudit. N'y allez pas seul. » Sous le message, une petite potion est soigneusement emballée.",
    loot: [5],
    choices: [
      { id: 49, text: "Descendre vers les cavernes", nextChapterId: 26 },
      { id: 50, text: "Se diriger vers le village", nextChapterId: 51 },
    ],
  },
  {
    id: 23,
    title: "Le cœur de l'arbre",
    text: "L'intérieur de l'arbre est plus grand qu'il ne devrait l'être. Des champignons lumineux éclairent un petit espace où repose un coffre en bois ancien. À l'intérieur : une cotte de mailles d'une finesse remarquable et une grande potion de soin.",
    loot: [22, 3],
    choices: [
      { id: 51, text: "Ressortir et reprendre votre route", nextChapterId: 12 },
    ],
  },
  {
    id: 24,
    title: "De l'autre côté du pont",
    text: "Le pont tient bon sous vos pas cette fois. De l'autre côté, le paysage change. La forêt est plus clairsemée et vous entendez le bruit sourd de marteaux sur l'enclume au loin. Deux chemins s'offrent à vous : les cavernes souterraines ou le village.",
    choices: [
      { id: 52, text: "Explorer les cavernes", nextChapterId: 26 },
      { id: 53, text: "Se diriger vers le village", nextChapterId: 51 },
    ],
  },
  {
    id: 25,
    title: "Les conseils du sage",
    text: "Le vieil homme vous regarde gravement. « Écoutez bien. Dans les cavernes, méfiez-vous de l'eau noire. Au village, ne faites confiance à personne après la tombée de la nuit. Et dans la crypte... le Roi n'est pas tout à fait mort. » Il disparaît dans un nuage de fumée, ne laissant qu'une fiole derrière lui.",
    loot: [5],
    choices: [{ id: 54, text: "Traverser le pont", nextChapterId: 24 }],
  },

  // ========================================
  //  ACTE 2 — LES CAVERNES SOUTERRAINES
  // ========================================
  {
    id: 26,
    title: "L'entrée des cavernes",
    text: "L'obscurité vous engloutit dès les premiers pas. L'air est frais et sent la terre. Votre torche éclaire des parois humides couvertes de cristaux qui scintillent faiblement. Le passage se divise en deux : un tunnel étroit d'où provient un courant d'air, et un large corridor d'où s'élève un grondement sourd.",
    choices: [
      { id: 55, text: "Prendre le tunnel étroit", nextChapterId: 28 },
      { id: 56, text: "Suivre le large corridor", nextChapterId: 29 },
      { id: 57, text: "Examiner les cristaux sur les murs", nextChapterId: 30 },
    ],
  },
  {
    id: 27,
    title: "La créature du marais",
    text: "Un troll des marais émerge de l'eau boueuse ! Sa peau verdâtre est couverte de vase et ses yeux rouges brillent de malveillance.",
    type: "combat",
    enemy: {
      name: "Troll des marais",
      hp: 16,
      attack: 5,
      defense: 3,
    },
    onVictory: {
      text: "Le troll s'effondre dans la boue avec un gargouillis répugnant. Dans son repaire, vous trouvez une lame sombre d'une beauté sinistre et une grande potion.",
      loot: [12, 3],
      choices: [
        { id: 58, text: "Continuer vers les cavernes", nextChapterId: 26 },
      ],
    },
    onDefeat: {
      text: "Le troll vous attrape et vous entraîne dans les profondeurs du marais...",
      nextChapterId: 100,
    },
  },
  {
    id: 28,
    title: "Le tunnel des murmures",
    text: "Le tunnel est si étroit que vous devez ramper par endroits. Des murmures étranges résonnent autour de vous, comme des voix lointaines. Soudain, le tunnel s'élargit et vous débouchez dans une salle souterraine illuminée par des champignons géants bioluminescents.",
    choices: [
      { id: 59, text: "Explorer la salle aux champignons", nextChapterId: 31 },
      { id: 60, text: "Suivre les murmures", nextChapterId: 32 },
    ],
  },
  {
    id: 29,
    title: "Le corridor grondant",
    text: "Le grondement s'intensifie à mesure que vous avancez. Vous débouchez sur un immense gouffre souterrain. Un pont de pierre naturel enjambe le vide. Tout en bas, une rivière de lave rougeoie faiblement. Au milieu du pont, une silhouette massive bloque le passage.",
    choices: [
      { id: 61, text: "Approcher de la silhouette", nextChapterId: 33 },
      { id: 62, text: "Chercher un autre passage", nextChapterId: 34 },
    ],
  },
  {
    id: 30,
    title: "Les cristaux enchantés",
    text: "En touchant un cristal, il émet une douce mélodie et une lumière chaude. Vous vous sentez revigoré. Un cristal plus gros que les autres semble contenir quelque chose...",
    loot: [1],
    choices: [
      { id: 63, text: "Briser le gros cristal", nextChapterId: 35 },
      { id: 64, text: "Laisser le cristal et continuer", nextChapterId: 28 },
    ],
  },
  {
    id: 31,
    title: "La forêt de champignons",
    text: "Les champignons géants forment une forêt souterraine surréaliste. Leurs spores flottent dans l'air comme des flocons de neige lumineux. Au centre, un lac souterrain d'une eau parfaitement transparente. Quelque chose brille au fond.",
    choices: [
      { id: 65, text: "Plonger dans le lac", nextChapterId: 36 },
      { id: 66, text: "Contourner le lac", nextChapterId: 37 },
      { id: 67, text: "Manger un des champignons", nextChapterId: 38 },
    ],
  },
  {
    id: 32,
    title: "La salle des échos",
    text: "Les murmures vous mènent à une salle circulaire. Les murs sont couverts de fresques anciennes représentant un roi couronné descendant dans les profondeurs de la terre. Au centre, un piédestal avec un levier. Les fresques semblent indiquer que le levier ouvre un passage secret.",
    choices: [
      { id: 68, text: "Tirer le levier", nextChapterId: 39 },
      { id: 69, text: "Étudier les fresques d'abord", nextChapterId: 40 },
    ],
  },
  {
    id: 33,
    title: "Le Golem de pierre",
    text: "La silhouette est un golem de pierre, un gardien ancien animé par la magie. Ses yeux s'allument d'une lueur rouge quand il vous détecte. « HALTE. NUL NE PASSE. » Sa voix résonne comme un tremblement de terre.",
    type: "combat",
    enemy: {
      name: "Golem de pierre",
      hp: 22,
      attack: 6,
      defense: 5,
    },
    onVictory: {
      text: "Le golem s'effondre en morceaux. Parmi les débris, vous récupérez l'armure du Gardien, forgée dans la roche enchantée, et un élixir puissant.",
      loot: [23, 4],
      choices: [
        { id: 70, text: "Traverser le pont de pierre", nextChapterId: 41 },
      ],
    },
    onDefeat: {
      text: "Le poing du golem vous frappe comme un boulet de canon, vous projetant dans le vide...",
      nextChapterId: 100,
    },
  },
  {
    id: 34,
    title: "Le passage dérobé",
    text: "Vous trouvez une fissure dans la paroi, juste assez large pour vous faufiler. De l'autre côté, un escalier en colimaçon descend dans les profondeurs. L'air est plus chaud ici.",
    choices: [
      { id: 71, text: "Descendre l'escalier", nextChapterId: 42 },
      { id: 72, text: "Retourner affronter la silhouette", nextChapterId: 33 },
    ],
  },
  {
    id: 35,
    title: "Le trésor dans le cristal",
    text: "Le cristal se brise avec un son mélodieux. À l'intérieur, vous trouvez une potion de soin parfaitement conservée et une petite clé en cristal.",
    loot: [2],
    choices: [
      { id: 73, text: "Continuer dans les cavernes", nextChapterId: 28 },
    ],
  },
  {
    id: 36,
    title: "Les profondeurs du lac",
    text: "L'eau est glaciale mais vous parvenez à atteindre le fond. L'objet brillant est un médaillon ancien qui pulse d'énergie. En remontant, vous êtes attaqué par une anguille géante !",
    type: "combat",
    enemy: {
      name: "Anguille des profondeurs",
      hp: 14,
      attack: 5,
      defense: 2,
    },
    onVictory: {
      text: "L'anguille s'enfuit dans les ténèbres. Le médaillon brille dans votre main et vous sentez une vague de chaleur curative.",
      loot: [3],
      choices: [{ id: 74, text: "Continuer l'exploration", nextChapterId: 37 }],
    },
    onDefeat: {
      text: "L'anguille s'enroule autour de vous et vous entraîne dans les profondeurs du lac...",
      nextChapterId: 100,
    },
  },
  {
    id: 37,
    title: "La sortie des champignons",
    text: "En contournant le lac, vous trouvez un passage ascendant. Les champignons se font plus rares et l'air devient plus sec. Vous débouchez dans un large tunnel qui mène vers deux directions.",
    choices: [
      {
        id: 75,
        text: "Aller à gauche (courant d'air frais)",
        nextChapterId: 41,
      },
      { id: 76, text: "Aller à droite (lueur orangée)", nextChapterId: 42 },
    ],
  },
  {
    id: 38,
    title: "Le champignon hallucinogène",
    text: "Le champignon a un goût amer. Votre vision se trouble et le monde se déforme. Vous voyez des couleurs impossibles et entendez des voix qui chantent. Quand vous reprenez vos esprits, vous êtes dans une salle que vous ne reconnaissez pas, mais vous vous sentez étrangement revigoré.",
    loot: [5],
    choices: [
      { id: 77, text: "Explorer cette nouvelle salle", nextChapterId: 39 },
    ],
  },
  {
    id: 39,
    title: "Le passage secret",
    text: "Un mécanisme s'active et une section du mur pivote, révélant un escalier descendant. Des torches magiques s'allument une à une, éclairant le chemin. L'air est chargé d'une énergie ancienne.",
    choices: [{ id: 78, text: "Descendre", nextChapterId: 42 }],
  },
  {
    id: 40,
    title: "La leçon des fresques",
    text: "Les fresques racontent l'histoire du Roi Oublié. Il était un souverain juste qui a sacrifié sa vie pour protéger son peuple d'un fléau démoniaque. En scellant le démon dans la crypte, il s'y est enfermé avec lui. La fresque finale montre une épée plantée dans un trône. Vous comprenez que seule cette épée peut vaincre le Roi devenu gardien.",
    choices: [
      { id: 79, text: "Tirer le levier maintenant", nextChapterId: 39 },
      {
        id: 80,
        text: "Mémoriser les fresques et continuer",
        nextChapterId: 41,
      },
    ],
  },
  {
    id: 41,
    title: "La salle du courant d'air",
    text: "Le courant d'air provient d'une ouverture dans la paroi. En vous faufilant, vous débouchez à l'extérieur, sur le flanc d'une colline. Le paysage est désolé. En contrebas, un village aux toits sombres s'étend dans une vallée brumeuse. Des lumières vacillent aux fenêtres.",
    choices: [
      { id: 81, text: "Descendre vers le village", nextChapterId: 51 },
      { id: 82, text: "Retourner dans les cavernes", nextChapterId: 42 },
    ],
  },
  {
    id: 42,
    title: "La forge abandonnée",
    text: "Vous découvrez une ancienne forge souterraine. Le feu est éteint depuis longtemps mais les outils sont encore en bon état. Sur l'enclume, une lame inachevée brille d'un éclat surnaturel. Au fond, un passage mène plus profondément sous terre.",
    choices: [
      { id: 83, text: "Examiner la lame sur l'enclume", nextChapterId: 43 },
      { id: 84, text: "Continuer vers le fond", nextChapterId: 44 },
      {
        id: 85,
        text: "Chercher des provisions dans la forge",
        nextChapterId: 45,
      },
    ],
  },
  {
    id: 43,
    title: "La Lame d'Ombre",
    text: "En touchant la lame, elle s'illumine d'un éclat violet sombre. C'est la légendaire Lame d'Ombre, une épée capable de trancher les ténèbres elles-mêmes. Elle semble se réjouir d'être maniée à nouveau.",
    loot: [12],
    choices: [
      { id: 86, text: "Continuer plus profondément", nextChapterId: 44 },
    ],
  },
  {
    id: 44,
    title: "Le carrefour souterrain",
    text: "Un carrefour à trois voies s'offre à vous. Des inscriptions gravées dans la pierre indiquent les directions. À gauche : « Le Village des Ombres ». Tout droit : « Les Profondeurs ». À droite : « La Surface ».",
    choices: [
      { id: 87, text: "Aller vers le Village des Ombres", nextChapterId: 51 },
      { id: 88, text: "S'enfoncer dans les Profondeurs", nextChapterId: 46 },
      { id: 89, text: "Remonter vers la surface", nextChapterId: 12 },
    ],
  },
  {
    id: 45,
    title: "Les réserves du forgeron",
    text: "Vous trouvez un coffre contenant des provisions séchées et deux potions soigneusement rangées.",
    loot: [1, 2],
    choices: [
      { id: 90, text: "Examiner la lame sur l'enclume", nextChapterId: 43 },
      { id: 91, text: "Continuer vers le fond", nextChapterId: 44 },
    ],
  },
  {
    id: 46,
    title: "Les araignées des profondeurs",
    text: "Les profondeurs sont tapissées de toiles d'araignées géantes. Une araignée monstrueuse descend silencieusement du plafond, ses huit yeux fixés sur vous !",
    type: "combat",
    enemy: {
      name: "Araignée des profondeurs",
      hp: 18,
      attack: 6,
      defense: 3,
    },
    onVictory: {
      text: "L'araignée se recroqueville dans un dernier spasme. Dans ses toiles, vous trouvez les restes d'un aventurier portant un équipement précieux et un élixir.",
      loot: [4, 22],
      choices: [
        { id: 92, text: "Continuer dans les profondeurs", nextChapterId: 47 },
      ],
    },
    onDefeat: {
      text: "L'araignée vous enveloppe dans ses toiles. Le venin fait son effet rapidement...",
      nextChapterId: 100,
    },
  },
  {
    id: 47,
    title: "La porte scellée",
    text: "Au bout d'un long couloir, vous trouvez une immense porte de pierre scellée par des runes lumineuses. C'est l'entrée arrière de la Crypte du Roi Oublié. Les runes semblent réagir à votre présence. La porte gronde et commence lentement à s'ouvrir.",
    choices: [
      { id: 93, text: "Entrer dans la crypte", nextChapterId: 76 },
      {
        id: 94,
        text: "Se préparer d'abord (explorer le village)",
        nextChapterId: 51,
      },
    ],
  },

  // ========================================
  //  ACTE 3 — LE VILLAGE DES OMBRES
  // ========================================
  {
    id: 51,
    title: "Le Village des Ombres",
    text: "Le village est enveloppé d'un brouillard permanent. Les maisons sont délabrées mais habitées. Des visages pâles vous observent derrière les volets. Au centre du village, une fontaine tarie et une auberge dont l'enseigne grince au vent : « L'Épée Brisée ». Un forgeron travaille encore dans son atelier, malgré l'atmosphère sinistre.",
    choices: [
      { id: 95, text: "Entrer dans l'auberge", nextChapterId: 52 },
      { id: 96, text: "Parler au forgeron", nextChapterId: 53 },
      { id: 97, text: "Explorer les ruelles sombres", nextChapterId: 54 },
    ],
  },
  {
    id: 52,
    title: "L'auberge L'Épée Brisée",
    text: "L'intérieur est sombre et enfumé. Quelques buveurs silencieux sont attablés. L'aubergiste, une femme massive aux bras tatoués, vous dévisage. « Un voyageur. Rare, par ici. Je suis Helga. Si vous voulez survivre, vous avez besoin d'informations. Ça coûte une bonne histoire... ou un combat dans l'arène en bas. »",
    choices: [
      { id: 98, text: "Raconter votre aventure", nextChapterId: 55 },
      { id: 99, text: "Accepter le combat dans l'arène", nextChapterId: 56 },
      { id: 100, text: "Demander simplement une chambre", nextChapterId: 57 },
    ],
  },
  {
    id: 53,
    title: "Le forgeron maudit",
    text: "Le forgeron est un homme imposant à la barbe grise. Il frappe le métal avec une régularité hypnotique. « Je suis Thorin. Autrefois, je forgeais les armes du roi. Maintenant, je forge pour survivre. » Il vous regarde. « Je peux améliorer votre équipement, mais j'ai besoin d'un minerai spécial qu'on ne trouve que dans les cavernes. Vous m'en rapportez, je vous forge quelque chose d'exceptionnel. »",
    choices: [
      {
        id: 101,
        text: "Accepter sa quête (aller dans les cavernes)",
        nextChapterId: 26,
      },
      {
        id: 102,
        text: "Demander ce qu'il sait sur la crypte",
        nextChapterId: 58,
      },
      { id: 103, text: "Visiter le reste du village", nextChapterId: 54 },
    ],
  },
  {
    id: 54,
    title: "Les ruelles sombres",
    text: "Les ruelles sont un dédale de passages étroits. Vous entendez des pas derrière vous. Soudain, trois silhouettes encapuchonnées vous bloquent le passage. « Tes affaires ou ta vie, étranger. »",
    choices: [
      { id: 104, text: "Se battre", nextChapterId: 59 },
      { id: 105, text: "Négocier", nextChapterId: 60 },
      { id: 106, text: "Fuir vers l'auberge", nextChapterId: 52 },
    ],
  },
  {
    id: 55,
    title: "L'information d'Helga",
    text: "Helga écoute votre récit avec attention. « Vous cherchez la crypte du Roi Oublié ? Vous êtes soit très brave, soit très fou. » Elle baisse la voix. « Le Seigneur des Ombres contrôle ce village. C'est lui qui a la clé de la crypte. Il vit dans le manoir au nord. Mais attention, il n'est plus humain depuis longtemps. » Elle vous donne une potion. « Vous en aurez besoin. »",
    loot: [3],
    choices: [
      {
        id: 107,
        text: "Se rendre au manoir du Seigneur des Ombres",
        nextChapterId: 65,
      },
      { id: 108, text: "D'abord se préparer davantage", nextChapterId: 51 },
    ],
  },
  {
    id: 56,
    title: "L'arène souterraine",
    text: "Sous l'auberge, une arène crasseuse attend. Votre adversaire : un barbare couvert de cicatrices qui fait deux fois votre taille.",
    type: "combat",
    enemy: {
      name: "Grokk le Barbare",
      hp: 20,
      attack: 7,
      defense: 3,
    },
    onVictory: {
      text: "Grokk tombe à genoux. La foule rugit. Helga vous applaudit et vous tend une bourse de pièces. « Bien joué. Maintenant, parlons de la crypte... » Elle vous révèle l'emplacement du manoir du Seigneur des Ombres et vous offre un élixir rare.",
      loot: [4],
      choices: [
        { id: 109, text: "Se rendre au manoir", nextChapterId: 65 },
        { id: 110, text: "Demander plus d'informations", nextChapterId: 55 },
      ],
    },
    onDefeat: {
      text: "Grokk vous assomme d'un coup de poing titanesque. Vous vous réveillez dans la rue, dépouillé...",
      nextChapterId: 51,
    },
  },
  {
    id: 57,
    title: "Le repos de l'auberge",
    text: "Vous prenez une chambre pour la nuit. Le lit est dur mais c'est mieux que le sol de la forêt. Durant la nuit, vous entendez des bruits étranges venant du grenier. Des griffures sur le bois, des murmures...",
    choices: [
      { id: 111, text: "Monter au grenier enquêter", nextChapterId: 61 },
      { id: 112, text: "Ignorer les bruits et dormir", nextChapterId: 62 },
    ],
  },
  {
    id: 58,
    title: "Les secrets du forgeron",
    text: "Thorin s'assombrit. « La crypte... J'y ai travaillé autrefois, quand le roi l'a fait construire. Il y a un piège dans la salle du trône. Le sol s'effondre si on marche sur les dalles gravées d'un soleil. Ne marchez que sur les étoiles. » Il vous tend une petite potion. « Prenez ça, c'est tout ce que je peux faire. »",
    loot: [1],
    choices: [
      {
        id: 113,
        text: "Remercier Thorin et explorer le village",
        nextChapterId: 54,
      },
      { id: 114, text: "Aller à l'auberge", nextChapterId: 52 },
    ],
  },
  {
    id: 59,
    title: "L'embuscade des voleurs",
    text: "Le chef des voleurs tire une lame dentelée. « Mauvais choix, étranger. »",
    type: "combat",
    enemy: {
      name: "Chef des voleurs",
      hp: 15,
      attack: 5,
      defense: 2,
    },
    onVictory: {
      text: "Les voleurs s'enfuient après la chute de leur chef. Vous récupérez une bourse contenant une potion et une information griffonnée sur un papier : « La clé est dans le coffre du manoir, troisième étage. »",
      loot: [2],
      choices: [
        { id: 115, text: "Se rendre au manoir", nextChapterId: 65 },
        { id: 116, text: "Retourner à l'auberge", nextChapterId: 52 },
      ],
    },
    onDefeat: {
      text: "Les voleurs vous dépouillent et vous abandonnent dans une ruelle...",
      nextChapterId: 51,
    },
  },
  {
    id: 60,
    title: "La négociation",
    text: "« On peut s'arranger », dites-vous calmement. Le chef hésite puis ricane. « OK. On a besoin de quelqu'un pour un travail. Le Seigneur des Ombres a quelque chose qu'on veut. Un coffret en or, troisième étage de son manoir. Rapportez-le nous, et on vous laisse tranquille. En plus, on vous donne ça en avance. » Il vous lance une fiole.",
    loot: [5],
    choices: [
      { id: 117, text: "Accepter le marché", nextChapterId: 65 },
      { id: 118, text: "Refuser et partir", nextChapterId: 52 },
    ],
  },
  {
    id: 61,
    title: "Le grenier hanté",
    text: "Le grenier est rempli de vieux meubles couverts de draps. Dans un coin, un spectre translucide flotte au-dessus d'un coffre. Il ne semble pas hostile mais vous observe avec des yeux tristes. « Libérez-moi... détruisez le Seigneur des Ombres et mon âme sera libre. » Le coffre s'ouvre, révélant un équipement précieux.",
    loot: [3, 22],
    choices: [
      { id: 119, text: "Promettre de vaincre le Seigneur", nextChapterId: 62 },
    ],
  },
  {
    id: 62,
    title: "Le matin au village",
    text: "Le soleil se lève timidement à travers le brouillard. Les villageois commencent leur routine silencieuse. Vous vous sentez reposé et prêt à continuer.",
    choices: [
      {
        id: 120,
        text: "Se rendre au manoir du Seigneur des Ombres",
        nextChapterId: 65,
      },
      { id: 121, text: "Parler au forgeron", nextChapterId: 53 },
      { id: 122, text: "Explorer les ruelles", nextChapterId: 54 },
    ],
  },
  {
    id: 65,
    title: "Le manoir du Seigneur des Ombres",
    text: "Le manoir est une bâtisse sinistre entourée de grilles rouillées. Les fenêtres sont condamnées et une brume noire s'échappe du toit. La porte d'entrée est entrouverte, comme une invitation. Des gargoyles de pierre surveillent les murs.",
    choices: [
      { id: 123, text: "Entrer par la porte principale", nextChapterId: 66 },
      { id: 124, text: "Chercher une entrée latérale", nextChapterId: 67 },
      { id: 125, text: "Examiner les gargoyles", nextChapterId: 68 },
    ],
  },
  {
    id: 66,
    title: "Le hall du manoir",
    text: "Le hall est immense et glacial. Un lustre brisé pend du plafond. Un double escalier mène aux étages supérieurs. Des bruits de chaînes résonnent d'en bas, et une lueur sinistre filtre sous une porte à gauche.",
    choices: [
      { id: 126, text: "Monter les escaliers", nextChapterId: 69 },
      { id: 127, text: "Ouvrir la porte de gauche", nextChapterId: 70 },
      {
        id: 128,
        text: "Descendre vers les bruits de chaînes",
        nextChapterId: 71,
      },
    ],
  },
  {
    id: 67,
    title: "Le jardin mort",
    text: "Le jardin est un cimetière de fleurs mortes. Un puits sec se trouve au centre. Vous remarquez une fenêtre mal fermée au premier étage, accessible en grimpant sur un treillis.",
    choices: [
      { id: 129, text: "Grimper au treillis", nextChapterId: 69 },
      { id: 130, text: "Descendre dans le puits", nextChapterId: 72 },
      { id: 131, text: "Entrer par la porte principale", nextChapterId: 66 },
    ],
  },
  {
    id: 68,
    title: "Les gargoyles animées",
    text: "En touchant une gargoyle, elle s'anime ! Ses yeux brillent d'un rouge vif et elle pousse un cri strident.",
    type: "combat",
    enemy: {
      name: "Gargoyle animée",
      hp: 16,
      attack: 6,
      defense: 4,
    },
    onVictory: {
      text: "La gargoyle se brise en morceaux. À l'intérieur de sa poitrine de pierre, un cœur de cristal pulse faiblement. Il restaure vos forces.",
      loot: [3],
      choices: [{ id: 132, text: "Entrer dans le manoir", nextChapterId: 66 }],
    },
    onDefeat: {
      text: "La gargoyle vous projette contre les grilles du manoir...",
      nextChapterId: 100,
    },
  },
  {
    id: 69,
    title: "Le premier étage",
    text: "Le premier étage est un dédale de couloirs. Des portraits aux yeux qui semblent vous suivre ornent les murs. Vous trouvez deux portes : une bibliothèque et une salle d'armes.",
    choices: [
      { id: 133, text: "Explorer la bibliothèque", nextChapterId: 73 },
      { id: 134, text: "Explorer la salle d'armes", nextChapterId: 74 },
      { id: 135, text: "Monter au deuxième étage", nextChapterId: 75 },
    ],
  },
  {
    id: 70,
    title: "La salle rituelle",
    text: "La pièce est un autel de magie noire. Des bougies noires brûlent en cercle. Au centre, un livre ouvert émet une aura violette. Le lire pourrait vous donner des connaissances... ou vous maudire.",
    choices: [
      { id: 136, text: "Lire le livre", nextChapterId: 78 },
      { id: 137, text: "Détruire l'autel", nextChapterId: 79 },
      { id: 138, text: "Quitter la pièce", nextChapterId: 66 },
    ],
  },
  {
    id: 71,
    title: "Les cachots du manoir",
    text: "Les cachots sont terrifiants. Des squelettes enchaînés aux murs racontent des années de souffrance. Dans la dernière cellule, un prisonnier encore vivant vous supplie. « S'il vous plaît... libérez-moi. Je suis Aldric, ancien garde du roi. Je connais le chemin secret vers la crypte. »",
    choices: [
      { id: 139, text: "Libérer Aldric", nextChapterId: 80 },
      { id: 140, text: "L'ignorer et explorer les cachots", nextChapterId: 81 },
    ],
  },
  {
    id: 72,
    title: "Le fond du puits",
    text: "Le puits mène à un passage souterrain qui rejoint les cachots du manoir. Vous trouvez une potion abandonnée par un ancien prisonnier.",
    loot: [2],
    choices: [{ id: 141, text: "Explorer les cachots", nextChapterId: 71 }],
  },
  {
    id: 73,
    title: "La bibliothèque interdite",
    text: "Les étagères croulent sous les livres anciens. Un ouvrage attire votre attention : « L'Histoire du Roi Oublié ». Vous apprenez que le roi avait une faiblesse : la lumière du soleil, canalisée par son propre médaillon. Aussi, une potion était cachée derrière un livre factice.",
    loot: [2],
    choices: [
      { id: 142, text: "Monter au deuxième étage", nextChapterId: 75 },
      { id: 143, text: "Explorer la salle d'armes", nextChapterId: 74 },
    ],
  },
  {
    id: 74,
    title: "La salle d'armes",
    text: "Des armes de toutes sortes ornent les murs. La plupart sont décoratives, mais une épée dans un écrin de verre semble différente. L'écrin est protégé par un mécanisme à code. Un indice est gravé : « Le nombre de lettres du nom du roi. » La réponse est dans la bibliothèque...",
    choices: [
      { id: 144, text: "Essayer un code au hasard (7)", nextChapterId: 82 },
      { id: 145, text: "Aller à la bibliothèque d'abord", nextChapterId: 73 },
      { id: 146, text: "Monter au deuxième étage", nextChapterId: 75 },
    ],
  },
  {
    id: 75,
    title: "Le deuxième étage — Le Seigneur des Ombres",
    text: "La porte du bureau s'ouvre sur une vaste pièce plongée dans les ténèbres. Un homme — ou ce qu'il en reste — se tient devant une fenêtre condamnée. Sa peau est d'un gris cadavérique, ses yeux brillent comme des braises. « Encore un aventurier... Vous cherchez la crypte, n'est-ce pas ? La clé est ici. Mais elle ne sera vôtre qu'en passant sur mon cadavre. »",
    type: "combat",
    enemy: {
      name: "Seigneur des Ombres",
      hp: 28,
      attack: 8,
      defense: 4,
    },
    onVictory: {
      text: "Le Seigneur des Ombres se dissout dans une fumée noire avec un hurlement. Le brouillard autour du village commence à se dissiper. Sur son bureau, une clé ornementée brille à côté de l'Épée du Roi Oublié et d'un élixir puissant. Vous avez la clé de la crypte !",
      loot: [13, 4],
      choices: [
        {
          id: 147,
          text: "Se rendre à la crypte immédiatement",
          nextChapterId: 76,
        },
        {
          id: 148,
          text: "Retourner au village se préparer",
          nextChapterId: 83,
        },
      ],
    },
    onDefeat: {
      text: "Le Seigneur des Ombres vous consume de son pouvoir ténébreux. Les ombres vous engloutissent...",
      nextChapterId: 100,
    },
  },
  {
    id: 78,
    title: "Le livre maudit",
    text: "Les mots du livre s'inscrivent dans votre esprit. Vous apprenez un sort de protection, mais le livre draine votre énergie vitale. Cependant, vos connaissances en magie noire vous seront utiles contre le Seigneur des Ombres.",
    choices: [{ id: 149, text: "Retourner dans le hall", nextChapterId: 66 }],
  },
  {
    id: 79,
    title: "L'autel détruit",
    text: "Vous renversez les bougies et déchirez le livre. L'autel explose dans une gerbe de lumière violette. Un cri inhumain résonne dans le manoir. Vous avez affaibli le Seigneur des Ombres en détruisant sa source de pouvoir. Une potion apparaît dans les décombres.",
    loot: [3],
    choices: [{ id: 150, text: "Retourner dans le hall", nextChapterId: 66 }],
  },
  {
    id: 80,
    title: "Aldric libéré",
    text: "Vous brisez les chaînes d'Aldric. Il est faible mais reconnaissant. « Merci, brave âme. Le Seigneur des Ombres m'a capturé quand j'ai essayé d'atteindre la crypte. Prenez ceci — c'est tout ce qui me reste. » Il vous tend une potion et vous révèle un passage secret vers la crypte.",
    loot: [3],
    choices: [
      {
        id: 151,
        text: "Monter affronter le Seigneur des Ombres",
        nextChapterId: 75,
      },
      {
        id: 152,
        text: "Utiliser le passage secret vers la crypte",
        nextChapterId: 76,
      },
    ],
  },
  {
    id: 81,
    title: "Les cachots profonds",
    text: "Au fond des cachots, vous trouvez un coffre rouillé. À l'intérieur, une potion miraculeusement intacte et un bouclier gravé de runes protectrices.",
    loot: [2, 21],
    choices: [
      { id: 153, text: "Libérer le prisonnier", nextChapterId: 80 },
      { id: 154, text: "Remonter dans le hall", nextChapterId: 66 },
    ],
  },
  {
    id: 82,
    title: "Le bon code !",
    text: "Le mécanisme cliquète et l'écrin s'ouvre ! Le nombre 7 était correct — « Alderon », le nom du Roi Oublié. L'épée à l'intérieur est d'une facture extraordinaire, légère comme une plume mais tranchante comme un rasoir.",
    loot: [12],
    choices: [{ id: 155, text: "Monter au deuxième étage", nextChapterId: 75 }],
  },
  {
    id: 83,
    title: "Le village libéré",
    text: "Avec la chute du Seigneur des Ombres, le village reprend vie. Les villageois vous remercient. Le forgeron Thorin vous offre sa meilleure potion. « Allez terminer ce qui a commencé il y a des siècles. »",
    loot: [4],
    choices: [{ id: 156, text: "Partir vers la crypte", nextChapterId: 76 }],
  },

  // ========================================
  //  ACTE 4 — LA CRYPTE DU ROI OUBLIÉ
  // ========================================
  {
    id: 76,
    title: "L'entrée de la Crypte",
    text: "L'immense porte de pierre s'ouvre dans un grondement sourd. L'air qui s'en échappe est glacial et chargé de magie ancienne. Des torches bleues s'allument d'elles-mêmes, éclairant un escalier qui descend dans les entrailles de la terre. Des inscriptions sur les murs racontent la gloire passée du roi Alderon.",
    choices: [
      { id: 157, text: "Descendre prudemment", nextChapterId: 84 },
      { id: 158, text: "Examiner les inscriptions", nextChapterId: 85 },
    ],
  },
  {
    id: 84,
    title: "Le couloir des pièges",
    text: "Le couloir est truffé de pièges. Des dalles au sol portent des symboles : des soleils et des étoiles. Vous vous rappelez les paroles du forgeron : « Ne marchez que sur les étoiles. » Le couloir fait une vingtaine de mètres.",
    choices: [
      {
        id: 159,
        text: "Marcher uniquement sur les étoiles",
        nextChapterId: 86,
      },
      { id: 160, text: "Marcher sur les soleils", nextChapterId: 87 },
      { id: 161, text: "Essayer de longer le mur", nextChapterId: 88 },
    ],
  },
  {
    id: 85,
    title: "L'histoire du Roi Alderon",
    text: "Les inscriptions racontent tout. Le Roi Alderon a scellé un démon antique dans cette crypte en y sacrifiant sa propre vie. Son corps est devenu le gardien immortel du sceau. Si le sceau est brisé, le démon sera libre. Mais le roi, piégé entre la vie et la mort, est devenu fou au fil des siècles. Pour mettre fin à sa souffrance, il faut le vaincre avec sa propre épée.",
    choices: [
      {
        id: 162,
        text: "Descendre dans le couloir des pièges",
        nextChapterId: 84,
      },
    ],
  },
  {
    id: 86,
    title: "Les étoiles salvatrices",
    text: "Vous avancez de dalle en dalle, ne posant le pied que sur les étoiles. Des flèches fusent des murs quand vous frôlez un soleil, mais aucune ne vous touche. Vous atteignez l'autre côté sain et sauf. Devant vous, une salle ronde avec deux portes.",
    choices: [
      { id: 163, text: "Prendre la porte de gauche", nextChapterId: 89 },
      { id: 164, text: "Prendre la porte de droite", nextChapterId: 90 },
    ],
  },
  {
    id: 87,
    title: "Le piège du soleil",
    text: "Dès que votre pied touche un soleil, des flèches jaillissent des murs ! Vous êtes blessé mais parvenez à atteindre l'autre côté en courant.",
    choices: [
      { id: 165, text: "Continuer malgré la douleur", nextChapterId: 89 },
    ],
  },
  {
    id: 88,
    title: "Le rebord étroit",
    text: "Vous tentez de longer le mur mais le rebord est trop étroit. Votre pied glisse et vous déclenchez un piège. Des lames sortent du mur mais vous esquivez de justesse.",
    choices: [
      {
        id: 166,
        text: "Marcher sur les étoiles cette fois",
        nextChapterId: 86,
      },
    ],
  },
  {
    id: 89,
    title: "La salle du trésor maudit",
    text: "Des monceaux de pièces d'or, de joyaux et d'artefacts anciens remplissent la salle. Mais chaque objet semble entouré d'une aura sombre. Au milieu du trésor, une grande potion et un coffre encore fermé.",
    loot: [4],
    choices: [
      { id: 167, text: "Ouvrir le coffre", nextChapterId: 91 },
      {
        id: 168,
        text: "Quitter la salle et prendre l'autre porte",
        nextChapterId: 90,
      },
    ],
  },
  {
    id: 90,
    title: "Le couloir des gardiens",
    text: "Deux statues de chevaliers encadrent un long couloir. À mesure que vous avancez, les statues prennent vie ! Un chevalier squelette se dresse devant vous, épée levée.",
    type: "combat",
    enemy: {
      name: "Chevalier squelette",
      hp: 20,
      attack: 7,
      defense: 4,
    },
    onVictory: {
      text: "Le squelette s'effondre en poussière. Son épée et son bouclier se désintègrent, mais une potion roule sur le sol. Le chemin vers la salle du trône est libre.",
      loot: [3],
      choices: [
        { id: 169, text: "Avancer vers la salle du trône", nextChapterId: 92 },
      ],
    },
    onDefeat: {
      text: "Le chevalier squelette est un adversaire redoutable. Sa lame vous transperce...",
      nextChapterId: 100,
    },
  },
  {
    id: 91,
    title: "Le coffre piégé",
    text: "Le coffre s'ouvre et un nuage de gaz empoisonné s'en échappe ! Vous toussez violemment mais à l'intérieur, vous trouvez une armure d'une qualité exceptionnelle.",
    loot: [23],
    choices: [
      { id: 170, text: "Rejoindre le couloir des gardiens", nextChapterId: 90 },
    ],
  },
  {
    id: 92,
    title: "La salle du trône",
    text: "La salle est immense et glaciale. Des colonnes de marbre noir s'élèvent vers un plafond invisible dans l'obscurité. Au fond, sur un trône d'os et de métal noir, siège le Roi Oublié. Sa couronne ternit brille faiblement. Sa main squelettique serre le pommeau d'une épée. Ses yeux s'ouvrent — deux points de lumière bleue dans des orbites creuses. « Encore un voleur venu piller ma tombe... » Sa voix est un murmure qui résonne comme le tonnerre.",
    choices: [
      {
        id: 171,
        text: "« Je suis venu vous libérer, Roi Alderon. »",
        nextChapterId: 93,
      },
      { id: 172, text: "Attaquer sans parler", nextChapterId: 94 },
      {
        id: 173,
        text: "« Le démon doit rester scellé. Laissez-moi vous aider. »",
        nextChapterId: 95,
      },
    ],
  },
  {
    id: 93,
    title: "La lueur de raison",
    text: "Le roi hésite. Pendant un instant, la folie quitte ses yeux. « Me... libérer ? Personne n'a jamais... » Puis la folie revient. « NON ! C'est un piège ! Tout le monde veut le trésor ! » Il se lève et attaque.",
    type: "combat",
    enemy: {
      name: "Roi Alderon, le Roi Oublié",
      hp: 35,
      attack: 9,
      defense: 5,
    },
    onVictory: {
      text: "Le roi tombe à genoux. La folie quitte enfin ses yeux. « Merci... brave guerrier. Vous avez réussi là où tant d'autres ont échoué. Le sceau tiendra sans moi — le démon est affaibli. Prenez ma couronne, prenez mon épée. Racontez mon histoire. Que je ne sois plus... oublié. » Son corps se désintègre en une pluie de lumière dorée. La crypte tremble, mais tient bon.",
      choices: [
        { id: 174, text: "Prendre la couronne et sortir", nextChapterId: 96 },
      ],
    },
    onDefeat: {
      text: "Le Roi Oublié est un guerrier d'une puissance terrifiante même dans la mort. Son épée vous fauche comme un fétu de paille...",
      nextChapterId: 100,
    },
  },
  {
    id: 94,
    title: "L'assaut du désespoir",
    text: "Vous vous jetez sur le roi sans préambule. Il repousse votre première attaque d'un revers et se lève lentement. « Impétueux... comme tous les autres. »",
    type: "combat",
    enemy: {
      name: "Roi Alderon, le Roi Oublié",
      hp: 40,
      attack: 10,
      defense: 6,
    },
    onVictory: {
      text: "Le combat est brutal et long. Le roi finit par s'effondrer. Mais au lieu de la satisfaction de la victoire, vous ressentez une profonde tristesse. Le roi murmure : « Enfin... le repos... » Son corps se dissipe comme de la brume au soleil.",
      choices: [
        {
          id: 175,
          text: "Prendre la couronne et quitter la crypte",
          nextChapterId: 97,
        },
      ],
    },
    onDefeat: {
      text: "Le Roi Oublié, furieux d'être attaqué sans avertissement, déchaine toute sa puissance...",
      nextChapterId: 100,
    },
  },
  {
    id: 95,
    title: "Les mots justes",
    text: "Le roi vous fixe longuement. « Le démon... oui. C'est pour lui que je reste. Depuis des siècles, je le retiens. Mais je suis si fatigué... » Des larmes de lumière coulent sur ses joues squelettiques. « Si vous êtes assez fort pour me vaincre, vous serez assez fort pour maintenir le sceau. Venez, guerrier. Prouvez votre valeur. »",
    type: "combat",
    enemy: {
      name: "Roi Alderon, le Roi Oublié",
      hp: 30,
      attack: 8,
      defense: 4,
    },
    onVictory: {
      text: "Le roi sourit — le premier sourire depuis des siècles. « Vous êtes digne. Le sceau tiendra avec votre victoire. Je peux enfin... dormir. » Il pose sa couronne à vos pieds et s'allonge sur son trône une dernière fois. Son corps se transforme en poussière d'étoiles qui monte vers le plafond. Vous êtes le héros de Sombrebois.",
      choices: [
        {
          id: 176,
          text: "Prendre la couronne et la paix avec",
          nextChapterId: 98,
        },
      ],
    },
    onDefeat: {
      text: "Même avec les meilleurs mots, le combat reste un combat. Le Roi Oublié vous surpasse...",
      nextChapterId: 100,
    },
  },
  {
    id: 96,
    title: "Le héros de Sombrebois",
    text: "Vous émergez de la crypte, la couronne du roi en main. Le soleil brille pour la première fois depuis des décennies sur la forêt de Sombrebois. Les arbres semblent plus verts, l'air plus léger. Au village, les habitants vous accueillent en héros. Le forgeron Thorin pleure de joie. « C'est fini. La malédiction est levée. » Vous êtes devenu une légende vivante.",
    type: "victory",
    choices: [],
  },
  {
    id: 97,
    title: "Victoire amère",
    text: "Vous quittez la crypte avec la couronne. La victoire a un goût amer — vous avez détruit un roi qui ne faisait que protéger son peuple, même dans la mort. Mais le mal est dissipé et la forêt reprend vie. Les villageois vous remercient, mais vous savez que cette aventure vous hantera longtemps.",
    type: "victory",
    choices: [],
  },
  {
    id: 98,
    title: "La vraie victoire",
    text: "Vous quittez la crypte avec la couronne et la paix dans le cœur. Vous avez non seulement vaincu le roi, mais vous l'avez libéré de siècles de souffrance. La forêt de Sombrebois renaît sous vos yeux. Des fleurs poussent là où il n'y avait que des épines. Le village s'illumine. Les enfants rient à nouveau. Thorin le forgeron forge une statue à votre effigie. Le vieil homme de la rivière réapparaît et vous salue en souriant. Vous êtes le héros de Sombrebois, celui qui a libéré le Roi Oublié.",
    type: "victory",
    choices: [],
  },

  // ========================================
  //  ÉCRAN DE DÉFAITE GLOBAL
  // ========================================
  {
    id: 100,
    title: "Fin du voyage",
    text: "Les ténèbres vous engloutissent. Votre aventure s'achève ici, dans les profondeurs de Sombrebois. Peut-être qu'un autre aventurier reprendra le flambeau là où vous avez échoué. La crypte du Roi Oublié garde ses secrets... pour l'instant.",
    type: "defeat",
    choices: [],
  },
];
