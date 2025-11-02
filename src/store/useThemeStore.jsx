// Zustand store para gerenciar o modo de tema (claro / escuro).
// Responsabilidades:
// - Armazenar `mode` e expor `setMode` e `toggleMode`.
// - Persistir a preferência no localStorage via middleware `persist`.
// Uso:
// - `useMode` em `Tema.jsx` consome este store para criar o tema MUI.
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useThemeStore = create(
  persist(
    (set) => ({
      mode: "light",
      setMode: (mode) => set({ mode }),
      toggleMode: () =>
        set((state) => ({ mode: state.mode === "light" ? "dark" : "light" })),
    }),
    {
      name: "theme-storage",
    }
  )
);
export default useThemeStore;