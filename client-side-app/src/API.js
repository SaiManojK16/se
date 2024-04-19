import React, { useState, useEffect } from 'react';
import axios from 'axios';

function API() {
  const [pokemonData, setPokemonData] = useState([]);
  const [typeData, setTypeData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10');
        const data = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const detailsResponse = await axios.get(pokemon.url);
            return {
              id: detailsResponse.data.id,
              name: detailsResponse.data.name,
              types: detailsResponse.data.types.map((type) => type.type.name),
              abilities: detailsResponse.data.abilities.map((ability) => ability.ability.name).join(', '),
              baseExperience: detailsResponse.data.base_experience,
            };
          })
        );
        setPokemonData(data);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const countPokemonTypes = () => {
      const typesCount = {};

      pokemonData.forEach((pokemon) => {
        pokemon.types.forEach((type) => {
          typesCount[type] = (typesCount[type] || 0) + 1;
        });
      });

      setTypeData(typesCount);
    };

    countPokemonTypes();
  }, [pokemonData]);

  return (
    <div>
      <h1>Pokémon Details</h1>
      <div>
        
        <table style={{ border: 'solid 1px blue', width: '100%' }}>
          <thead>
            <tr style={{ background: 'aliceblue' }}>
              <th style={{ borderBottom: 'solid 3px red', fontWeight: 'bold' }}>ID</th>
              <th style={{ borderBottom: 'solid 3px red', fontWeight: 'bold' }}>Name</th>
              <th style={{ borderBottom: 'solid 3px red', fontWeight: 'bold' }}>Types</th>
              <th style={{ borderBottom: 'solid 3px red', fontWeight: 'bold' }}>Abilities</th>
              <th style={{ borderBottom: 'solid 3px red', fontWeight: 'bold' }}>Base Experience</th>
            </tr>
          </thead>
          <tbody>
            {pokemonData.map((pokemon, index) => (
              <tr key={index} style={{ background: index % 2 === 0 ? 'lightgray' : 'whitesmoke' }}>
                <td style={{ padding: '10px', border: 'solid 1px gray', textAlign: 'center' }}>{pokemon.id}</td>
                <td style={{ padding: '10px', border: 'solid 1px gray', textAlign: 'center' }}>{pokemon.name}</td>
                <td style={{ padding: '10px', border: 'solid 1px gray', textAlign: 'center' }}>{pokemon.types.join(', ')}</td>
                <td style={{ padding: '10px', border: 'solid 1px gray', textAlign: 'center' }}>{pokemon.abilities}</td>
                <td style={{ padding: '10px', border: 'solid 1px gray', textAlign: 'center' }}>{pokemon.baseExperience}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default API;
