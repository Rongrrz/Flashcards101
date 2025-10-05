// Decks.tsx

import DeckBox from '../components/deckbox';

type Card = { front: string; back: string };
type Deck = { name: string; cards: Card[] };

const MOCK_DECKS: Deck[] = [
  { name: 'Classics 101', cards: [{ front: 'logy', back: 'the study of' }] },
  { name: 'Derivatives', cards: [{ front: 'd/dx x²', back: '2x' }] },
  { name: 'Biology Basics', cards: [] },
  { name: 'World Capitals', cards: [] },
];

export default function Decks() {
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
          className="flex aspect-square flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 transition hover:border-blue-300 hover:bg-blue-50/40 dark:border-zinc-700 dark:hover:border-zinc-600 dark:hover:bg-zinc-800/40"
        >
          <span className="mb-1 text-2xl">＋</span>
          <span className="text-sm">Add Deck</span>
        </button>

        {MOCK_DECKS.map((d) => (
          <DeckBox
            key={d.name}
            name={d.name}
            cardCount={d.cards.length}
            // choose one of these:
            // onClick={() => navigate(`/decks/${encodeURIComponent(d.name)}`)}
            href={`/decks/${encodeURIComponent(d.name)}`}
          />
        ))}
      </div>
    </div>
  );
}
