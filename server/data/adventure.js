export const adventure = {
  id: 1,
  title: "La Crypte du Roi Oublié",
  description:
    "On raconte qu'un ancien roi a été enterré avec son trésor dans une crypte oubliée au cœur de la forêt de Sombrebois. Personne n'en est jamais revenu...",
  startChapterId: 1,
};

export const chapters = [
  {
    id: 1,
    title: "L'orée de la forêt",
    text: "Vous vous tenez à l'entrée de la forêt de Sombrebois. Les arbres sont si denses que la lumière du soleil peine à percer le feuillage. Un sentier étroit s'enfonce dans l'obscurité. À votre droite, un vieux panneau en bois à moitié pourri indique : « Danger — Demi-tour conseillé ».",
    choices: [
      { id: 1, text: "Suivre le sentier principal", nextChapterId: 2 },
      { id: 2, text: "Contourner par la rivière", nextChapterId: 3 },
    ],
  },
  {
    id: 2,
    title: "Le sentier obscur",
    text: "Vous avancez prudemment sur le sentier. Au bout de quelques minutes, vous entendez un grognement sourd derrière les buissons. Une paire d'yeux jaunes vous fixe dans l'obscurité. Un loup énorme se dresse devant vous, babines retroussées.",
    choices: [
      { id: 3, text: "Tirer votre épée et combattre", nextChapterId: 4 },
      { id: 4, text: "Reculer lentement sans geste brusque", nextChapterId: 5 },
    ],
  },
  {
    id: 3,
    title: "La rivière murmurante",
    text: "Vous longez la rivière. L'eau est claire et le bruit du courant est apaisant. Après une dizaine de minutes, vous découvrez un petit pont de pierre. De l'autre côté, vous apercevez l'entrée d'une grotte. Juste avant le pont, un vieil homme est assis sur un rocher. Il vous regarde approcher avec un sourire édenté.",
    choices: [
      { id: 5, text: "Parler au vieil homme", nextChapterId: 6 },
      {
        id: 6,
        text: "Ignorer le vieil homme et traverser le pont",
        nextChapterId: 7,
      },
    ],
  },
  {
    id: 4,
    title: "Le combat sous les arbres",
    text: "Le loup bondit vers vous, babines retroussées. Vous dégainez votre épée. Il va falloir vous battre !",
    type: "combat",
    enemy: {
      name: "Loup de Sombrebois",
      hp: 12,
      attack: 4,
      defense: 2,
    },
    onVictory: {
      text: "Le loup s'effondre. Derrière lui, vous découvrez un ancien médaillon gravé d'un symbole étrange.",
      choices: [
        { id: 7, text: "Prendre le médaillon et continuer", nextChapterId: 8 },
        {
          id: 8,
          text: "Ignorer le médaillon et rebrousser chemin",
          nextChapterId: 5,
        },
      ],
    },
    onDefeat: {
      text: "Le loup est trop puissant. Vous tombez à genoux, vaincu...",
      nextChapterId: 5,
    },
  },
  {
    id: 5,
    title: "Une fin tragique",
    text: "Vous tentez de fuir, mais le loup est plus rapide. En quelques bonds, il vous rattrape. La forêt résonne de votre cri avant de retomber dans un silence pesant. Sombrebois garde ses secrets... et ajoute votre nom à la liste des disparus.",
    type: "defeat",
    choices: [],
  },
  {
    id: 6,
    title: "L'énigme du vieil homme",
    text: "Le vieil homme vous observe attentivement. « Beaucoup passent par ici, peu en reviennent », dit-il. Il vous propose une énigme : « Je n'ai ni bouche ni poumons, pourtant je rugis. Je n'ai ni vie ni âme, pourtant je grandis. Qui suis-je ? » Vous réfléchissez un instant. Le vieil homme attend votre réponse avec un sourire mystérieux.",
    choices: [
      { id: 9, text: "Répondre : Le feu", nextChapterId: 8 },
      { id: 10, text: "Répondre : Le vent", nextChapterId: 7 },
    ],
  },
  {
    id: 7,
    title: "Le pont maudit",
    text: "Vous traversez le pont en ignorant les avertissements implicites du vieil homme. À mi-chemin, la pierre se fissure sous vos pas. Le pont cède brutalement et vous tombez dans les eaux tumultueuses. Le courant vous emporte sans que vous puissiez lutter.",
    type: "defeat",
    choices: [],
  },
  {
    id: 8,
    title: "Le secret de Sombrebois",
    text: "À peine avez-vous prononcé le mot « feu » que le vieil homme éclate de rire. Son apparence se dissipe comme une illusion. Le médaillon que vous portez (ou la sagesse dont vous avez fait preuve) brille d'une lumière chaude. La grotte s'ouvre derrière le pont, révélant un ancien trésor oublié. Vous avez percé le secret de Sombrebois et triomphez là où tant d'autres ont échoué.",
    type: "victory",
    choices: [],
  },
];
