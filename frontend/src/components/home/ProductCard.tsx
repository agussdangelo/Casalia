import { formatPrice, type Product } from "../../data/home";
import { Icon, ReferenceImage } from "./Visuals";
import { useHome } from "./useHome";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useHome();
  return <article className="product-card" key={product.id}>
    <ReferenceImage region={product.image} alt={product.name} className="product-image" />
    <div className="product-info">
      <h3>{product.name}</h3>
      <p className="product-maker">{product.maker}</p>
      <p className="product-price">{formatPrice(product.price)}</p>
      <button className="add-cart-button flex items-center justify-center gap-1.5" onClick={() => addToCart(product)}>
        <Icon name="cart" />Agregar al carrito
      </button>
    </div>
  </article>;
}
