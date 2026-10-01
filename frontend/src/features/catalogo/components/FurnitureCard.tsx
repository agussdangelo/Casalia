import type { Furniture } from '../types'

interface FurnitureCardProps {
  furniture: Furniture
  onClick: (furniture: Furniture) => void
}

function FurnitureCard({ furniture, onClick }: FurnitureCardProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(furniture)}
      className="group flex flex-col overflow-hidden rounded-xl border border-black/10 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <img
        src={furniture.thumbnail}
        alt={furniture.name}
        className="h-28 w-full bg-surface object-cover"
      />
      <span className="px-2 py-2 text-sm font-medium text-ink">
        {furniture.name}
      </span>
    </button>
  )
}

export default FurnitureCard