import { useCallback } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFavorites } from '../hooks/useFavorites';
import { RootTabParamList } from '../types/navigation';
import CharacterCard from '../components/CharacterCard';
import { FavoriteCharacter } from '../types/character';

type NavigationProp = BottomTabNavigationProp<RootTabParamList, 'Favorites'>;

export default function FavoritesScreen() {
  const insets = useSafeAreaInsets();
  const { pinned, unpinned, isFavorite, toggleFavorite, refresh } = useFavorites();
  const navigation = useNavigation<NavigationProp>();

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );

  const sections: { title: string; data: FavoriteCharacter[] }[] = [];
  if (pinned.length > 0) {
    sections.push({ title: 'Top Favorites', data: pinned });
  }
  if (unpinned.length > 0) {
    sections.push({ title: 'All Favorites', data: unpinned });
  }

  if (sections.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No favorites yet.</Text>
        <Text style={styles.emptySubtext}>Add characters to your favorites to see them here.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <FlatList
        data={sections}
        keyExtractor={(item) => item.title}
        renderItem={({ item: section }) => (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.data.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                isFavorite={isFavorite(character.id)}
                onToggleFavorite={toggleFavorite}
                onPress={(id) =>
                  navigation.navigate('Characters', {
                    screen: 'CharacterDetail',
                    params: { characterId: id },
                  })
                }
              />
            ))}
          </View>
        )}
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
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 24,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});
