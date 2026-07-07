import { Character } from '../types/character';

const BASE_URL = 'https://api.api-onepiece.com/v2';

export async function fetchAllCharacters(): Promise<Character[]> {
  const res = await fetch(`${BASE_URL}/characters/en`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function fetchCharacterById(id: number): Promise<Character> {
  const res = await fetch(`${BASE_URL}/characters/en/${id}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
