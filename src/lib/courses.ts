export type Ingredient = { name: string; origin: string };

export type Course = {
  no: string; // roman numeral
  index: number; // 1-based
  name: string;
  french: string;
  short: string;
  description: string;
  pairing: string;
  pairingNote: string;
  ingredients: Ingredient[];
  chefNote: string;
  image: string;
  /** Minutes after the seating starts that this course is plated. */
  servedAtMinute: number;
};

/**
 * The full 12-course "Carnet" tasting menu. Times are calibrated to the
 * 19:00 seating — the second seating (21:00) is offset by +120 min in
 * computeCurrentCourse(). Used by both the Carte Vivante section and the
 * "Currently being served" live card.
 */
export const CARNET_COURSES: Course[] = [
  {
    no: "I",
    index: 1,
    name: "The Overture",
    french: "Caviar Osciètre · Sarrasin · Crème fraîche de Normandie",
    short: "A single spoon. The whole evening, condensed.",
    description:
      "We open in silence. A single spoon, balanced on a slate from the Massif Central, is set in front of you. It carries fifteen grams of ten-year-aged Osciètre, a wafer of toasted buckwheat, and a drop of crème fraîche from a single farm in the Pays d'Auge. There is no bread. We will speak again in a few minutes.",
    pairing: "Champagne Salon, Le Mesnil 2013",
    pairingNote:
      "Salt, mineral, brine. Salon's 2013 was a year of patience — eight years on the lees — and meets the Osciètre with the tension of two old acquaintances who never quite agreed on anything.",
    ingredients: [
      { name: "Osciètre Royal caviar", origin: "Aquitaine · 10-year aged" },
      { name: "Crème fraîche", origin: "Pays d'Auge · single farm" },
      { name: "Sarrasin de Bretagne", origin: "Côtes-d'Armor" },
    ],
    chefNote:
      "I have served this opening, in some form, every evening since 2014. It is the only constant.",
    image:
      "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1800&q=85",
    servedAtMinute: 6,
  },
  {
    no: "II",
    index: 2,
    name: "From the Cold Atlantic",
    french: "Langoustine de Loctudy · Sauce Albuféra · Verveine",
    short: "Caught at dawn, plated before the candles are lit.",
    description:
      "A single langoustine, brought in from Loctudy on the morning train. It is barely cooked — sixty seconds in clarified butter — and laid on a sauce Albuféra that we begin in the afternoon and finish at the moment of service. A drop of verbena oil, a brunoise of green almond, and nothing else.",
    pairing: "Chablis 1er Cru ‘Montée de Tonnerre’ 2019, Raveneau",
    pairingNote:
      "The chalk under the langoustine's sweetness asks for the chalk under Raveneau's vines. Same conversation, different rooms.",
    ingredients: [
      { name: "Langoustine", origin: "Loctudy · day-boat" },
      { name: "Verbena", origin: "Garden, Versailles" },
      { name: "Green almond", origin: "Provence · early June only" },
    ],
    chefNote:
      "If the langoustine arrives less than perfect, we serve no second course. We refund the wine, we keep the company.",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1800&q=85",
    servedAtMinute: 18,
  },
  {
    no: "III",
    index: 3,
    name: "Theatre of the Garden",
    french: "Tomate ancienne · Miel brûlé · Caillé de chèvre · Cendre de basilic",
    short: "Forty varieties, one farm, one Tuesday in August.",
    description:
      "Forty heirloom tomato varieties from a single farmer in the Vaucluse, ripened to within a day of bursting. Burnt honey, a curd of fresh goat's cheese made that morning, and a fine ash of basil burnt in our cheminée. The plate looks, deliberately, like a painting we have not quite finished.",
    pairing: "Sancerre ‘Les Monts Damnés’ 2020, Cotat",
    pairingNote: "Flint and grass and an edge of grapefruit zest.",
    ingredients: [
      { name: "Tomato (40 varieties)", origin: "Vaucluse · single farm" },
      { name: "Goat's curd", origin: "Loire · made daily" },
      { name: "Mountain honey", origin: "Cévennes · burnt à la minute" },
    ],
    chefNote:
      "When the tomato is right, the dish is right. When it is not, we replace it with something else from the garden, and apologise.",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1800&q=85",
    servedAtMinute: 32,
  },
  {
    no: "IV",
    index: 4,
    name: "Pigeon, Royale",
    french: "Pigeonneau d'Anjou · Betterave · Cassis · Foie gras",
    short: "Roasted whole, carved tableside, served by candle.",
    description:
      "A pigeon from a single farm in Anjou, hung for five days, roasted whole on the bone and brought to the table on a copper platter. We carve it in front of you. The breast is served first, with a beetroot worked three ways and a sauce reduced from its own carcass with blackcurrant. The thighs, finished separately, arrive a few minutes later, with a small piece of seared foie gras.",
    pairing: "Volnay 1er Cru ‘Les Caillerets’ 2017, d'Angerville",
    pairingNote:
      "Volnay is the wine of pigeon. There is no need to argue about it.",
    ingredients: [
      { name: "Pigeonneau", origin: "Anjou · 5-day aged" },
      { name: "Betterave Crapaudine", origin: "Île-de-France · roasted in salt" },
      { name: "Cassis noir de Bourgogne", origin: "Côte-d'Or" },
      { name: "Foie gras", origin: "Landes · ethical farm" },
    ],
    chefNote:
      "The bird must arrive whole and leave bone-clean. Anything in between is failure.",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1800&q=85",
    servedAtMinute: 48,
  },
  {
    no: "V",
    index: 5,
    name: "The Resting Course",
    french: "Bouillon de volaille fumé · Champignons · Sarrasin grillé",
    short: "A pause. Drink it slowly.",
    description:
      "A small bowl of clear chicken bouillon, smoked over apple wood for an hour. Three wild mushrooms, a brunoise of grilled buckwheat, and a thread of chive oil. It is the only course you will be invited to drink directly from the bowl.",
    pairing: "Vin Jaune ‘Côtes du Jura’ 2014, Macle",
    pairingNote:
      "Walnut, almond, the smell of an old library. The Jura's secret weapon.",
    ingredients: [
      { name: "Chicken (Bresse)", origin: "Ain · 100-day farm-raised" },
      { name: "Wild mushrooms", origin: "Forêt de Tronçais" },
      { name: "Sarrasin grillé", origin: "Bretagne" },
    ],
    chefNote:
      "Halfway through the menu, the room is too excited. This dish is here to remind everyone — including us — to slow down.",
    image:
      "https://images.unsplash.com/photo-1547573854-74d2a71d0826?auto=format&fit=crop&w=1800&q=85",
    servedAtMinute: 64,
  },
  {
    no: "VI",
    index: 6,
    name: "Of the Garrigue",
    french: "Saint-Pierre · Fenouil · Bouillon de coquillages · Olive Picholine",
    short: "Provence, in a single act.",
    description:
      "John Dory, scaled and filleted moments before service, cooked on its skin in a single iron pan. A shallow bouillon of clams and cockles from the Étang de Thau, a confit of bulb fennel, and three Picholine olives we have pressed and reformed by hand.",
    pairing: "Bandol Blanc ‘La Migoua’ 2019, Tempier",
    pairingNote:
      "Salt-spray, herbs, citrus. Bandol blanc is the wine of the south coast — and of this fish.",
    ingredients: [
      { name: "Saint-Pierre (John Dory)", origin: "Méditerranée · trolling line" },
      { name: "Coquillages", origin: "Étang de Thau" },
      { name: "Picholine", origin: "Gard · own pressing" },
    ],
    chefNote: "If the fish is not perfect, we will not serve it.",
    image:
      "https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&w=1800&q=85",
    servedAtMinute: 80,
  },
  {
    no: "VII",
    index: 7,
    name: "From the Pasture",
    french: "Agneau de lait · Topinambour · Romarin · Jus court",
    short: "Spring on a single bone.",
    description:
      "A single rib of milk-fed lamb from the Pyrenees, cooked over vine cuttings until the fat caramelises. Beneath it, a purée of Jerusalem artichoke and a spoonful of jus court reduced from the carcass with rosemary cut from the rooftop.",
    pairing: "Châteauneuf-du-Pape ‘Réservée’ 2016, Rayas",
    pairingNote: "Roses, cherry, garrigue. Rayas is unrepeatable.",
    ingredients: [
      { name: "Agneau de lait", origin: "Pyrénées-Atlantiques · 4-week" },
      { name: "Topinambour", origin: "Île-de-France" },
      { name: "Rosemary", origin: "Rooftop · Maison Noir" },
    ],
    chefNote:
      "We serve only the rib. The rest of the lamb goes to the staff meal — which is in many ways the better menu.",
    image:
      "https://images.unsplash.com/photo-1432139509613-5c4255815697?auto=format&fit=crop&w=1800&q=85",
    servedAtMinute: 96,
  },
  {
    no: "VIII",
    index: 8,
    name: "Cheese, Aged",
    french: "Comté 36 mois · Gougère soufflée · Confiture d'oignon noir",
    short: "One cheese. Brought in by Bernard Antony.",
    description:
      "A single piece of Comté, aged thirty-six months in the cellars of Marcel Petite and brought to us once a fortnight by Bernard Antony. A warm gougère, a spoonful of black-onion confiture, and a small glass of vin jaune that you may keep on the table for the rest of the meal.",
    pairing: "Vin Jaune Château-Chalon 2010, Berthet-Bondet",
    pairingNote: "Already on your table. Refill at will.",
    ingredients: [
      { name: "Comté 36 mois", origin: "Jura · Antony" },
      { name: "Gougère", origin: "Made à la minute" },
      { name: "Oignon noir", origin: "Aged 30 days, Maison Noir" },
    ],
    chefNote:
      "We have served only Comté for three years. There is a great deal of cheese in France, and we have made our peace with serving none of the others.",
    image:
      "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=1800&q=85",
    servedAtMinute: 112,
  },
  {
    no: "IX",
    index: 9,
    name: "Pre-Dessert",
    french: "Sorbet à la verveine · Granité de Gewurztraminer",
    short: "Cold, sharp, brief.",
    description:
      "A small spoon of verbena sorbet — the verbena cut from the same plant since 1994 — and a granita of Gewurztraminer cut with sparkling water. The temperature contrast prepares the palate for what follows.",
    pairing: "Gewurztraminer ‘Cuvée Théo’ 2020, Weinbach",
    pairingNote: "Lychee and white pepper.",
    ingredients: [
      { name: "Verbena", origin: "Garden, Versailles · since 1994" },
      { name: "Gewurztraminer", origin: "Alsace" },
    ],
    chefNote:
      "Almost no one notices this course. That is, on the whole, the point.",
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1800&q=85",
    servedAtMinute: 124,
  },
  {
    no: "X",
    index: 10,
    name: "Apricot, in Three Acts",
    french: "Compote · Sorbet · Soufflé chaud, miel des Cévennes",
    short: "The end of summer, in three movements.",
    description:
      "A compote of apricot cooked with verbena. A sorbet of the same fruit, churned thirty seconds before service. A hot soufflé, opened tableside, into which a spoonful of mountain honey is poured. The three are eaten in order, in three minutes, in silence.",
    pairing: "Coteaux du Layon ‘Les Bonnes Blanches’ 2018, Pithon",
    pairingNote: "Apricot meeting apricot. The simplest possible argument.",
    ingredients: [
      { name: "Apricot Bergeron", origin: "Drôme · single orchard" },
      { name: "Mountain honey", origin: "Cévennes" },
    ],
    chefNote:
      "Three acts is the most a soufflé will tolerate. We have tried four.",
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=1800&q=85",
    servedAtMinute: 132,
  },
  {
    no: "XI",
    index: 11,
    name: "The Final Curtain",
    french: "Chocolat Grand Cru · Olive · Sel de Guérande",
    short: "Bitter, brilliant, brief.",
    description:
      "A single thin disc of seventy-two-percent chocolate from a small cooperative in Madagascar, set on a quenelle of black-olive ice cream and dusted with grey salt from Guérande. Bitter, brilliant, and gone in three bites.",
    pairing: "Banyuls Rimage 2019, Domaine la Tour Vieille",
    pairingNote: "The only sweet wine that can stand up to bitter chocolate.",
    ingredients: [
      { name: "Chocolat 72%", origin: "Madagascar · Bertil Akesson" },
      { name: "Olive Kalamata", origin: "Greece" },
      { name: "Sel de Guérande", origin: "Loire-Atlantique" },
    ],
    chefNote: "Three bites. We will not serve a fourth.",
    image:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1800&q=85",
    servedAtMinute: 144,
  },
  {
    no: "XII",
    index: 12,
    name: "Mignardises & a Glass of Marc",
    french: "Six petites pâtisseries · Marc de Bourgogne",
    short: "We do not say goodbye. We pour you a marc.",
    description:
      "Six small pâtisseries, served on a black slate. A canelé, a financier, a salted-caramel chocolate, a lemon tart the size of a coin, a madeleine that has just left the oven, and a single chocolate truffle that Élise made this afternoon. A glass of marc de Bourgogne, on the house.",
    pairing: "Marc de Bourgogne, vieille réserve",
    pairingNote: "On the house. Take your time.",
    ingredients: [
      { name: "Canelé", origin: "Bordeaux · twice-baked" },
      { name: "Madeleine", origin: "Made à la minute" },
      { name: "Truffle", origin: "Élise's own hand, this afternoon" },
    ],
    chefNote:
      "When you leave, the door will already be closing behind the next guest. There is no farewell. Only — until next time.",
    image:
      "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1800&q=85",
    servedAtMinute: 156,
  },
];

import {
  partsInParis,
  SERVICE_DAYS,
  FIRST_SEATING_MIN,
  SECOND_SEATING_MIN,
  type DayCode,
} from "./hours";

export type CurrentCourse =
  | { state: "serving"; course: Course; seating: 1 | 2; minutesIntoSeating: number }
  | { state: "between"; nextCourse: Course | null; seating: 1 | 2 }
  | { state: "before-service"; minutesUntil: number }
  | { state: "after-service" }
  | { state: "closed" };

/**
 * Determines which course is currently being plated, given the time. Each
 * seating runs ~165 minutes; we walk the courses by their `servedAtMinute`
 * and report the most recently plated one (within a 12-minute window).
 */
export function computeCurrentCourse(now: Date = new Date()): CurrentCourse {
  const { day, minute } = partsInParis(now);
  if (!SERVICE_DAYS.includes(day as DayCode)) return { state: "closed" };

  // Determine which seating is active
  const lastCourseMin = CARNET_COURSES[CARNET_COURSES.length - 1].servedAtMinute;
  const seatingEnd = lastCourseMin + 20; // 20-minute tail

  let seating: 1 | 2 | null = null;
  let minutesIntoSeating = 0;
  if (minute >= FIRST_SEATING_MIN && minute < FIRST_SEATING_MIN + seatingEnd) {
    seating = 1;
    minutesIntoSeating = minute - FIRST_SEATING_MIN;
  } else if (
    minute >= SECOND_SEATING_MIN &&
    minute < SECOND_SEATING_MIN + seatingEnd
  ) {
    seating = 2;
    minutesIntoSeating = minute - SECOND_SEATING_MIN;
  }

  if (seating === null) {
    if (minute < FIRST_SEATING_MIN) {
      return { state: "before-service", minutesUntil: FIRST_SEATING_MIN - minute };
    }
    return { state: "after-service" };
  }

  // Find current and next course
  let current: Course | null = null;
  let next: Course | null = null;
  for (const c of CARNET_COURSES) {
    if (c.servedAtMinute <= minutesIntoSeating) current = c;
    else if (next === null) next = c;
  }

  if (current && minutesIntoSeating - current.servedAtMinute <= 12) {
    return { state: "serving", course: current, seating, minutesIntoSeating };
  }

  return { state: "between", nextCourse: next, seating };
}
