import { StateCreator } from "zustand"
import { checkAuth, login } from "../../fetch/auth";

export interface AuthSlice {
  login: (email, pass) => void
  me: () => void
  user: {
    email?: string;
    spaces?: {
      name: string
    }[]
  };
  space: {
    name: string
  };
  fetching: boolean;
}

const publicRoutes = ['/login', '/create-space'];

export const createAuthSlice: StateCreator<
  AuthSlice,
  [],
  [],
  AuthSlice
> = (set) => ({
  user:  null,
  space: null,
  fetching: true,
  login: async(email, pass) => {
    const user = await login(email, pass)
    set({
      user: user,
      space: user.spaces[0]
    })
  },
  
me: async () => {
  const res = await checkAuth();
  if (res) {
    set({ 
      user: res,
      space: res.space 
    });
  } else if (!publicRoutes.includes(window.location.pathname)) {
    window.location.href = '/login';
  }
  set({ fetching: false });
},
})
