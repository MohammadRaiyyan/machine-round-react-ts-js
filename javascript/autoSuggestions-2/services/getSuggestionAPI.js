export const fetchSuggestions = async (query, signal) => {
  if (!query) return [];
  const response = await fetch(
    `https://api.datamuse.com/sug?s=${encodeURIComponent(query)}`,
    { signal },
  );
  const data = await response.json();
  return data.map((d) => d.word);
};
