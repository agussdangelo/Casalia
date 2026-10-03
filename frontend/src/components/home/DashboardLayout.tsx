import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Dialog } from "./Dialog";
import { NewDesignDialog } from "./NewDesignDialog";
import { ProductCard } from "./ProductCard";
import { Brand, Icon, ReferenceImage } from "./Visuals";
import { formatPrice } from "../../data/home";
import { useHome, type Navigation } from "./useHome";

export function DashboardLayout({ children }: { children: ReactNode }) {
  const {
    userName, userInitials, modal, setModal, mobileMenuOpen, setMobileMenuOpen,
    notification, setNotification, cart, setCart, cartCount, cartTotal,
    favorites, designs, marketplaceSearch, setMarketplaceSearch, allProducts,
    changeQuantity, openNewDesign, toggleFavorite,
    activeNavigation, closeModal, resetNavigation, openEditor, navigate, createDesign,
  } = useHome();

  return <>
    <a className="skip-link" href="#main-content" onClick={(event) => { event.preventDefault(); document.getElementById("main-content")?.focus(); }}>Ir al contenido</a>
    <div className="dashboard-shell">
      {mobileMenuOpen && <button className="mobile-menu-backdrop" aria-label="Cerrar menú de navegación" onClick={() => setMobileMenuOpen(false)} />}
      <aside className={`sidebar ${mobileMenuOpen ? "sidebar-open" : ""}`} aria-label="Navegación principal">
        <div className="sidebar-inner">
          <Link className="sidebar-brand" to="/inicio" aria-label="Casalia, inicio" onClick={resetNavigation}><Brand /></Link>
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
          {children}
        </main>
      </div>
    </div>

    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-about">
          <Link to="/inicio" onClick={resetNavigation} aria-label="Casalia, volver al inicio">
            <Brand light />
          </Link>
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
                                    <div className="marketplace-product" key={product.id}><ProductCard product={product} />
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
                                  <div className="marketplace-grid">{favorites.map((product) => <ProductCard key={product.id} product={product} />)}</div>
                                  
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
