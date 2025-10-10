import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Deck } from '../types/types';
import { useStore } from '@nanostores/react';
import { currentPracticingId, decksAtom } from '../stores/decks';

function getDeckById(id: string): Deck | null {
  const deck = decksAtom.get()[id];
  return deck || null;
}

export function Practice() {
  const deckId = useStore(currentPracticingId);
  const deck = getDeckById(deckId);

  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [suppressAnim, setSuppressAnim] = useState(false);

  if (!deck) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          No deck to practice on, create a deck first!
        </h2>
        <Link
          to="/decks"
          className="rounded-xl bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition"
        >
          To Decks
        </Link>
      </div>
    );
  }

  const card = deck.cards[index];

  const handleFlip = () => setFlipped((f) => !f);

  function goTo(newIndex: number) {
    setSuppressAnim(true); // turn off flipping transition
    setFlipped(false);
    setIndex(newIndex);
    // re-enable transition on next paint
    requestAnimationFrame(() => setSuppressAnim(false));
  }

  function handleNext() {
    goTo(index + 1 < deck!.cards.length ? index + 1 : 0);
  }

  function handlePrevious() {
    goTo(index - 1 >= 0 ? index - 1 : deck!.cards.length - 1);
  }

  const progress = Math.round(((index + 1) / deck.cards.length) * 100);

  return (
    <div className="mx-auto max-w-xl p-10 text-center">
      <h1 className="text-4xl font-bold mb-10 text-gray-900">
        Practicing Deck: {deck.name}
      </h1>

      {/* card */}
      <div
        onClick={handleFlip}
        className={`relative mx-auto cursor-pointer border-blue-300 border-3 rounded-3xl text-2xl font-medium text-gray-800
            transform perspective-1000 transition-all duration-500 ease-out
            ${suppressAnim ? 'transition-none' : 'transition-all duration-500'}
            ${
              flipped
                ? 'rotate-x-180 shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-[0_0_35px_rgba(0,0,0,0.45)]'
                : 'shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-[0_0_35px_rgba(0,0,0,0.45)]'
            }`}
        style={{
          width: '100%',
          minHeight: '300px',
          maxHeight: '400px',
          transformStyle: 'preserve-3d',
          background: 'linear-gradient(145deg, #ffffff 0%, #f3f5f8 100%)',
        }}
      >
        {/* Front side */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center px-6 text-center backface-hidden transition-opacity duration-500 ${
            flipped ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ transform: 'rotateX(0deg)' }}
        >
          <span className="whitespace-pre-wrap">{card.front}</span>
          {/* corner label */}
          <span className="absolute bottom-3 left-4 text-sm text-gray-500 font-medium tracking-wide select-none">
            FRONT
          </span>
        </div>

        {/* Back side */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center px-6 text-center backface-hidden transition-opacity duration-500 ${
            flipped ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transform: 'rotateX(180deg)' }}
        >
          <span className="whitespace-pre-wrap">{card.back}</span>
          {/* corner label */}
          <span className="absolute bottom-3 left-4 text-sm text-gray-500 font-medium tracking-wide select-none">
            BACK
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-10 flex items-center justify-center gap-10">
        <button
          onClick={handlePrevious}
          className="cursor-pointer rounded-xl border border-gray-300 px-5 py-2 text-gray-700 hover:bg-blue-600 hover:text-white transition shadow-sm"
        >
          {'<'} Prev
        </button>

        <span className="text-sm font-semibold text-gray-600 tabular-nums min-w-[130px] text-center">
          Card {index + 1} of {deck.cards.length}
          <span className="text-gray-400"> ({progress}%)</span>
        </span>

        <button
          onClick={handleNext}
          className="cursor-pointer rounded-xl border border-gray-300 px-5 py-2 text-gray-700 hover:bg-blue-600 hover:text-white transition shadow-sm"
        >
          Next {'>'}
        </button>
      </div>
    </div>
  );
}
