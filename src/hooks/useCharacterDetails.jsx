import { useState, useEffect } from 'react';
const API_BASE = 'https://swapi.dev/api';
export const useCharacterDetails = (character) => {
  const [homeworld, setHomeworld] = useState(null);
  const [species, setSpecies] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!character) return;

    fetchDetails();
  }, [character]);
  const fetchDetails = async () => {
      try {
        setLoading(true);
        
        const homeworldRes = await fetch(character.homeworld);
        const homeworldData = await homeworldRes.json();
        setHomeworld(homeworldData);

        if (character.species.length > 0) {
          const speciesRes = await fetch(character.species[0]);
          const speciesData = await speciesRes.json();
          setSpecies(speciesData);
        }
      } catch (err) {
        console.error('Error fetching details:', err);
      } finally {
        setLoading(false);
      }
    };

  return { homeworld, species, loading };
};