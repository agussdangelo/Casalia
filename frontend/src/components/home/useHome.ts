import { createContext, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { roomPreview, type Design } from "../../data/home";
import type { useHomeState } from "./useHomeState";

export type Navigation = "Inicio" | "Mis diseños" | "Marketplace" | "Mensajes";
export const HomeContext = createContext<ReturnType<typeof useHomeState> | null>(null);

export function useHome() {
  const context = useContext(HomeContext);
  const navigateTo = useNavigate();
  const { pathname } = useLocation();

  if (!context) throw new Error("useHome debe usarse dentro de HomeProvider");
  const state = context;

  const activeNavigation: Navigation = state.modal === "messages" ? "Mensajes"
    : pathname === "/marketplace" ? "Marketplace"
    : decodeURI(pathname) === "/misdiseños" ? "Mis diseños" : "Inicio";

  function closeModal() {
    state.setModal(null);
  }

  function resetNavigation() {
    state.setMobileMenuOpen(false);
    state.setModal(null);
    state.setNotification(null);
    window.scrollTo(0, 0);
  }

  function openEditor(design: Design) {
    state.setEditorDesign(design);
    state.setModal(null);
    state.setMobileMenuOpen(false);
    navigateTo("/editor");
    window.scrollTo(0, 0);
  }

  function navigate(destination: Navigation) {
    state.setMobileMenuOpen(false);
    if (destination === "Mensajes") {
      state.setModal("messages");
      return;
    }
    resetNavigation();
    navigateTo(destination === "Inicio" ? "/inicio" : destination === "Mis diseños" ? "/misdiseños" : "/marketplace");
  }

  function createDesign(name: string, budget: number) {
    if (state.designs.length >= 5) return;
    const design: Design = {
      id: `design-${Date.now()}`, name, description: "Diseño · sin elementos aún",
      price: budget, budget, createdAt: new Date().toISOString(),
      updated: "recién creado", image: roomPreview,
    };
    state.setDesigns((current) => [design, ...current]);
    openEditor(design);
  }

  return { ...state, activeNavigation, closeModal, resetNavigation, openEditor, navigate, createDesign };
}
