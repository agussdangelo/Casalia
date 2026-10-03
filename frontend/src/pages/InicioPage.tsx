import { DashboardLayout } from "../components/home/DashboardLayout";
import { ProductCard } from "../components/home/ProductCard";
import { Icon, ReferenceImage } from "../components/home/Visuals";
import { useHome } from "../components/home/useHome";
import { budgetProducts, formatPrice, roomPreview } from "../data/home";

export default function InicioPage() {
  const {
    firstName, welcomeDate, designs, cartCount, favorites, setModal,
    openNewDesign, openEditor, navigate, toggleFavorite,
  } = useHome();

  return <DashboardLayout>
    <section className="welcome-section" aria-labelledby="welcome-heading">
      <div className="welcome-copy">
        <p className="welcome-date">{welcomeDate}</p>
        <h1 id="welcome-heading">{firstName ? `Hola, ${firstName}` : "Hola"}</h1>
        <p className="welcome-description">Tenés {designs.length} diseños guardados y {cartCount} productos esperando en el carrito.</p>
        <div className="welcome-actions flex flex-wrap gap-2">
          <button className="button button-primary" onClick={openNewDesign}>+ Nuevo diseño</button>
          <button className="button button-outline" onClick={() => navigate("Marketplace")}>Explorar marketplace</button>
        </div>
      </div>
      <article className="resume-card"><ReferenceImage region={roomPreview} alt="Vista 3D del living de Depto Palermo, con un sofá terracota, mesa ratona y lámpara de pie" className="resume-image" /><div className="resume-info"><p className="eyebrow">RETOMÁ TU DISEÑO</p><h2>Depto Palermo</h2><p className="resume-description">Living comedor · editado hace 2 min</p><div className="budget-summary"><p>Presupuesto</p><div className="budget-amount"><strong>{formatPrice(1842500)}</strong><span> de $ 2.000.000</span></div><div className="budget-track" role="progressbar" aria-label="Presupuesto utilizado" aria-valuenow={1842500} aria-valuemin={0} aria-valuemax={2000000}><span /></div><p className="budget-remaining">Te quedan $ 157.500</p></div><button className="button button-dark" onClick={() => openEditor(designs.find((design) => design.id === "palermo")!)}>Abrir editor <span aria-hidden="true">›</span></button></div></article>
    </section>

    <div className="home-content">
      <section className="designs-section" aria-labelledby="designs-heading">
        <div className="section-heading flex items-end justify-between gap-4">
          <div>
            <h2 id="designs-heading">Tus diseños</h2>
            <p>{designs.length} de 5 del Plan Basic</p>
          </div>
          <button className="text-link" onClick={() => navigate("Mis diseños")}>Ver todos
            <span aria-hidden="true">›</span>
            </button>
        </div>
        <div className="design-grid">{designs.slice(0, 4).map((design) =>
          <button className="design-card text-left" key={design.id} onClick={() => openEditor(design)} aria-label={`Abrir diseño ${design.name}`}><ReferenceImage region={design.image} alt={design.name} className="design-image" /><div className="design-info"><h3>{design.name}</h3><p className="design-description">{design.description}</p><div className="design-meta flex items-center justify-between gap-2"><span>{design.price === null ? "Sin presupuesto" : formatPrice(design.price)}</span><time>{design.updated}</time></div></div></button>)}</div></section>

      <section className="recommendations-section" aria-labelledby="recommendations-heading">
        <div className="recommendations-heading section-heading">
          <div>
            <h2 id="recommendations-heading">Entran en tu presupuesto</h2>
            <p>Productos para Depto Palermo por menos de $ 157.500</p>
          </div>
          <button className="text-link" onClick={() => navigate("Marketplace")}>Ir al marketplace
            <span aria-hidden="true">›</span>
            </button></div><div className="recommendations-grid"><div className="product-grid">{budgetProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div><aside className="favorites-card" aria-labelledby="favorites-heading"><div className="favorites-heading flex items-center justify-between gap-2"><h2 id="favorites-heading">Tus favoritos</h2><button className="text-link" onClick={() => setModal("favorites")}>Ver todos <span aria-hidden="true">›</span></button></div><div className="favorite-list">{favorites.slice(0, 3).map((product) => <div className="favorite-row flex items-center gap-2.5" key={product.id}><ReferenceImage region={product.image} alt={product.name} className="favorite-image" /><button className="favorite-product text-left" onClick={() => setModal("favorites")}><h3>{product.name}</h3><p>{formatPrice(product.price)}</p></button><button className="favorite-heart" aria-label={`Quitar ${product.name} de favoritos`} aria-pressed="true" onClick={() => toggleFavorite(product)}><Icon name="heart" filled /></button></div>)}{favorites.length === 0 && <p className="empty-favorites">Guardá tus productos favoritos desde el marketplace.</p>}</div></aside></div></section>
    </div>
  </DashboardLayout>;
}
