import { create } from 'zustand'
import { useUserStore } from './userStore';

export const useChatStore = create((set) => ({
    chatId: null,
    user: null,
    isCurrentUserBlocked: false,
    isReceiverBlocked: false,
    changeChat: (chatId, user) => {
        const currentUser = useUserStore.getState().currentUser

        // check if the current user is blocked or not

        if(user.blocked.includes(currentUser.id)){
            return set({
                chatId,
                user: null,
                isCurrentUserBlocked: true,
                isReceiverBlocked: false,
            });
        }

        // check if the receiver is blocked or not
        else if(currentUser.blocked.includes(user.id)){
            return set({
                chatId,
                user: user,
                isCurrentUserBlocked: false,
                isReceiverBlocked: true,
            });
        }

        else {
            return set({
                chatId, 
                user, 
                isCurrentUserBlocked: false, 
                isReceiverBlocked: false
            });
        }
    },

    changeBlock: () => {
        set(state => ({...state, isReceiverBlocked: !state.isCurrentUserBlocked}))
    }
}))