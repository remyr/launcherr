import { Category, Link } from '@prisma/client';
import create from 'zustand';

interface Store {
  categories: Category[];
  links: Link[];
}

export const useStore = create<Store>((set) => ({
  categories: [],
  links: [],
}));

export const hydrateStore = (initialState: Store) => {
  if (initialState) {
    useStore.setState(initialState);
  }
};
