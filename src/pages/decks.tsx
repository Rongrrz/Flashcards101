import { useState } from 'react';
import PreviewDeckButton from '../components/deck/preview-btn';
import { PreviewDeckModal } from '../components/deck/preview-modal';
import EditDeckModal from '../components/deck/edit-modal';
import type { Deck } from '../types/types';
import { useStore } from '@nanostores/react';
import { deckListOrdered, updateDecks } from '../stores/decks';

export default function Decks() {
  const decks = useStore(deckListOrdered);

  const [selected, setSelected] = useState<Deck | null>(null);

  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState<Deck>();

  const openPreview = (d: Deck) => setSelected(d);

  function handleEditDeck(d: Deck) {
    setSelected(null);
    setEditing(d);
    setEditorOpen(true);
  }

  function handleNewDeck() {
    setEditing(undefined);
    setEditorOpen(true);
  }

  function handleSaveFromEditor(deck: Deck) {
    updateDecks((draft) => {
      draft[deck.id] = deck;
    });
    setEditorOpen(false);
  }

  function handleDeleteDeck(id: string) {
    updateDecks((draft) => {
      delete draft[id];
    });
    setEditorOpen(false);
    setSelected(null);
  }

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
