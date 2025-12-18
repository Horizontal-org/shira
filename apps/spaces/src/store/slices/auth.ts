import { StateCreator } from "zustand"
import { checkAuth, login } from "../../fetch/auth";

export interface AuthSlice {
  login: (email, pass) => void
  logout: () => void
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

const isPublicRoute = (path: string): boolean => {
  return path === '/login' 
    || path.startsWith('/create-space')
    || path.startsWith('/invitation-used')
    || path.startsWith('/get-started');
};

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
  
  logout: async() => {
    localStorage.removeItem("shira_access_token");
    localStorage.removeItem("shira_x_space");
    set({
      user: null,
      space: null
    })
  },
  
  me: async () => {
    const res = await checkAuth();
    if (res) {
      set({ 
        user: res,
        space: res.activeSpace.space 
      });
    } else if (!isPublicRoute(window.location.pathname)) {
      window.location.href = '/login';
    }
    set({ fetching: false });
  },
})
