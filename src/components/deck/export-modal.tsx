import { useEffect, useMemo, useState } from 'react';
import { useStore } from '@nanostores/react';
import type { Deck } from '../../types/types';
import { decksAtom } from '../../stores/decks';

function decksToJSON(decks: Deck[]) {
  const deckStrippedId: Omit<Deck, 'id'>[] = decks.map((deck) => {
    return { name: deck.name, cards: deck.cards };
  });
  return JSON.stringify(deckStrippedId, null, 2);
}

function downloadJson(filename: string, data: string) {
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

interface ExportDecksModalProps {
  open: boolean;
  onClose: () => void;
}

export function ExportDecksModal({ open, onClose }: ExportDecksModalProps) {
  const decksRecord = useStore(decksAtom);
  const allDecks = useMemo(
    () => Object.values(decksRecord || {}),
    [decksRecord]
  );

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [fileBase, setFileBase] = useState('flashcards_export');

  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectedDecks = useMemo(
    () => allDecks.filter((d) => selected.has(d.id)),
    [selected, allDecks]
  );

  const exportData = useMemo(() => decksToJSON(selectedDecks), [selectedDecks]);
  const filename = fileBase.trim()
    ? `${fileBase}.json`
    : 'flashcards_export.json';

  useEffect(() => {
    if (open) setSelected(new Set());
  }, [open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label="Close"
      />

      <div className="relative my-8 w-[min(700px,92vw)] max-h-[calc(100vh-4rem)] overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-lg font-semibold">Export Decks</h2>
        </div>

        <ul className="max-h-[40vh] space-y-1 overflow-auto pr-1">
          {allDecks.map((d) => {
            const inputId = `deck-${d.id}`;
            return (
              <li key={d.id}>
                <label
                  htmlFor={inputId}
                  className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-50"
                >
                  <input
                    id={inputId}
                    type="checkbox"
                    checked={selected.has(d.id)}
                    onChange={() => toggleOne(d.id)}
                    className="h-4 w-4"
                  />
                  <span className="truncate text-sm text-gray-800">
                    {d.name}{' '}
                    <span className="text-gray-400">
                      ({d.cards.length} cards)
                    </span>
                  </span>
                </label>
              </li>
            );
          })}
          {allDecks.length === 0 && (
            <li className="py-6 text-sm text-gray-500">No decks yet.</li>
          )}
        </ul>

        <div className="mt-6">
          <label
            htmlFor="export-filename"
            className="block text-sm font-medium text-gray-800"
          >
            File Name:
          </label>
          <input
            id="export-filename"
            value={fileBase}
            onChange={(e) => setFileBase(e.target.value.replace(/\s+/g, '_'))}
            className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="mt-4 grid grid-cols-1 gap-2">
            <button
              type="button"
              disabled={selected.size === 0}
              onClick={() => downloadJson(filename, exportData)}
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Download .JSON File
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
