import { Azuki, ChildsSelected } from '@/config/interfaces';
import { types } from '@/datas/galleryFilterList';
import { create } from 'zustand';
// import { devtools, persist } from 'zustand/middleware';

// export enum ItemNames {
//   azukis = 'azukis',
//   beans = 'beans',
// }

interface GlobalState {
  // states
  darkMode: boolean;
  //   methods
  setDarkMode: (payload: boolean) => void;
}

const useGlobalStore = create<GlobalState>((set) => ({
  darkMode: false,
  setDarkMode: (payload: boolean) =>
    set((state) => ({
      darkMode: payload,
    })),
}));

export default useGlobalStore;
