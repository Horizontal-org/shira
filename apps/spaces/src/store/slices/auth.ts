import { StateCreator } from "zustand"
import { checkAuth, getSub, login, logout as logoutApi } from "../../fetch/auth";
import { NavigateFunction } from "react-router-dom";

export interface AuthSlice {
  login: (email, pass) => void
  loginStatus: 'idle' | 'loading' | 'error' | 'success',
  setLoginStatus: (status: 'idle' | 'loading' | 'error' | 'success') => void
  logout: (navigate?: NavigateFunction) => void
  me: () => void
  updateUserEmail: (email: string) => void
  user: {
    email?: string;
    createdAt?: string;
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
  selfHosted: boolean;
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
  selfHosted: false,
  fetching: true,
  loginStatus: 'idle',
  setLoginStatus: (status) => set({ loginStatus: status }),
  login: async (email, pass) => {
    set({ loginStatus: 'loading' });
    try {
      const user = await login(email, pass)
      const sub = await getSub()

      set({
        user: user,
        space: user.spaces[0],
        subscription: sub,
        selfHosted: Boolean(sub?.selfHosted),
        loginStatus: 'success'
      })
    } catch (e) {
      set({ loginStatus: 'error' });
    }
  },

  logout: async (navigate?: NavigateFunction) => {
    await logoutApi();
    set({
      user: null,
      space: null,
      subscription: null,
      selfHosted: false
    })
    if (navigate) {
      navigate('/login')
    }
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
        subscription: res.subscription,
        selfHosted: Boolean(res.subscription?.selfHosted)
      });
    } else if (!isPublicRoute(window.location.pathname)) {
      window.location.href = '/login';
    }
    set({ fetching: false });
  },
})
