import { Azuki, ChildsSelected, Error } from '@/config/interfaces';
import { types } from '@/datas/galleryFilterList';
import { devtools } from 'zustand/middleware';
import { create } from 'zustand';
// import { devtools, persist } from 'zustand/middleware';

// export enum ItemNames {
//   azukis = 'azukis',
//   beans = 'beans',
// }

interface GalleryState {
  // states
  items: Azuki[];
  filterValue: string;
  childsSelected: ChildsSelected[];
  sumOfAttrSelected: number;
  charListFilter: Azuki[];
  count: number;
  error: Error;
  page: number;
  target: 'azuki' | 'bean' | 'goldenAzuki';
  // methods
  setItems: (payload: Azuki[]) => void;
  addItems: (payload: Azuki[]) => void;
  setFilterValue: (payload: string) => void;
  setChildsSelected: (payload: ChildsSelected[]) => void;
  setSumOfAttrSelected: (payload: number) => void;
  setCharListFilter: (payload: Azuki[]) => void;
  setCount: (payload: number) => void;
  setError: (payload: Error) => void;
  setPage: (payload: number) => void;
  setTarget: (paload: 'azuki' | 'bean' | 'goldenAzuki') => void;
}

const useGalleryStore = create<GalleryState>()(
  devtools((set) => ({
    items: [],
    filterValue: '',
    childsSelected: [],
    sumOfAttrSelected: 0,
    charListFilter: [],
    count: 0,
    error: {
      status: 200,
      message: '',
    },
    page: 1,
    target: 'azuki',
    setItems: (payload: Azuki[]) =>
      set(() => ({
        items: payload,
      })),
    addItems: (payload: Azuki[]) =>
      set((state) => ({
        items: [...state.items, ...payload],
      })),
    setFilterValue: (payload: string) =>
      set((state) => ({
        filterValue: payload,
      })),
    setChildsSelected: (payload: ChildsSelected[]) =>
      set((state) => ({
        childsSelected: payload,
      })),
    setSumOfAttrSelected: (payload: number) =>
      set((state) => ({
        sumOfAttrSelected: payload,
      })),

    setCharListFilter: (payload: Azuki[]) =>
      set((state) => ({
        charListFilter: payload,
      })),
    setCount: (payload: number) =>
      set((state) => ({
        count: payload,
      })),
    setError: (payload: Error) =>
      set((state) => ({
        error: payload,
      })),
    setPage(payload: number) {
      set((state) => ({
        page: payload,
      }));
    },
    setTarget(payload: 'azuki' | 'bean' | 'goldenAzuki') {
      set((state) => ({
        target: payload,
      }));
    },
  }))
);

if (process.env.NODE_ENV === 'development') {
}

export default useGalleryStore;
