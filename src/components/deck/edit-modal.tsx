import { useState } from 'react';
import { produce } from 'immer';
import type { Card, Deck } from '../../types/types';

function createEmptyCard(): Card {
  return { front: '', back: '' };
}

function normalizeCards(cards: Card[]) {
  return cards
    .map((c) => ({ front: c.front.trim(), back: c.back.trim() }))
    .filter((c) => c.front || c.back);
}

function validateDeck(deckName: string, cards: Card[]): string | null {
  if (!deckName.trim()) {
    return 'Deck name is required.';
  } else if (normalizeCards(cards).length === 0) {
    return 'Add at least one non-empty card.';
  } else {
    return null;
  }
}

interface EditDeckModalProps {
  open: boolean;
  initialDeck?: Deck; // edit mode if provided
  onSave: (deck: Deck) => void;
  onClose: () => void;
  onDelete: (deckId: string) => void;
}

export default function EditDeckModal({
  open,
  initialDeck,
  onSave,
  onClose,
  onDelete,
}: EditDeckModalProps) {
  // Mode & key for remounting when switching
  const editing = !!initialDeck;
  const title = initialDeck ? 'Edit Deck' : 'Create Deck';

  // Initial form state
  const [name, setName] = useState(initialDeck?.name ?? '');
  const [error, setError] = useState<string | null>(null);
  const [cards, setCards] = useState<Card[]>(
    initialDeck?.cards.length ? initialDeck.cards : [createEmptyCard()]
  );

  function addCard() {
    setCards(
      produce((draft) => {
        draft.push(createEmptyCard());
      })
    );
  }

  function removeCard(index: number) {
    setCards(
      produce((draft) => {
        draft.splice(index, 1);
      })
    );
  }

  function updateCard(index: number, patch: Partial<Card>) {
    setCards(
      produce((draft) => {
        Object.assign(draft[index], patch);
      })
    );
  }

  function handleSave() {
    const err = validateDeck(name, cards);
    if (err) return setError(err);
    onSave({
      id: initialDeck?.id ?? String(Date.now()),
      name: name.trim(),
      cards: normalizeCards(cards),
    });
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <button
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label="Close"
      />

      {/* Panel */}
      <div className="relative my-8 w-[min(900px,92vw)] max-h-[calc(100vh-4rem)] overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>

        {/* Deck Name */}
        <div className="mb-4 flex items-center gap-3">
          <label className="text-sm font-medium w-20">Deck Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Classics 101"
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Cards</span>

            {/* Add Card Button */}
            <button
              type="button"
              onClick={addCard}
              className="rounded-md px-2.5 py-1.5 text-sm font-medium ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              + Add card
            </button>
          </div>

          {/* Input Front & Back of Card */}
          <div className="space-y-2">
            {cards.map((c, i) => (
              <div
                key={i}
                className="grid grid-cols-[1fr,1fr,auto] gap-2 rounded-md p-2 hover:bg-blue-50 transition"
              >
                <input
                  value={c.front}
                  onChange={(e) => updateCard(i, { front: e.target.value })}
                  placeholder="Front"
                  className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  value={c.back}
                  onChange={(e) => updateCard(i, { back: e.target.value })}
                  placeholder="Back"
                  className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-end items-center">
                  <button
                    type="button"
                    onClick={() => removeCard(i)}
                    className="rounded-md px-2.5 py-2 text-sm font-medium text-red-600 hover:bg-red-600 hover:text-white transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="mt-1 border-t border-gray-300 pt-3 flex items-center justify-between">
          {editing ? (
            <button
              type="button"
              onClick={() => onDelete(initialDeck!.id)}
              className="rounded-md px-2.5 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Delete
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-2.5 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Close Without Saving
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
