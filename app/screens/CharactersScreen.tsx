import { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCharacters } from '../hooks/useCharacters';
import { useFavorites } from '../hooks/useFavorites';
import { CharactersStackParamList } from '../types/navigation';
import CharacterCard from '../components/CharacterCard';
import SearchBar from '../components/SearchBar';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

type NavigationProp = NativeStackNavigationProp<CharactersStackParamList, 'CharactersList'>;

export default function CharactersScreen() {
  const insets = useSafeAreaInsets();
  const { data, query, setQuery, loadMore, status, hasMore, refetch } = useCharacters();
  const { isFavorite, toggleFavorite, refresh } = useFavorites();
  const navigation = useNavigation<NavigationProp>();

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );

  if (status === 'loading') return <LoadingState />;
  if (status === 'error') return <ErrorState onRetry={refetch} />;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <SearchBar query={query} setQuery={setQuery} />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CharacterCard
            character={item}
            isFavorite={isFavorite(item.id)}
            onToggleFavorite={toggleFavorite}
            onPress={(id) => navigation.navigate('CharacterDetail', { characterId: id })}
          />
        )}
        onEndReached={hasMore ? loadMore : undefined}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    paddingBottom: 20,
  },
});
