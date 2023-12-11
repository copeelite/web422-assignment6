// store/authStore.js
import {create} from 'zustand';

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  signIn: () => set({ isLoggedIn: true }),
  signOut: () => set({ isLoggedIn: false }),
}));

export default useAuthStore;
