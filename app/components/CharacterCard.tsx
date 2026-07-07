import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Character } from '../types/character';

interface CharacterCardProps {
  character: Character;
  isFavorite: boolean;
  onToggleFavorite: (character: Character) => void;
  onPress: (characterId: number) => void;
}

export default function CharacterCard({
  character,
  isFavorite,
  onToggleFavorite,
  onPress,
}: CharacterCardProps) {
  const initial = character.name.charAt(0).toUpperCase();

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(character.id)}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initial}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{character.name}</Text>
        {character.job ? <Text style={styles.job}>{character.job}</Text> : null}
        {character.bounty ? (
          <Text style={styles.bounty}>Bounty: {character.bounty}</Text>
        ) : null}
      </View>
      <TouchableOpacity onPress={() => onToggleFavorite(character)} style={styles.starButton}>
        <Ionicons
          name={isFavorite ? 'star' : 'star-outline'}
          size={24}
          color={isFavorite ? '#FFD700' : '#999'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginHorizontal: 12,
    marginVertical: 4,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#E53935',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  job: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  bounty: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  starButton: {
    padding: 6,
  },
});
