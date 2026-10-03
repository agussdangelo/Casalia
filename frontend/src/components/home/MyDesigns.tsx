import { useMemo, useState } from "react";
import { formatCreatedDate, formatPrice, type Design } from "../../data/home";
import { Icon, ReferenceImage } from "./Visuals";

type SortOrder = "recent" | "name" | "price-asc" | "price-desc";

export function MyDesigns({ designs, onOpenDesign, onNewDesign }: {
  designs: Design[];
  onOpenDesign: (design: Design) => void;
  onNewDesign: () => void;
}) {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("recent");
  const visibleDesigns = useMemo(() => {
    const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es");
    const result = designs.filter((design) => normalize(`${design.name} ${design.description}`).includes(normalize(search.trim())));
    if (sortOrder === "name") result.sort((a, b) => a.name.localeCompare(b.name, "es"));
    if (sortOrder === "price-asc") result.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    if (sortOrder === "price-desc") result.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    return result;
  }, [designs, search, sortOrder]);

  return <section className="my-designs-page" aria-labelledby="my-designs-heading">
    <div className="library-header">
      <div>
        <h1 id="my-designs-heading">Mis diseños</h1>
        <p>{designs.length} diseños · último cambio {designs.some((design) => design.id.startsWith("design-")) ? "recién creado" : "hace 2 minutos"}</p>
      </div>
      <div className="library-tools">
        <input type="search" aria-label="Buscar diseños" placeholder="Buscar…" value={search} onChange={(event) => setSearch(event.target.value)} />
        <select aria-label="Ordenar diseños" value={sortOrder} onChange={(event) => setSortOrder(event.target.value as SortOrder)}>
          <option value="recent">Recientes</option>
          <option value="name">Nombre: A–Z</option>
          <option value="price-asc">Menor presupuesto</option>
          <option value="price-desc">Mayor presupuesto</option>
        </select>
      </div>
    </div>

    <div className="library-grid">
      {visibleDesigns.map((design) => <button className="library-card" key={design.id} onClick={() => onOpenDesign(design)} aria-label={`Abrir diseño ${design.name}`}>
        <ReferenceImage region={design.image} alt={design.name} className="library-image" />
        <div className="library-card-body">
          <h2>{design.name}</h2>
          <p>Creado el {formatCreatedDate(design.createdAt)}</p>
          <div className="library-meta">
            <span className={design.price === null ? "no-budget" : ""}>{design.price === null ? "Sin presupuesto" : formatPrice(design.price)}</span>
            <span className="library-updated">Último cambio: {design.updated === "ayer" ? "hace 1 día" : design.updated}</span>
          </div>
        </div>
      </button>)}
      <button className="new-design-tile" onClick={onNewDesign}>
        <span className="new-design-plus">
          <Icon name="plus" />
        </span>
        <span>Nuevo diseño</span>
      </button>
    </div>
    
    {visibleDesigns.length === 0 && <div className="library-empty" role="status">
                                      <h2>No encontramos ese diseño</h2>
                                      <p>Probá con otro nombre o limpiá la búsqueda para ver todos tus espacios.</p>
                                      <button className="button button-outline" onClick={() => setSearch("")}>Limpiar búsqueda</button>
                                    </div>}
  </section>;
}
