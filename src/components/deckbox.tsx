type DeckBoxProps = {
  name: string;
  cardCount: number;
  href: string;
};

export default function DeckBox({ name, cardCount, href }: DeckBoxProps) {
  return (
    <a
      href={href}
      className={`aspect-square w-full bg-blue-200 rounded-2xl flex flex-col items-center
        justify-center text-center hover:bg-blue-300 transition shadow-sm hover:shadow-md
      `}
    >
      <h3 className="text-lg font-semibold leading-snug px-2">{name}</h3>

      {/* Count of cards in deck */}
      <p className="mt-1 text-sm text-gray-600">
        {cardCount} {cardCount === 1 ? 'card' : 'cards'}
      </p>
    </a>
  );
}
