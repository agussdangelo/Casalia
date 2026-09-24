import "./furnitureCard.css"

interface FurnitureCardProps {
  name: string
  category: string
  thumbnail: string
  onClick: () => void
}

function FurnitureCard({ name, category, thumbnail, onClick }: FurnitureCardProps) {
  return (
    <div className="furniture-card" onClick={onClick}>
      <img src={thumbnail} alt={name} />
      <h3>{name}</h3>
      <p>{category}</p>
    </div>
  )
}

export default FurnitureCard