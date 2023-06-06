import React, { useState, useEffect } from 'react';

export default function Table() {
  const [planets, setPlanets] = useState([]);
  const [filtered, setFiltered] = useState('');
  const [filterForm, setFilterForm] = useState('population');
  const [filterComparation, setFilterComparation] = useState('maior que');
  const [filterValue, setFilterValue] = useState('0');
  const [allPlanetsFilter, setAllPlanetsFilter] = useState([]);

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

  const handleFormChange = (e) => {
    setFilterForm(e.target.value);
  };

  const handleComparationChange = (e) => {
    setFilterComparation(e.target.value);
  };

  const handleValueChange = (e) => {
    setFilterValue(e.target.value);
  };

  const formFilterPlanets = (e) => {
    e.preventDefault();
    const filterBase = planets.filter((planet) => {
      const planetValue = parseFloat(planet[filterForm]);
      const filterNumber = parseFloat(filterValue);

      if (filterComparation === 'maior que') {
        return planetValue > filterNumber;
      } if (filterComparation === 'menor que') {
        return planetValue < filterNumber;
      } if (filterComparation === 'igual a') {
        return planetValue === filterNumber;
      }
      return false;
    });
    setAllPlanetsFilter(filterBase);
  };

  const inputFilter = planets.filter((planet) => planet.name.toLowerCase()
    .includes(filtered.toLowerCase()));

  const filteredPlanets = allPlanetsFilter.length > 0 ? allPlanetsFilter : inputFilter;

  return (
    <div>
      <input
        type="text"
        onChange={ handleChange }
        value={ filtered }
        data-testid="name-filter"
      />
      <form>
        <select
          onChange={ handleFormChange }
          data-testid="column-filter"
          value={ filterForm }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>

        <select
          onChange={ handleComparationChange }
          data-testid="comparison-filter"
          value={ filterComparation }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>

        <input
          onChange={ handleValueChange }
          data-testid="value-filter"
          value={ filterValue }
          type="number"
        />

        <button onClick={ formFilterPlanets } data-testid="button-filter">FILTRAR</button>

      </form>
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
            filteredPlanets.map((planet, index) => (
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
