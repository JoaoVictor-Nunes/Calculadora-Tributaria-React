// Zustand store mínimo para informações do usuário.
// Observações:
// - Atualmente guarda apenas `userName` e persiste em localStorage.
// - Quando o backend existir, estender para: token JWT, email, id,
//   ações de login/logout e refreshToken.
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      userName: "",
      setUserName: (name) => set({ userName: name }),
    }),
    {
      name: "user-storage",
    }
  )
);
export default useUserStore;