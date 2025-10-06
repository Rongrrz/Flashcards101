import DeckBox from '../components/deck-box';
import { useState } from 'react';
import { DeckModal } from '../components/deck-modal';

type Card = { front: string; back: string };
type Deck = { name: string; cards: Card[] };

const MOCK_DECKS: Deck[] = [
  {
    name: 'Classics 101',
    cards: [
      { front: 'logy', back: 'the study of' },
      { front: 'idi', back: 'own, personal' },
      { front: 'ora', back: 'see' },
      { front: 'phen, phan, pha', back: 'show' },
    ],
  },
  { name: 'Derivatives', cards: [{ front: 'd/dx x²', back: '2x' }] },
  { name: 'Biology Basics', cards: [] },
  { name: 'World Capitals', cards: [] },
];

export default function Decks() {
  const [selected, setSelected] = useState<Deck | null>(null);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">My Decks</h1>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        <button
          type="button"
          className={`flex aspect-square flex-col items-center justify-center rounded-2xl
            border-3 border-dashed border-gray-300 transition hover:border-0
            hover:bg-blue-300 hover:shadow-md
          `}
          onClick={() => alert('TODO: open Create Deck dialog')}
        >
          <span className="mb-1 text-2xl">+</span>
          <span className="text-sm">Add Deck</span>
        </button>

        {MOCK_DECKS.map((deck) => (
          <DeckBox
            key={deck.name}
            name={deck.name}
            cardCount={deck.cards.length}
            onClick={() => setSelected(deck)}
          />
        ))}
      </div>

      <DeckModal deck={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
