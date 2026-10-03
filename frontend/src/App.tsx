import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Dialog } from "./components/home/Dialog";
import { MyDesigns } from "./components/home/MyDesigns";
import { NewDesignDialog } from "./components/home/NewDesignDialog";
import { Brand, Icon, ReferenceImage } from "./components/home/Visuals";
import { budgetProducts, favoriteProducts, formatPrice, initialDesigns, roomPreview, type Design, type Product } from "./data/home";
import "./App.css";
import "./Editor.css";

const Editor = lazy(() => import("./pages/EditorPage"));
type Modal = "new-design" | "cart" | "marketplace" | "messages" | "profile" | "plan" | "favorites" | null;
type CartItem = { product: Product; quantity: number };
type Navigation = "Inicio" | "Mis diseños" | "Marketplace" | "Mensajes";
type Page = "home" | "designs" | "editor";
type AppProps = { currentUser?: { name: string } | null };

function currentPage(): Page {
  if (window.location.hash.startsWith("#/editor")) return "editor";
  if (window.location.hash.startsWith("#/mis-disenos")) return "designs";
  return "home";
}

const startingCart: CartItem[] = [...budgetProducts, favoriteProducts[0]].map((product) => ({ product, quantity: 1 }));
const allProducts = [...budgetProducts, ...favoriteProducts];

function readDesigns(): Design[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem("casalia-designs") ?? "null");
    if (Array.isArray(value)) {
      const saved = value.flatMap((item: unknown): Design[] => {
        if (!item || typeof item !== "object") return [];
        const data = item as Record<string, unknown>;
        if (typeof data.id !== "string" || !/^design-\d+$/.test(data.id) ||
          typeof data.name !== "string" || !data.name.trim() || data.name.length > 60 ||
          typeof data.budget !== "number" || !Number.isSafeInteger(data.budget) || data.budget <= 0 ||
          typeof data.createdAt !== "string" || Number.isNaN(Date.parse(data.createdAt))) return [];
        return [{ id: data.id, name: data.name, description: "Diseño · sin elementos aún", price: data.budget, budget: data.budget, createdAt: data.createdAt, updated: "recién creado", image: roomPreview }];
      });
      return [...saved.slice(0, 5 - initialDesigns.length), ...initialDesigns];
    }
  } catch { /* Los diseños predeterminados siguen estando disponibles si no hay almacenamiento disponible. */ }
  return initialDesigns;
}

function readCart(): CartItem[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem("casalia-cart") ?? "null");
    if (Array.isArray(value)) return value.flatMap((item: { id?: string; quantity?: number }) => {
      const product = allProducts.find((candidate) => candidate.id === item?.id);
      return product && Number.isInteger(item.quantity) && item.quantity! > 0 && item.quantity! <= 99 ? [{ product, quantity: item.quantity! }] : [];
    });
  } catch { /* El carrito predeterminado permanece disponible si el almacenamiento no está disponible. */ }
  return startingCart;
}

export default function App({ currentUser = null }: AppProps) {
  const [today, setToday] = useState(() => new Date());
  const userName = currentUser?.name.trim() ?? "";
  const firstName = userName.split(/\s+/)[0];
  const userInitials = userName.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toLocaleUpperCase("es-AR");
  const welcomeDate = new Intl.DateTimeFormat("es-AR", {
    weekday: "long", day: "numeric", month: "long",
  }).format(today).replace(/,/g, "").toLocaleUpperCase("es-AR");
  const [page, setPage] = useState<Page>(currentPage);
  const [activeNavigation, setActiveNavigation] = useState<Navigation>(() => currentPage() === "designs" ? "Mis diseños" : "Inicio");
  const [modal, setModal] = useState<Modal>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(() => currentPage() === "home" ? "Sesión iniciada" : null);
  const [cart, setCart] = useState<CartItem[]>(readCart);
  const [favorites, setFavorites] = useState(favoriteProducts);
  const [designs, setDesigns] = useState<Design[]>(readDesigns);
  const [marketplaceSearch, setMarketplaceSearch] = useState("");
  const [editorDesign, setEditorDesign] = useState<Design>(initialDesigns[0]);
  const notificationTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const timer = window.setInterval(() => setToday(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      const nextPage = currentPage();
      setPage(nextPage);
      if (nextPage !== "editor") setActiveNavigation(nextPage === "designs" ? "Mis diseños" : "Inicio");
    };
    window.addEventListener("hashchange", onHashChange);
    return () => { window.removeEventListener("hashchange", onHashChange); clearTimeout(notificationTimer.current); };
  }, []);

  useEffect(() => {
    try { localStorage.setItem("casalia-cart", JSON.stringify(cart.map(({ product, quantity }) => ({ id: product.id, quantity })))); } catch { /* Cart remains usable without storage. */ }
  }, [cart]);

  // 1. Guardar en localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        "casalia-designs",
        JSON.stringify(
          designs
            .filter((design) => design.id.startsWith("design-"))
            .map(({ id, name, budget, createdAt }) => ({ id, name, budget, createdAt }))
        )
      );
    } catch {
      /* Los diseños se siguen usando sin necesidad de almacenamiento. */
    }
  }, [designs]);

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  function notify(message: string) {
    clearTimeout(notificationTimer.current);
    setNotification(message);
    notificationTimer.current = setTimeout(() => setNotification(null), 4000);
  }

  function addToCart(product: Product) {
    setCart((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      return existing ? current.map((item) => item.product.id === product.id ? { ...item, quantity: Math.min(item.quantity + 1, 99) } : item) : [...current, { product, quantity: 1 }];
    });
    notify(`${product.name} agregado al carrito`);
  }

  function changeQuantity(id: string, difference: number) {
    setCart((current) => current.map((item) => item.product.id === id ? { ...item, quantity: Math.min(item.quantity + difference, 99) } : item).filter((item) => item.quantity > 0));
  }

  function openNewDesign() {
    setMobileMenuOpen(false);
    setModal("new-design");
  }

  function closeModal() {
    setModal(null);
    setActiveNavigation(page === "designs" ? "Mis diseños" : "Inicio");
  }

  function openEditor(design: Design) {
    setEditorDesign(design);
    setModal(null);
    setMobileMenuOpen(false);
    setPage("editor");
    window.location.hash = `/editor/${design.id}`;
    window.scrollTo(0, 0);
  }

  function navigate(destination: Navigation) {
    setActiveNavigation(destination);
    setMobileMenuOpen(false);
    if (destination === "Inicio" || destination === "Mis diseños") {
      const nextPage = destination === "Inicio" ? "home" : "designs";
      setPage(nextPage);
      setModal(null);
      setNotification(null);
      window.location.hash = nextPage === "home" ? "/" : "/mis-disenos";
      window.scrollTo(0, 0);
    }
    if (destination === "Marketplace") setModal("marketplace");
    if (destination === "Mensajes") setModal("messages");
  }

  function createDesign(name: string, budget: number) {
    if (designs.length >= 5) return;
    const design: Design = { id: `design-${Date.now()}`, name, description: "Diseño · sin elementos aún", price: budget, budget, createdAt: new Date().toISOString(), updated: "recién creado", image: roomPreview };
    setDesigns((current) => [design, ...current]);
    openEditor(design);
  }

  function toggleFavorite(product: Product) {
    setFavorites((current) => current.some((item) => item.id === product.id) ? current.filter((item) => item.id !== product.id) : [...current, product]);
  }

  function productCard(product: Product) {
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

  if (page === "editor") return (
  <div className="editor-page">
    <header className="editor-header flex items-center justify-between gap-4">
      <a href="#/" className="editor-back flex items-center gap-3" aria-label="Volver al inicio de Casalia" onClick={() => navigate("Inicio")}>
        <Brand />
        <span>← Volver al inicio</span>
      </a>
      <span className="editor-design-name">{editorDesign.name}</span>
      <button className="cart-button" aria-label="Volver al inicio" onClick={() => navigate("Inicio")}>
        <Icon name="close" />
      </button>
    </header>
    <Suspense fallback={<div className="editor-loading">Preparando tu espacio…</div>}>
      <Editor />
    </Suspense>
  </div>);

  return <>
    <a className="skip-link" href="#main-content" onClick={(event) => { event.preventDefault(); document.getElementById("main-content")?.focus(); }}>Ir al contenido</a>
    <div className="dashboard-shell">
      {mobileMenuOpen && <button className="mobile-menu-backdrop" aria-label="Cerrar menú de navegación" onClick={() => setMobileMenuOpen(false)} />}
      <aside className={`sidebar ${mobileMenuOpen ? "sidebar-open" : ""}`} aria-label="Navegación principal">
        <div className="sidebar-inner">
          <a className="sidebar-brand" href="#/" aria-label="Casalia, inicio" onClick={() => navigate("Inicio")}><Brand /></a>
          <button className="sidebar-new-button" onClick={openNewDesign}>+ Nuevo diseño</button>
          <nav className="sidebar-nav" aria-label="Secciones">{(["Inicio", "Mis diseños", "Marketplace", "Mensajes"] as Navigation[]).map((item) => <button key={item} className={`nav-item ${activeNavigation === item ? "nav-item-active" : ""}`} onClick={() => navigate(item)} aria-current={activeNavigation === item ? "page" : undefined}>{item}{item === "Mensajes" && <span className="message-count">3</span>}</button>)}</nav>
          <div className="sidebar-bottom">
            <section className="plan-card" aria-label="Uso de tu plan"><h2>Plan basic</h2><div className="plan-label flex justify-between"><span>Diseños</span><span>{designs.length} de 5</span></div><div className="plan-track" role="progressbar" aria-label="Diseños utilizados" aria-valuenow={designs.length} aria-valuemin={0} aria-valuemax={5}><span style={{ width: `${Math.min(designs.length / 5 * 100, 100)}%` }} /></div><div className="plan-label flex justify-between"><span>Modelos propios</span><span>1 de 3</span></div><div className="plan-track" role="progressbar" aria-label="Modelos propios utilizados" aria-valuenow={1} aria-valuemin={0} aria-valuemax={3}><span style={{ width: "33.33%" }} /></div><button className="upgrade-link" onClick={() => setModal("plan")}>Pasar a Pro</button></section>
            <button className="profile-button flex items-center" onClick={() => setModal("profile")}><span className="profile-avatar">{userInitials || "U"}</span><span className="profile-copy"><strong>{userName || "Mi cuenta"}</strong><span>Mi perfil</span></span><Icon name="chevron" /></button>
          </div>
        </div>
      </aside>

      <div className="dashboard-main">
        <header className="topbar flex items-center justify-between">
          <div className="mobile-brand flex items-center gap-3">
            <button className="icon-button" aria-label="Abrir menú" aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen(true)}>
              <Icon name="menu" />
            </button>
            <Brand />
          </div>
          
          <button className="cart-button" onClick={() => setModal("cart")} aria-label={`Abrir carrito, ${cartCount} productos`}>
            <Icon name="cart" />
            <span className="cart-count">{cartCount}</span>
          </button>
        </header>

        <main id="main-content" tabIndex={-1}>
          {page === "designs" ? <MyDesigns designs={designs} onOpenDesign={openEditor} onNewDesign={openNewDesign} /> : <>
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
                    </button></div><div className="recommendations-grid"><div className="product-grid">{budgetProducts.map(productCard)}</div><aside className="favorites-card" aria-labelledby="favorites-heading"><div className="favorites-heading flex items-center justify-between gap-2"><h2 id="favorites-heading">Tus favoritos</h2><button className="text-link" onClick={() => setModal("favorites")}>Ver todos <span aria-hidden="true">›</span></button></div><div className="favorite-list">{favorites.slice(0, 3).map((product) => <div className="favorite-row flex items-center gap-2.5" key={product.id}><ReferenceImage region={product.image} alt={product.name} className="favorite-image" /><button className="favorite-product text-left" onClick={() => setModal("favorites")}><h3>{product.name}</h3><p>{formatPrice(product.price)}</p></button><button className="favorite-heart" aria-label={`Quitar ${product.name} de favoritos`} aria-pressed="true" onClick={() => toggleFavorite(product)}><Icon name="heart" filled /></button></div>)}{favorites.length === 0 && <p className="empty-favorites">Guardá tus productos favoritos desde el marketplace.</p>}</div></aside></div></section>
            </div>
            </>
          }
        </main>
      </div>
    </div>

    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-about">
          <a href="#/" onClick={() => navigate("Inicio")} aria-label="Casalia, volver al inicio">
            <Brand light />
          </a>
          <p>Diseñá tu espacio en 3D, probalo en tu casa y<br className="desktop-break" /> comprá todo en un mismo lugar.</p>
        </div>
        
        <nav aria-label="Navegación del pie">
          <h2>NAVEGACIÓN</h2>
          <button onClick={() => navigate("Inicio")}>Inicio</button>
          <button onClick={() => navigate("Mis diseños")}>Mis diseños</button>
        </nav>
        
        <nav aria-label="Producto">
          <h2>PRODUCTO</h2>
          <button onClick={() => navigate("Marketplace")}>Marketplace</button>
        </nav>
        
        <div className="footer-contact">
          <h2>ESCRIBINOS</h2>
          <div className="social-links flex flex-wrap gap-2">
            <a className="social-link whatsapp-link flex items-center gap-2" href="https://wa.me/?text=Hola%2C%20quiero%20consultar%20sobre%20Casalia" target="_blank" rel="noreferrer">
            <Icon name="whatsapp" />WhatsApp</a>
            <a className="social-link instagram-link flex items-center gap-2" href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            <Icon name="instagram" />Instagram</a>
          </div>
          <a className="contact-email" href="mailto:hola@casalia.com.ar">hola@casalia.com.ar</a>
        </div>
      </div>
      
      <div className="footer-bottom flex items-center justify-between gap-4">
        <p>© 2026 Casalia · Buenos Aires, Argentina</p><p>Hecho en Argentina</p>
      </div>
    </footer>

    {notification &&  <div className="notification flex items-center gap-2" role="status">
                        <span className="notification-check flex items-center justify-center">
                          <Icon name="check" />
                        </span>
                        <span>{notification}</span>
                        <button aria-label="Cerrar notificación" onClick={() => setNotification(null)}>
                          <Icon name="close" />
                        </button>
                      </div>
    }

    {
    modal === "new-design" && <NewDesignDialog designCount={designs.length} onClose={closeModal} onCreate={createDesign} onViewPlans={() => setModal("plan")} />
    }
    
    {
    modal === "cart" &&  <Dialog title={`Tu carrito (${cartCount})`} onClose={closeModal} drawer>
                            <p className="dialog-description">Todo lo que elegiste para tu espacio.</p>
                            <div className="cart-items">{cart.map(({ product, quantity }) => 
                              <article className="cart-item" key={product.id}>
                                <ReferenceImage region={product.image} alt={product.name} className="cart-item-image" />

                                <div>
                                  <h3>{product.name}</h3>
                                  <p>{formatPrice(product.price)}</p>
                                  <div className="quantity-control flex items-center gap-3">
                                    <button className="icon-button" aria-label={`Quitar una unidad de ${product.name}`} onClick={() => changeQuantity(product.id, -1)}>
                                      <Icon name="minus" />
                                    </button>
                                    <span>{quantity}</span>
                                    <button className="icon-button" aria-label={`Agregar una unidad de ${product.name}`} onClick={() => changeQuantity(product.id, 1)}>
                                      <Icon name="plus" />
                                    </button>
                                  </div>
                                </div>
                                
                                <button className="icon-button" aria-label={`Eliminar ${product.name} del carrito`} onClick={() => setCart((current) => current.filter((item) => item.product.id !== product.id))}>
                                  <Icon name="close" />
                                </button>
                              </article>)}
                            </div>
                            
                            {cart.length ? 
                            <div className="cart-total flex justify-between">
                              <span>Total</span>
                              <strong>{formatPrice(cartTotal)}</strong>
                            </div> : <p className="dialog-description">Tu carrito está vacío. Encontrá algo que te encante en el marketplace.</p>}
                            <button className="button button-primary w-full" onClick={() => setModal("marketplace")}>Seguir explorando</button>
                          </Dialog>
    }

    {
    modal === "marketplace" && <Dialog title="Encontrá eso que le falta a tu espacio" onClose={closeModal}>
                                  <p className="dialog-description">Muebles y objetos elegidos para vos.</p>
                                  <input className="marketplace-search" aria-label="Buscar productos" placeholder="Buscar un producto o creador…" value={marketplaceSearch} onChange={(event) => setMarketplaceSearch(event.target.value)} />
                                  <div className="marketplace-grid">{allProducts.filter((product) => `${product.name} ${product.maker}`.toLocaleLowerCase("es").includes(marketplaceSearch.toLocaleLowerCase("es"))).map((product) => 
                                    <div className="marketplace-product" key={product.id}>{productCard(product)}
                                      <button className="marketplace-favorite flex items-center gap-2" onClick={() => toggleFavorite(product)} aria-pressed={favorites.some((item) => item.id === product.id)}>
                                        <Icon name="heart" filled={favorites.some((item) => item.id === product.id)} />{favorites.some((item) => item.id === product.id) ? "En tus favoritos" : "Guardar favorito"}
                                      </button>
                                    </div>)}
                                  </div>
                                  
                                  {!allProducts.some((product) => `${product.name} ${product.maker}`.toLocaleLowerCase("es").includes(marketplaceSearch.toLocaleLowerCase("es"))) && 
                                  <p className="dialog-description">No encontramos productos con esa búsqueda.</p>}
                                </Dialog>
    }

    {
    modal === "favorites" &&   <Dialog title="Tus favoritos" onClose={closeModal}>
                                  <p className="dialog-description">Esos detalles que hacen tu espacio único.</p>
                                  <div className="marketplace-grid">{favorites.map(productCard)}</div>
                                  
                                  {favorites.length === 0 && 
                                    <p className="dialog-description">Todavía no tenés favoritos. Explorá el marketplace para guardar productos.</p>
                                  }
                                </Dialog>
    }
    
    {
    modal === "messages" && <Dialog title="Mensajes" onClose={closeModal}>
                              <p className="dialog-description">Tenés 3 mensajes pendientes. Los mensajes de tus diseños estarán disponibles al conectar tu cuenta.</p>
                              <button className="button button-dark w-full" onClick={() => openEditor(designs[0])}>Abrir mi diseño</button>
                            </Dialog>
    }
    
    {
    modal === "profile" && <Dialog title="Mi perfil" onClose={closeModal}>
                              <div className="profile-detail flex items-center gap-4">
                                <span className="profile-avatar">{userInitials || "U"}</span>
                                <div>
                                  <h3>{userName || "Mi cuenta"}</h3>
                                  <p className="dialog-description">Plan Basic · Buenos Aires, Argentina</p>
                                </div>
                              </div>
                              <button className="button button-outline w-full" onClick={() => setModal("plan")}>Ver mi plan</button>
                            </Dialog>
    }
    
    {
    modal === "plan" && <Dialog title="Más espacio para tus ideas" onClose={closeModal}>
                          <p className="dialog-description">Tu Plan Basic incluye 5 diseños y 3 modelos propios. Contactanos para conocer las opciones del Plan Pro.</p>
                          <a className="button button-primary w-full" href="mailto:hola@casalia.com.ar?subject=Consulta%20Plan%20Pro">Consultar por Plan Pro</a>
                        </Dialog>
    }
  </>;
}

