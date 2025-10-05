import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <section className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-800 md:text-5xl">
          Welcome to <span className="text-blue-600">Flashcards101</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          No distractions, no account creations!
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/practice"
            className="rounded bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
          >
            🚀 Start Practicing
          </Link>
          <Link
            to="/decks"
            className="rounded border-2 border-gray-300 px-6 py-3 transition hover:bg-gray-100"
          >
            📚 Browse Decks
          </Link>
        </div>
      </section>
    </div>
  );
}
