import { useEffect, useMemo, useState } from 'react';
import { Character } from '../types/character';
import { fetchAllCharacters } from '../services/api';

const PAGE_SIZE = 20;

export function useCharacters() {
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  const load = () => {
    setStatus('loading');
    fetchAllCharacters()
      .then((data) => {
        setAllCharacters(data);
        setStatus('success');
      })
      .catch(() => setStatus('error'));
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return allCharacters;
    const lower = query.toLowerCase();
    return allCharacters.filter((c) => c.name.toLowerCase().includes(lower));
  }, [allCharacters, query]);

  useEffect(() => {
    setPage(1);
  }, [query]);

  const paginated = useMemo(() => filtered.slice(0, page * PAGE_SIZE), [filtered, page]);

  const loadMore = () => {
    if (paginated.length < filtered.length) setPage((p) => p + 1);
  };

  return {
    data: paginated,
    query,
    setQuery,
    loadMore,
    status,
    hasMore: paginated.length < filtered.length,
    refetch: load,
  };
}
