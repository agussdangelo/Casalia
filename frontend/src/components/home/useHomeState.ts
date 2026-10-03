import { useEffect, useRef, useState } from "react";
import { budgetProducts, favoriteProducts, initialDesigns, roomPreview, type Design, type Product } from "../../data/home";

type Modal = "new-design" | "cart" | "messages" | "profile" | "plan" | "favorites" | null;
type CartItem = { product: Product; quantity: number };

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

function savedProduct(value: unknown): Product | undefined {
  if (!value || typeof value !== "object") return undefined;
  const { id, name, maker, price, image } = value as Record<string, unknown>;
  return typeof id === "string" && typeof name === "string" && typeof maker === "string" && typeof price === "number" && typeof image === "string" ? { id, name, maker, price, image } : undefined;
}

function readCart(): CartItem[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem("casalia-cart") ?? "null");
    if (Array.isArray(value)) return value.flatMap((item: { id?: string; quantity?: number; product?: unknown }) => {
      const product = allProducts.find((candidate) => candidate.id === item?.id) ?? savedProduct(item?.product);
      return product && Number.isInteger(item.quantity) && item.quantity! > 0 && item.quantity! <= 99 ? [{ product, quantity: item.quantity! }] : [];
    });
  } catch { /* El carrito predeterminado permanece disponible si el almacenamiento no está disponible. */ }
  return startingCart;
}

export function useHomeState(currentUser: { name: string } | null = null) {
  const [today, setToday] = useState(() => new Date());
  const userName = currentUser?.name.trim() ?? "";
  const firstName = userName.split(/\s+/)[0];
  const userInitials = userName.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toLocaleUpperCase("es-AR");
  const welcomeDate = new Intl.DateTimeFormat("es-AR", {
    weekday: "long", day: "numeric", month: "long",
  }).format(today).replace(/,/g, "").toLocaleUpperCase("es-AR");
  const [modal, setModal] = useState<Modal>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(() => window.location.pathname === "/inicio" ? "Sesión iniciada" : null);
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

  useEffect(() => () => clearTimeout(notificationTimer.current), []);

  useEffect(() => {
    try { localStorage.setItem("casalia-cart", JSON.stringify(cart.map(({ product, quantity }) => ({ id: product.id, quantity, ...(typeof product.image === "string" && { product }) })))); } catch { /* Cart remains usable without storage. */ }
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

  function toggleFavorite(product: Product) {
    setFavorites((current) => current.some((item) => item.id === product.id) ? current.filter((item) => item.id !== product.id) : [...current, product]);
  }

  return {
    userName, firstName, userInitials, welcomeDate,
    modal, setModal, mobileMenuOpen, setMobileMenuOpen,
    notification, setNotification, cart, setCart, cartCount, cartTotal,
    favorites, designs, setDesigns, marketplaceSearch, setMarketplaceSearch,
    editorDesign, setEditorDesign, allProducts,
    addToCart, changeQuantity, openNewDesign, toggleFavorite,
  };
}
