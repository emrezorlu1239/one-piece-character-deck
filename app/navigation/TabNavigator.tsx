import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { CharactersStackParamList, RootTabParamList } from '../types/navigation';
import CharactersScreen from '../screens/CharactersScreen';
import CharacterDetailScreen from '../screens/CharacterDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

const Stack = createNativeStackNavigator<CharactersStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

function CharactersStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CharactersList" component={CharactersScreen} />
      <Stack.Screen name="CharacterDetail" component={CharacterDetailScreen} />
    </Stack.Navigator>
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          const iconName = route.name === 'Characters' ? 'people-outline' : 'star-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#E53935',
        tabBarInactiveTintColor: '#999',
      })}
    >
      <Tab.Screen name="Characters" component={CharactersStack} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
    </Tab.Navigator>
  );
}
