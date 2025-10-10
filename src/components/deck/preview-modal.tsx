import { Link } from 'react-router-dom';
import type { Deck } from '../../types/types';
import { currentPracticingId } from '../../stores/decks';

type PreviewDeckModalProps = {
  deck: Deck | null;
  onClose: () => void;
  onEdit: (deck: Deck) => void;
};

export function PreviewDeckModal({
  deck,
  onClose,
  onEdit,
}: PreviewDeckModalProps) {
  if (!deck) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <button className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Panel */}
      <div className="relative mx-auto mt-24 w-[min(800px,92vw)] rounded-lg bg-white p-6">
        <div className="flex items-baseline justify-between">
          <div>
            <h2 className="text-lg font-semibold leading-tight">
              Previewing Deck: {deck.name}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {deck.cards.length} {deck.cards.length === 1 ? 'card' : 'cards'}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            onClick={() => currentPracticingId.set(deck.id)}
            to="/practice"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Practice
          </Link>
          <button
            onClick={() => deck && onEdit(deck)}
            className="rounded-md px-4 py-2 text-sm font-medium ring-1 ring-inset ring-gray-200 hover:bg-gray-50"
          >
            Edit deck
          </button>
        </div>

        {/* Preview deck content area */}
        <div className="mt-6 rounded-md border border-gray-200 p-4">
          {deck.cards.length ? (
            <ul className="list-disc pl-5 text-sm">
              {deck.cards.slice(0, 5).map((c, i) => (
                <li key={i}>
                  <span className="font-medium">{c.front}</span> --- {c.back}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-600">No cards yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
