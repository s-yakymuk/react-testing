import { create } from "zustand";

import { Movie } from "./api";

interface MoviesStore {
  isAddEditModalOpen: boolean;
  isDeleteModalOpen: boolean;
  activeMovie: Movie | null;
  addMovie: () => void;
  deleteMovie: (movie: Movie) => void;
  editMovie: (movie: Movie) => void;
  closeModal: () => void;
  reset: () => void;
}

const initialState = {
  isAddEditModalOpen: false,
  isDeleteModalOpen: false,
  activeMovie: null,
};

export const useMoviesStore = create<MoviesStore>((set) => ({
  ...initialState,
  addMovie: () => set({ isAddEditModalOpen: true, activeMovie: null }),
  deleteMovie: (movie: Movie) =>
    set({ isDeleteModalOpen: true, activeMovie: movie }),
  editMovie: (movie: Movie) =>
    set({ isAddEditModalOpen: true, activeMovie: movie }),
  closeModal: () =>
    set({
      isDeleteModalOpen: false,
      isAddEditModalOpen: false,
    }),
  reset: () => set({ ...initialState }),
}));
