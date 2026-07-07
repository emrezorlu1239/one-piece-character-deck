import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { CharactersStackParamList } from '../types/navigation';
import { Character } from '../types/character';
import { fetchCharacterById } from '../services/api';
import { useFavorites } from '../hooks/useFavorites';

type DetailRouteProp = RouteProp<CharactersStackParamList, 'CharacterDetail'>;

export default function CharacterDetailScreen() {
  const route = useRoute<DetailRouteProp>();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { characterId } = route.params;
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { isFavorite, toggleFavorite, togglePin, favorites } = useFavorites();

  const fav = favorites.find((f) => f.id === characterId);
  const isFav = isFavorite(characterId);
  const isPinned = fav?.isPinned ?? false;

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetchCharacterById(characterId)
      .then((data) => {
        setCharacter(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [characterId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#E53935" />
      </View>
    );
  }

  if (error || !character) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Failed to load character.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backButton, { paddingTop: insets.top + 16 }]}>
        <Ionicons name="arrow-back" size={24} color="#222" />
      </TouchableOpacity>

      <View style={styles.header}>
        <View style={styles.avatarLarge}>
          <Text style={styles.avatarLargeText}>{character.name.charAt(0).toUpperCase()}</Text>
        </View>
        <Text style={styles.name}>{character.name}</Text>
      </View>

      <View style={styles.infoCard}>
        {character.job ? (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Job</Text>
            <Text style={styles.value}>{character.job}</Text>
          </View>
        ) : null}
        {character.age ? (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Age</Text>
            <Text style={styles.value}>{character.age}</Text>
          </View>
        ) : null}
        {character.size ? (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Size</Text>
            <Text style={styles.value}>{character.size}</Text>
          </View>
        ) : null}
        {character.birthday ? (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Birthday</Text>
            <Text style={styles.value}>{character.birthday}</Text>
          </View>
        ) : null}
        {character.status ? (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Status</Text>
            <Text style={styles.value}>{character.status}</Text>
          </View>
        ) : null}
        {character.bounty ? (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Bounty</Text>
            <Text style={styles.value}>{character.bounty}</Text>
          </View>
        ) : null}
        {character.crew ? (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Crew</Text>
            <Text style={styles.value}>{character.crew.name}</Text>
          </View>
        ) : null}
        {character.fruit ? (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Devil Fruit</Text>
            <Text style={styles.value}>
              {character.fruit.name}{character.fruit.type ? ` (${character.fruit.type})` : ''}
            </Text>
          </View>
        ) : null}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, isFav ? styles.actionButtonActive : null]}
          onPress={() => character && toggleFavorite(character)}
        >
          <Ionicons name={isFav ? 'star' : 'star-outline'} size={20} color="#fff" />
          <Text style={styles.actionText}>{isFav ? 'Remove from Favorites' : 'Add to Favorites'}</Text>
        </TouchableOpacity>

        {isFav ? (
          <TouchableOpacity
            style={[styles.actionButton, isPinned ? styles.actionButtonPinned : null]}
            onPress={() => togglePin(characterId)}
          >
            <Ionicons name={isPinned ? 'pin' : 'pin-outline'} size={20} color="#fff" />
            <Text style={styles.actionText}>
              {isPinned ? 'Unpin from Top' : 'Pin to Top Favorites'}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    paddingBottom: 40,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
  },
  backButton: {
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E53935',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarLargeText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#222',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  label: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
  value: {
    fontSize: 14,
    color: '#222',
    fontWeight: '600',
    textAlign: 'right',
    flex: 1,
    marginLeft: 16,
  },
  actions: {
    marginTop: 20,
    marginHorizontal: 16,
    gap: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E53935',
    paddingVertical: 14,
    borderRadius: 10,
    gap: 8,
  },
  actionButtonActive: {
    backgroundColor: '#c62828',
  },
  actionButtonPinned: {
    backgroundColor: '#1565C0',
  },
  actionText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});
