import React, { useState, useEffect } from 'react';

export default function Table() {
  const [planets, setPlanets] = useState([]);
  const [filtered, setFiltered] = useState('');

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/planets');
        const data = await response.json();
        const deleteResidents = data.results.map((element) => {
          delete element.residents;
          return element;
        });
        setPlanets(deleteResidents);
      } catch (error) {
        console.log('error:', error);
      }
    };

    fetchPlanets();
  }, []);

  const handleChange = (e) => {
    setFiltered(e.target.value);
  };

  const inputFilter = planets.filter((planet) => planet.name.toLowerCase()
    .includes(filtered.toLowerCase()));

  return (
    <div>
      <input
        type="text"
        onChange={ handleChange }
        value={ filtered }
        data-testid="name-filter"
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {
            inputFilter.map((planet, index) => (
              <tr key={ index }>
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
