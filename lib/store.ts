import { Category, Link } from '@prisma/client';
import axios from 'axios';
import { CreateCategryDTO } from 'types/dto';
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
  createCategory: (payload: CreateCategryDTO) => void;
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
  createCategory: async (payload) => {
    const { data } = await axios.post('/api/category', payload);

    set((state) => ({
      categories: [...state.categories, data],
      modals: {
        ...state.modals,
        createCategoryOpen: false,
      },
    }));
  },
}));

export const hydrateStore = (initialState: Store) => {
  if (initialState) {
    useStore.setState(initialState);
  }
};
