import { useEffect, useRef, useState } from 'react';
import { updateDecks } from '../../stores/decks';
import type { Deck, Card } from '../../types/types';
import { generateId } from '../../utils/generateId';

interface ImportDecksModalProps {
  open: boolean;
  onClose: () => void;
}

export function ImportDecksModal({ open, onClose }: ImportDecksModalProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!open) return;
    setFileName(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
  }, [open]);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setError(null);

    try {
      const text = await file.text();
      const json = JSON.parse(text);

      // Expecting: [{ name, cards: [{ front, back }] }]
      if (!Array.isArray(json)) throw new Error('Invalid file format');

      const importedDecks: Record<string, Deck> = {};
      for (const d of json) {
        if (!d || typeof d !== 'object' || !d.name || !Array.isArray(d.cards)) {
          // Skip invalid entries instead of failing the whole import
          continue;
        }
        const id = generateId();
        importedDecks[id] = {
          id,
          name: String(d.name),
          cards: (d.cards as Card[]).map((c) => ({
            front: c?.front ?? '',
            back: c?.back ?? '',
          })),
        };
      }

      // If nothing valid, show error
      if (Object.keys(importedDecks).length === 0) {
        throw new Error('No valid decks found in file.');
      }

      updateDecks((draft) => Object.assign(draft, importedDecks));
      onClose();
    } catch (err) {
      console.error(err);
      setError('Failed to import. Please check the JSON format.');
    }
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label="Close"
      />
      <div className="relative my-8 w-[min(600px,92vw)] rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-lg font-semibold">Import Decks</h2>

        <div className="flex flex-col items-start gap-3">
          <input
            ref={inputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-700
                       file:mr-4 file:rounded-md file:border-0
                       file:bg-blue-600 file:px-4 file:py-2
                       file:text-sm file:font-semibold file:text-white
                       hover:file:bg-blue-700"
          />
          {fileName && (
            <p className="text-sm text-gray-600">Selected file: {fileName}</p>
          )}
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}
