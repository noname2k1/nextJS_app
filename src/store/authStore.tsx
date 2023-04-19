import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

// export enum ItemNames {
//   azukis = 'azukis',
//   beans = 'beans',
// }

interface UserResponse {
  createdAt: string;
  role: string;
  updatedAt: string;
  username: string;
  __v?: number;
  _id: string;
}

interface AuthState {
  // states
  token: string;
  user: UserResponse;
  //   methods
  setToken: (payload: string) => void;
  setUser: (payload: UserResponse) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        token: '',
        user: {
          createdAt: '',
          role: '',
          updatedAt: '',
          username: '',
          __v: 0,
          _id: '',
        },
        setToken(payload: string) {
          set(() => ({ token: payload }));
        },
        setUser(payload: UserResponse) {
          set(() => ({ user: payload }));
        },
        logout() {
          set(() => ({
            token: '',
            user: {
              createdAt: '',
              role: '',
              updatedAt: '',
              username: '',
              __v: 0,
              _id: '',
            },
          }));
        },
      }),
      {
        name: 'AuthStore',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);

export default useAuthStore;
