import type { ReactNode } from "react";
import { HomeContext } from "./useHome";
import { useHomeState } from "./useHomeState";

export function HomeProvider({ children, currentUser = null }: {
  children: ReactNode;
  currentUser?: { name: string } | null;
}) {
  const state = useHomeState(currentUser);
  return <HomeContext.Provider value={state}>{children}</HomeContext.Provider>;
}
