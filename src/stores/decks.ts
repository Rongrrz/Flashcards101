import { computed } from 'nanostores';
import { persistentAtom } from '@nanostores/persistent';
import { produce } from 'immer';
import type { DecksState } from '../types/types';

const STORAGE_KEY = 'fc:decks:v1';

// Persistent global store for decks
export const decksAtom = persistentAtom<DecksState>(
  STORAGE_KEY,
  {},
  {
    encode: JSON.stringify,
    decode: (raw) => {
      try {
        const parsed = JSON.parse(raw) as unknown;
        if (parsed && typeof parsed === 'object') {
          return parsed as DecksState;
        }
      } catch {
        /* empty */
      }
      return {};
    },
  }
);

export const deckListOrdered = computed(decksAtom, (map) => {
  const list = Object.values(map);
  // Add sorting here if needed
  return list;
});

export function updateDecks(mutator: (draft: DecksState) => void) {
  decksAtom.set(produce(decksAtom.get(), mutator));
}
