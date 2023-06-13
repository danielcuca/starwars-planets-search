import React, { useState, useEffect } from 'react';

export default function Table() {
  const [planets, setPlanets] = useState([]);
  const [filtered, setFiltered] = useState('');
  const [filterForm, setFilterForm] = useState('population');
  const [filterComparation, setFilterComparation] = useState('maior que');
  const [filterValue, setFilterValue] = useState('0');
  const [filterOptions, setFilterOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterBase, setFilterBase] = useState([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };

    fetchPlanets();
  }, []);

  const optionsAvaliable = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const filterUsed = optionsAvaliable
    .filter((element) => !filterOptions.some((ele) => ele.form === element));

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

  useEffect(() => {
    const filteredBase = planets
      .filter((planet) => filterOptions.every((filter) => {
        const planetValue = parseFloat(planet[filter.form]);
        const filterNumber = parseFloat(filter.value);

        if (planetValue === 'unknown') return false;

        if (filter.comparation === 'maior que') {
          return planetValue > filterNumber;
        } if (filter.comparation === 'menor que') {
          return planetValue < filterNumber;
        } if (filter.comparation === 'igual a') {
          return planetValue === filterNumber;
        }

        return false;
      }));
    setFilterBase(filteredBase);
  }, [filterOptions, planets]);

  const handleFilter = () => {
    const newFilter = {
      form: filterForm,
      comparation: filterComparation,
      value: filterValue,
    };

    setFilterOptions([...filterOptions, newFilter]);

    setFilterForm(optionsAvaliable[optionsAvaliable
      .indexOf(filterForm) + 1] || filterUsed[0]);
  };

  const handleRemove = (column) => {
    const updatedFilters = filterOptions.filter((prev) => prev.form !== column);
    setFilterOptions(updatedFilters);
  };

  const handleRemoveAll = () => {
    setFilterOptions([]);
  };

  if (loading) {
    return (
      <div>
        <h2>Carregando</h2>
      </div>
    );
  }

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
          {filterUsed.map((option) => (
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

        <button
          data-testid="button-remove-filters"
          type="button"
          onClick={ handleRemoveAll }
        >
          Remover todas filtragens
        </button>

        {filterOptions.map((filter, index) => (
          <div data-testid="filter" key={ index }>
            {`${filter.form} ${filter.comparation} ${filter.value}`}
            <button
              data-testid="remove-button"
              type="button"
              onClick={ () => handleRemove(filter.form) }
            >
              x

            </button>
          </div>
        ))}

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
          {filterBase.filter((planet) => planet.name
            .toLowerCase()
            .includes(filtered.toLowerCase()))
            .map((planet, index) => (
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
            ))}
        </tbody>
      </table>
    </div>
  );
}
