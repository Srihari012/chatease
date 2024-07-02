import { create } from "zustand";
import { doc, getDoc } from "firebase/firestore";
import { auth, db, storage } from "../lib/firebase.js";
import { useUserStore } from "./userStore.js";

export const useChatStore = create((set) => ({
  chatId: null,
  user: null,
  isCurrentUserBloacked: false,
  isReceiverBlocked: false,
  changeChat: (chatId, user) => {
    const currentUser = useUserStore.getState().currentUser; 
    // check is current user is blocked

    if (user.blocked.includes(currentUser.id)) {
      return set({
        chatId,
        user: null,
        isCurrentUserBloacked: true,
        isReceiverBlocked: false,
      });
    }
    else if (currentUser.blocked.includes(user.id)) {
        // check is receiver user is blocked
        return set({
          chatId,
          user: user,
          isCurrentUserBloacked: false,
          isReceiverBlocked: true,
        });
    }
    else{
      return set({
        chatId,
        user,
        isCurrentUserBloacked: false,
        isReceiverBlocked: false,
      });
    }

  },

  changeBlock: () => {
    set(state => ({...state,isReceiverBlocked:!state.isReceiverBlocked}));
  },

}));
