import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";

export type TStore = {
  currentDialogID: string;
  currentUserID: string;
  setID: (dialogID: string) => void;
};

const createStore: StateCreator<TStore> = (set) => ({
  currentDialogID: "",
  currentUserID: "user1",
  setID: (dialogID: string) => set({ currentDialogID: dialogID }),
});

export const useStore = create<TStore>()(
  persist(createStore, {
    name: "appStore",
    getStorage: () => ({
      getItem: (key) => Cookies.get(key) || null,
      setItem: (key, value) => {
        Cookies.set(key, value);
      },
      removeItem: (key) => Cookies.remove(key),
    }),
  })
);
