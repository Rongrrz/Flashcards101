export type Flashcard = {
  front: string;
  back: string;
};

export type Deck = {
  name: string;
  cards: Array<Flashcard>;
};
