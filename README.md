# One Piece Grand Line Encyclopedia 🏴‍☠️

A mobile encyclopedia app built with **React Native (Expo)** and **TypeScript** that lets you browse, search, and favorite characters from the One Piece universe. Data is sourced from the public [One Piece API](https://api.api-onepiece.com).

---

## ✨ Core Features

### 📋 Character Browsing & Client-Side Pagination
Fetches the **full character list** in one request from the API, stores it in memory (`allCharacters`), and renders it in paginated chunks (20 per page) using a dynamic slice. When the user scrolls to the bottom, `loadMore` increments the page, appending the next slice via FlatList's `onEndReached`.

```typescript
const paginated = useMemo(() => filtered.slice(0, page * PAGE_SIZE), [filtered, page]);
```

### 🔍 Real-Time Search
A text-driven filter that runs client-side against the in-memory list with **instant results**. Every keystroke updates the query state, which triggers a `useMemo`-based filter and **automatically resets the page to 1** (`setPage(1)`) — ensuring the user always starts from the first result.

```typescript
useEffect(() => { setPage(1); }, [query]);
```

### ⭐ Favorites with Pin-to-Top
Persist favorites to device storage via **AsyncStorage**. Each favorite stores an `isPinned` flag. The hook uses `useMemo` to derive two memoized arrays — `pinned` and `unpinned` — preventing redundant recalculations on every render.

```typescript
const pinned = useMemo(() => favorites.filter((f) => f.isPinned), [favorites]);
const unpinned = useMemo(() => favorites.filter((f) => !f.isPinned), [favorites]);
```

### 🗂️ Cross-Tab Navigation
Uses `@react-navigation/bottom-tabs` typed with `RootTabParamList` and `NavigatorScreenParams` for type-safe nested navigation. From the **Favorites** tab, tapping a character navigates into the **Characters** tab's stack and opens `CharacterDetailScreen` — with full type safety.

```typescript
navigation.navigate('Characters', {
  screen: 'CharacterDetail',
  params: { characterId: id },
});
```

### 🔧 Strict TypeScript Architecture
Every layer is strongly typed. The `Character` interface models the real API shape including **optional and nullable fields** (`crew?: Crew | null; fruit?: Fruit | null;`), preventing runtime crashes from unexpected API responses.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React Native (Expo SDK 54) |
| Language | TypeScript ~5.9 |
| Navigation | React Navigation 7 (native-stack + bottom-tabs) |
| Persistence | @react-native-async-storage/async-storage |
| Icons | @expo/vector-icons (Ionicons) |
| API | [api.api-onepiece.com](https://api.api-onepiece.com/v2) |

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start the Expo dev server
npx expo start
```

Then scan the QR code with **Expo Go** (Android/iOS) or press `a` for the Android emulator.

---

## 📁 Project Structure

```
app/
├── components/       # Reusable UI (CharacterCard, SearchBar, LoadingState, ErrorState)
├── hooks/            # Custom hooks (useCharacters, useFavorites)
├── navigation/       # RootNavigator, TabNavigator
├── screens/          # CharactersScreen, CharacterDetailScreen, FavoritesScreen
├── services/         # API client (fetchAllCharacters, fetchCharacterById)
├── storage/          # AsyncStorage helpers (getFavorites, saveFavorites)
└── types/            # TypeScript interfaces (Character, Crew, Fruit, navigation types)
```

---

## 📄 License

MIT
