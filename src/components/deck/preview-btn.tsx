type PreviewDeckButtonProps = {
  name: string;
  cardCount: number;
  onClick: () => void;
};

export default function PreviewDeckButton({
  name,
  cardCount,
  onClick,
}: PreviewDeckButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`aspect-square w-full bg-white rounded-2xl flex flex-col items-center
        justify-center text-center hover:bg-blue-200 transition shadow-sm hover:shadow-md
        border-3 border-blue-300
      `}
    >
      <h3 className="text-lg font-semibold leading-snug px-2">{name}</h3>
      <p className="mt-1 text-sm text-gray-600">
        {cardCount} {cardCount === 1 ? 'card' : 'cards'}
      </p>
    </button>
  );
}
