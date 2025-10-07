import { useState } from 'react';
import PreviewDeckButton from '../components/deck/preview-btn';
import { PreviewDeckModal } from '../components/deck/preview-modal';
import EditDeckModal from '../components/deck/edit-modal';
import type { Deck } from '../types/types';

const MOCK_DECKS: Array<Omit<Deck, 'id'>> = [
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

const makeId = () => String(Date.now() + Math.random());

export default function Decks() {
  const [decks, setDecks] = useState<Deck[]>(
    // Fill in IDs for MOCK_DECK objects
    () =>
      MOCK_DECKS.map((d) => ({
        id: makeId(),
        name: d.name,
        cards: d.cards,
      })) as Deck[]
  );

  const [selected, setSelected] = useState<Deck | null>(null);

  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState<Deck>();

  const openPreview = (d: Deck) => setSelected(d);

  function handleEditDeck(d: Deck) {
    setSelected(null);
    setEditing(d);
    setEditorOpen(true);
  };

  function handleNewDeck() {
    setEditing(undefined);
    setEditorOpen(true);
  };

  function handleSaveFromEditor(deck: Deck) {
    setDecks((prev) => {
      const i = prev.findIndex((x) => x.id === deck.id);
      if (i === -1) return [deck, ...prev];
      const next = prev.slice();
      next[i] = deck;
      return next;
    });
    setEditorOpen(false);
  };

  function handleDeleteDeck(id: string) {
    setDecks((prev) => prev.filter((d) => d.id !== id));
    setEditorOpen(false);
    setSelected(null);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-8 flex items-end justify-between">
        <h1 className="text-4xl font-bold tracking-tight">My Decks</h1>
        <button
          type="button"
          onClick={handleNewDeck}
          className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          + New deck
        </button>
      </header>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {decks.map((deck) => (
          <PreviewDeckButton
            key={deck.id}
            name={deck.name}
            cardCount={deck.cards.length}
            onClick={() => openPreview(deck)}
          />
        ))}
      </div>

      <PreviewDeckModal
        deck={selected}
        onClose={() => setSelected(null)}
        onEdit={handleEditDeck}
      />

      <EditDeckModal
        key={editorOpen ? (editing?.id ?? 'open') : 'closed'}
        open={editorOpen}
        initialDeck={editing}
        onSave={handleSaveFromEditor}
        onClose={() => setEditorOpen(false)}
        onDelete={handleDeleteDeck}
      />
    </div>
  );
}
