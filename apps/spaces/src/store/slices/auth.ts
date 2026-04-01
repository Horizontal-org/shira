import { StateCreator } from "zustand"
import { checkAuth, getSub, login } from "../../fetch/auth";

export interface AuthSlice {
  login: (email, pass) => void
  logout: () => void
  me: () => void
  updateUserEmail: (email: string) => void
  user: {
    email?: string;
    lastPasswordChangeAt?: string | null;
    spaces?: {
      name: string
    }[]
  };
  space: {
    name: string
  };
  subscription: {
    status: string;
    type: string;
    organizationId: string;
  }
  fetching: boolean;
}

const isPublicRoute = (path: string): boolean => {
  return path === '/login'
    || path.startsWith('/confirm-email-update')
    || path.startsWith('/create-space')
    || path.startsWith('/invitation-used')
    || path.startsWith('/get-started')
    || path.startsWith('/checkout-success')
    || path.startsWith('/reset-password');
};

export const createAuthSlice: StateCreator<
  AuthSlice,
  [],
  [],
  AuthSlice
> = (set) => ({
  user: null,
  space: null,
  subscription: null,
  fetching: true,
  login: async (email, pass) => {
    const user = await login(email, pass)
    const sub = await getSub()
    set({
      user: user,
      space: user.spaces[0],
      subscription: sub
    })
  },

  logout: async () => {
    localStorage.removeItem("shira_access_token");
    localStorage.removeItem("shira_x_space");
    set({
      user: null,
      space: null,
      subscription: null
    })
  },

  updateUserEmail: (email: string) => {
    set((state) => ({
      user: {
        ...state.user!,
        email,
      },
    }))
  },

  me: async () => {
    const res = await checkAuth();
    if (res) {
      set({
        user: res.user,
        space: res.user.activeSpace.space,
        subscription: res.subscription
      });
    } else if (!isPublicRoute(window.location.pathname)) {
      window.location.href = '/login';
    }
    set({ fetching: false });
  },
})
