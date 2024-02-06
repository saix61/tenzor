import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";
import { userListDB } from "./db/userList.db";

export type TUser = {
  userID: string;
  name: string;
  photoUrl: string;
};
export type TUsers = {
  userList: TUser[];
  getUserByID: (userID: string) => TUser;
};

const createUsers: StateCreator<TUsers> = (set, get) => ({
  userList: userListDB,
  getUserByID: (userID: string) =>
    get().userList.filter((user) => user.userID === userID)[0],
});

export const useUsers = create<TUsers>()(
  persist(createUsers, {
    name: "appUsers",
    getStorage: () => ({
      getItem: (key) => Cookies.get(key) || null,
      setItem: (key, value) => {
        Cookies.set(key, value);
      },
      removeItem: (key) => Cookies.remove(key),
    }),
  })
);
