import { create } from "zustand";
import { persist } from "zustand/middleware";

 // Utiliza localStorage para manter os dados do usuário
 
const useUserStore = create(
  persist(
    (set) => ({
      // Estado inicial do nome do usuário (string vazia)
      userName: "",
      
      // Action para definir/atualizar o nome do usuário
      setUserName: (name) => set({ userName: name }),
    }),
    {
      // Nome da chave no localStorage onde os dados do usuário serão persistidos
      name: "user-storage",
    }
  )
);

export default useUserStore;