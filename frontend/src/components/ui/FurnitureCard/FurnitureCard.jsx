// FurnitureCard recibe "props" — un objeto con los datos que le pasan desde afuera.
// Acá lo estamos "desestructurando" directo en los parámetros: { name, category, thumbnail }
import "./furnitureCard.css";

function FurnitureCard({ name, category, thumbnail, onClick }) {
  return (
    <div className="furniture-card" onClick={onClick}>
      <img src={thumbnail} alt={name} />
      <h3>{name}</h3>
      <p>{category}</p>
    </div>
  );
}

export default FurnitureCard;