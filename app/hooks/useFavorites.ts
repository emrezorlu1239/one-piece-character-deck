import { useCallback, useEffect, useMemo, useState } from 'react';
import { Character, FavoriteCharacter } from '../types/character';
import { getFavorites, saveFavorites } from '../storage/favoritesStorage';

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteCharacter[]>([]);

  const refresh = useCallback(async () => {
    const data = await getFavorites();
    setFavorites(data);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const isFavorite = (id: number) => favorites.some((f) => f.id === id);

  const toggleFavorite = async (character: Character) => {
    const exists = favorites.some((f) => f.id === character.id);
    const updated = exists
      ? favorites.filter((f) => f.id !== character.id)
      : [...favorites, { ...character, isPinned: false }];
    setFavorites(updated);
    await saveFavorites(updated);
  };

  const togglePin = async (id: number) => {
    const updated = favorites.map((f) =>
      f.id === id ? { ...f, isPinned: !f.isPinned } : f
    );
    setFavorites(updated);
    await saveFavorites(updated);
  };

  const pinned = useMemo(() => favorites.filter((f) => f.isPinned), [favorites]);
  const unpinned = useMemo(() => favorites.filter((f) => !f.isPinned), [favorites]);

  return { favorites, pinned, unpinned, isFavorite, toggleFavorite, togglePin, refresh };
}
