import { useState, useEffect } from 'react';
const API_BASE = 'https://swapi.dev/api';

export const useCharacters = (page, search = '', filters = {}) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    console.log('1');
    fetchCharacters();
  }, [page, search, filters.homeworld, filters.film, filters.species]);

  const fetchCharacters = async () => {
        console.log('starting fetch');
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${API_BASE}/people/?page=${page}${search ? `&search=${search}` : ''}`);
        if (!response.ok) throw new Error('Failed to get characters');
        
        const data = await response.json();
        let filteredResults = data.results;

        // Apply filters
        if (filters.homeworld) {
          filteredResults = filteredResults.filter(char => char.homeworld === filters.homeworld);
        }
        
        if (filters.film) {
          filteredResults = filteredResults.filter(char => char.films.includes(filters.film));
        }
        
        if (filters.species) {
            console.log('boooool00', filters.species);
            // console.log('boooool00', filteredResults);
          filteredResults = filteredResults.filter(
            char => {
                // console.log('boooool', char.species)
                console.log('boooool', char.species)
                return char.species.length > 0 && char.species.includes(filters.species)
            }
          );
        }

        setCharacters(filteredResults);
        setTotalPages(Math.ceil(data.count / 10));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while processing ');
      } finally {
        setLoading(false);
      }
    };

  return { characters, loading, error, totalPages };
};
