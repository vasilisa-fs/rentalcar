const FAVORITES_KEY = 'rental_favorites';

export const getFavorites = (): string[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const toggleFavorite = (id: string): string[] => {
  const favorites = getFavorites();
  const updated = favorites.includes(id)
    ? favorites.filter((f) => f !== id)
    : [...favorites, id];
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  return updated;
};
