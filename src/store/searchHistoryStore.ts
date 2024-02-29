import { create } from "zustand";

interface SearchHistoryStore {
  searchHistory: string[];
  addToSearchHistory: (query: string) => void;
}

export const useSearchHistoryStore = create<SearchHistoryStore>((set) => ({
  searchHistory: [],
  addToSearchHistory: (query) =>
    set((state) => ({ searchHistory: [...state.searchHistory, query] })),
}));
