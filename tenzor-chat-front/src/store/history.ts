import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";
import { historyDB } from "./db/history.db";

export type THistoryMessage = {
  date: number;
  userID: string;
  messageText: string;
};

export type TDialogHistory = {
  dialogID: string;
  interlocutors: string[];
  messages: THistoryMessage[];
};

export type THistory = {
  history: TDialogHistory[];
  addDialog: (currentUserID: string, contactID: string) => string;
  addMessage: (dialogID: string, newMessage: THistoryMessage) => void;
  getDialog: (dialogID?: string | number | undefined) => TDialogHistory[];
};

const createStore: StateCreator<THistory> = (set, get) => ({
  history: historyDB,

  addDialog: (currentUserID: string, contactID: string) => {
    const newDialogID = [currentUserID, contactID]
      .sort((a, b) => (a > b ? 1 : -1))
      .join("_");

    set((state) => {
      const existingDialog = state.history.filter(
        (dialog) => dialog.dialogID === newDialogID
      );

      return existingDialog.length > 0
        ? { history: [...state.history] }
        : {
            history: [
              ...state.history,
              {
                dialogID: newDialogID,
                messages: [
                  {
                    date: new Date().getTime(),
                    userID: currentUserID,
                    messageText: "Hello",
                  },
                  {
                    date: new Date().getTime(),
                    userID: contactID,
                    messageText: "World",
                  },
                ],
                interlocutors: [currentUserID, contactID],
              },
            ],
          };
    });

    return newDialogID;
  },
  addMessage: (dialogID: string, newMessage: THistoryMessage) =>
    set((state) => ({
      history: state.history.map((dialog) =>
        dialog.dialogID === dialogID
          ? { ...dialog, messages: [...dialog.messages, newMessage] }
          : dialog
      ),
    })),
  getDialog: (dialogID?: string | number | undefined) => {
    if (typeof dialogID === "number" && get().history[0]) {
      return get().history.filter((dialog) => dialog === get().history[0]);
    } else {
      return get().history.filter(
        (dialog) =>
          typeof dialogID === "undefined" || dialog.dialogID === dialogID
      );
    }
  },
});

export const useHistory = create<THistory>()(
  persist(createStore, {
    name: "history",
    getStorage: () => ({
      getItem: (key) => Cookies.get(key) || null,
      setItem: (key, value) => {
        Cookies.set(key, value);
      },
      removeItem: (key) => Cookies.remove(key),
    }),
  })
);
