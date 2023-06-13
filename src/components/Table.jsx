import React, { useState, useEffect } from 'react';

export default function Table() {
  const [planets, setPlanets] = useState([]);
  const [filtered, setFiltered] = useState('');
  const [filterForm, setFilterForm] = useState('population');
  const [filterComparation, setFilterComparation] = useState('maior que');
  const [filterValue, setFilterValue] = useState('0');
  const [filterOptions, setFilterOptions] = useState([]);
  const [filterOptionAvaliable, setfilterOptionAvaliable] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

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

  // const handleRemoveFilter = (index) => {
  //   const updatedFilters = [...filterOptions];
  //   updatedFilters.splice(index, 1);
  //   setFilterOptions(updatedFilters);
  // };

  const handleFilter = () => {
    const newFilter = {
      form: filterForm,
      comparation: filterComparation,
      value: filterValue,
    };

    setFilterOptions([...filterOptions, newFilter]);
    setfilterOptionAvaliable(filterOptionAvaliable.filter((option) => option !== filterForm));

    const filterBase = planets.filter((planet) => [...filterOptions, newFilter]
      .every((filter) => {
        const planetValue = parseFloat(planet[filter.form]);
        const filterNumber = parseFloat(filter.value);

        if (filter.comparation === 'maior que') {
          return planetValue > filterNumber;
        } if (filter.comparation === 'menor que') {
          return planetValue < filterNumber;
        } if (filter.comparation === 'igual a') {
          return planetValue === filterNumber;
        }

        return false;
      }));

    setPlanets(filterBase);
  };

  const inputFilter = planets.filter((planet) => planet.name.toLowerCase()
    .includes(filtered.toLowerCase()));

  const filteredPlanets = inputFilter;

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
          {filterOptionAvaliable.map((option) => (
            <option key={ option } value={ option }>
              {option}
            </option>
          ))}
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

        <button
          type="button"
          onClick={ handleFilter }
          data-testid="button-filter"
        >
          Filtrar
        </button>

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
