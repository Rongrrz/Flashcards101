export type Card = {
  front: string;
  back: string;
};

export type Deck = {
  id: string;
  name: string;
  cards: Array<Card>;
};

export type DecksState = Record<string, Deck>;
