export interface Crew {
  id: number;
  name: string;
  roman_name?: string;
  total_prime?: string;
  is_yonko?: boolean;
}

export interface Fruit {
  id: number;
  name: string;
  type?: string;
  roman_name?: string;
}

export interface Character {
  id: number;
  name: string;
  job?: string;
  size?: string;
  birthday?: string;
  age?: string;
  bounty?: string;
  status?: string;
  crew?: Crew | null;
  fruit?: Fruit | null;
}

export interface FavoriteCharacter extends Character {
  isPinned: boolean;
}
