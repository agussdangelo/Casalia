export type ImageRegion = {
  source: "home" | "products" | "designs";
  x: number;
  y: number;
  width: number;
  height: number;
};

export type Design = {
  id: string;
  name: string;
  description: string;
  price: number | null;
  updated: string;
  createdAt: string;
  budget?: number;
  image: ImageRegion;
};

export type Product = {
  id: string;
  name: string;
  maker: string;
  price: number;
  image: ImageRegion | string;
};

export const roomPreview: ImageRegion = { source: "home", x: 585, y: 92, width: 261, height: 224 };

export const initialDesigns: Design[] = [
  { id: "palermo", name: "Depto Palermo", description: "Living comedor · 48 m²", price: 1842500, budget: 2000000, updated: "hace 2 min", createdAt: "2026-09-12", image: { source: "designs", x: 204, y: 152, width: 273, height: 127 } },
  { id: "belgrano", name: "Cocina Belgrano", description: "Cocina comedor · 32 m²", price: 2310000, updated: "hace 1 sem", createdAt: "2026-09-03", image: { source: "designs", x: 494, y: 152, width: 272, height: 127 } },
  { id: "dormitorio", name: "Dormitorio principal", description: "Dormitorio · sin elementos aún", price: null, updated: "ayer", createdAt: "2026-09-20", image: { source: "designs", x: 784, y: 152, width: 271, height: 127 } },
  { id: "nunez", name: "Oficina Núñez", description: "Oficina · 26 m²", price: 980400, updated: "hace 2 sem", createdAt: "2026-08-15", image: { source: "designs", x: 204, y: 382, width: 273, height: 127 } },
];

export const budgetProducts: Product[] = [
  { id: "lamp", name: "Lámpara Colgante Arco", maker: "Carla Benítez", price: 68900, image: { source: "products", x: 205, y: 383, width: 182, height: 93 } },
  { id: "rug", name: "Alfombra Trama 2x3", maker: "Nicolás Ríos", price: 142000, image: { source: "products", x: 402, y: 383, width: 182, height: 93 } },
  { id: "pouf", name: "Puff Arena", maker: "Sofía Méndez", price: 78000, image: { source: "products", x: 599, y: 383, width: 181, height: 93 } },
];

export const favoriteProducts: Product[] = [
  { id: "chair", name: "Butaca Nórdica Pana", maker: "Colección Nórdica", price: 212400, image: { source: "products", x: 818, y: 421, width: 37, height: 31 } },
  { id: "table", name: "Mesa Roble Nogal 1.80", maker: "Colección Roble", price: 612300, image: { source: "products", x: 818, y: 470, width: 37, height: 31 } },
  { id: "shelf", name: "Biblioteca Modular", maker: "Colección Modular", price: 356900, image: { source: "products", x: 818, y: 519, width: 37, height: 31 } },
];

export { formatPrice } from "../shared/utils/formatPrice";

export function formatCreatedDate(date: string) {
  const calendarDate = /^\d{4}-\d{2}-\d{2}$/.test(date) ? `${date}T12:00:00Z` : date;
  const parts = new Intl.DateTimeFormat("es-AR", {
    day: "numeric", month: "short", year: "numeric", timeZone: "America/Buenos_Aires",
  }).formatToParts(new Date(calendarDate));
  const part = (type: string) => parts.find((item) => item.type === type)?.value ?? "";
  const month = part("month").replace(/\./g, "").replace("sept", "sep");
  return `${part("day")} ${month} ${part("year")}`;
}
