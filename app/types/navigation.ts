import { NavigatorScreenParams } from '@react-navigation/native';

export type CharactersStackParamList = {
  CharactersList: undefined;
  CharacterDetail: { characterId: number };
};

export type RootTabParamList = {
  Characters: NavigatorScreenParams<CharactersStackParamList>;
  Favorites: undefined;
};
