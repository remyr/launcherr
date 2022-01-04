import { Category, Link } from '@prisma/client';
import create from 'zustand';

interface Store {
  categories: Category[];
  links: Array<Link & { category: { name: string } }>;
  modals: {
    createCategoryOpen: boolean;
    createLinkOpen: boolean;
  };
  openCreateCategoryModal: () => void;
  closeCreateCategoryModal: () => void;
  openCreateLinkModal: () => void;
  closeCreateLinkModal: () => void;
}

export const useStore = create<Store>((set) => ({
  categories: [],
  links: [],
  modals: {
    createCategoryOpen: false,
    createLinkOpen: false,
  },
  // Methods
  openCreateCategoryModal: () => {
    set((state) => ({ modals: { ...state.modals, createCategoryOpen: true } }));
  },
  closeCreateCategoryModal: () => {
    set((state) => ({
      modals: { ...state.modals, createCategoryOpen: false },
    }));
  },
  openCreateLinkModal: () => {
    set((state) => ({ modals: { ...state.modals, createLinkOpen: true } }));
  },
  closeCreateLinkModal: () => {
    set((state) => ({
      modals: { ...state.modals, createLinkOpen: false },
    }));
  },
}));

export const hydrateStore = (initialState: Store) => {
  if (initialState) {
    useStore.setState(initialState);
  }
};
