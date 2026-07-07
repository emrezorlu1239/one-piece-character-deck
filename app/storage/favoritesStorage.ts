import AsyncStorage from '@react-native-async-storage/async-storage';
import { FavoriteCharacter } from '../types/character';

const KEY = 'favorites';

export async function getFavorites(): Promise<FavoriteCharacter[]> {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function saveFavorites(list: FavoriteCharacter[]): Promise<void> {
  await AsyncStorage.setItem(KEY, JSON.stringify(list));
}
