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
  removeCategory: (categoryId: number) => void;
}

export const useStore = create<Store>((set) => ({
  categories: [],
  links: [],
  modals: {
    createCategoryOpen: false,
    createLinkOpen: false,
  },
  // Modal Controls
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
  // Category
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
  removeCategory: async (categoryId: number) => {
    await axios.delete(`/api/category/${categoryId}`);

    set((state) => {
      return {
        categories: [
          ...state.categories.filter((category) => category.id !== categoryId),
        ],
        links: state.links.filter((link) => link.categoryId !== categoryId),
      };
    });
  },
}));

export const hydrateStore = (initialState: Store) => {
  if (initialState) {
    useStore.setState(initialState);
  }
};
