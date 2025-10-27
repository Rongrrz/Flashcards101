const GITHUB_URL = 'https://github.com/Rongrrz/Flashcards101';
const GITHUB_TEXT = 'project on GitHub';

export function Footer() {
  return (
    <footer className="mt-auto p-4 text-center text-sm text-gray-500">
      Check out the{' '}
      <a
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-blue-500 hover:underline"
      >
        {GITHUB_TEXT}
      </a>
      .
    </footer>
  );
}
