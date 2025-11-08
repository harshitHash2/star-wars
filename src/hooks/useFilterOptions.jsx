import { useState, useEffect } from 'react';
const API_BASE = 'https://swapi.dev/api';
export const useFilterOptions = () => {
  const [homeworlds, setHomeworlds] = useState([]);
  const [films, setFilms] = useState([]);
  const [speciesList, setSpeciesList] = useState([]);

  useEffect(() => {
    console.log('11111111111111');
    fetchOptions();
  }, []);
  const fetchOptions = async () => {
      try {
        const [planetsRes, filmsRes, speciesRes] = await Promise.all([
          fetch(`${API_BASE}/planets/`),
          fetch(`${API_BASE}/films/`),
          fetch(`${API_BASE}/species/`)
        ]);

    const planetsData = await planetsRes.json();
    const filmsData = await filmsRes.json();
    const speciesData = await speciesRes.json();
 console.log(planetsData,filmsData,speciesData);


 
        setHomeworlds(planetsData.results);
        setFilms(filmsData.results);
        setSpeciesList(speciesData.results);
      } catch (err) {
        console.error('Error fetching filter options:', err);
      }
    };

  return { homeworlds, films, speciesList };
};