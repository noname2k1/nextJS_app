import { create } from 'zustand';
// import { devtools, persist } from 'zustand/middleware';

export enum placeNames {
  dojang = 'dojang',
  hiluhall = 'hiluhall',
  slowpokes = 'slowpokes',
  loveisland = 'loveisland',
  ninelives = 'ninelives',
  gardenexpress = 'gardenexpress',
  fitness = 'fitness',
  ember = 'ember',
  moda = 'moda',
  gsp = 'gsp',
}

interface HilumiaState {
  places: {
    [x: string]: any;
    hiluhall: boolean;
    slowpokes: boolean;
    loveisland: boolean;
    ninelives: boolean;
    gardenexpress: boolean;
    fitness: boolean;
    ember: boolean;
    moda: boolean;
    gsp: boolean;
  };
  setPlace: (payload: object) => void;
}

const useHilumiaStore = create<HilumiaState>((set) => ({
  places: {
    hiluhall: false,
    slowpokes: false,
    loveisland: false,
    ninelives: false,
    gardenexpress: false,
    fitness: false,
    ember: false,
    moda: false,
    gsp: false,
  },
  setPlace: (payload: object) =>
    set((state) => ({
      places: {
        ...state.places,
        ...payload,
      },
    })),
}));

export default useHilumiaStore;
