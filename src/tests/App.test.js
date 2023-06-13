import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Table from '../components/Table';
import testData from '../../cypress/mocks/testData';

describe('table tests', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });
});
  afterEach(jest.restoreAllMocks);

  test('testa se planeta está na tela', async () => {
    render(<Table />);
    await screen.findByTestId('name-filter');
    
    const nameFilterInput = screen.getByTestId('name-filter');
    fireEvent.change(nameFilterInput, { target: { value: 'Tatooine' } });
    
    const filteredRows = screen.getAllByRole('row', { name: /Tatooine/i });
    expect(filteredRows.length).toBeGreaterThan(0);
  });

  test('testa adicionar filtros', async () => {
    render(<Table />);
    await screen.findByTestId('name-filter');
    
    const columnFilterSelect = screen.getByTestId('column-filter');
    const comparisonFilterSelect = screen.getByTestId('comparison-filter');
    const valueFilterInput = screen.getByTestId('value-filter');
    const filterButton = screen.getByTestId('button-filter');
    // const bespin = await screen.findByText(/Bespin/i);
    const removeButton = screen.getByTestId('button-remove-filters')

    userEvent.selectOptions(columnFilterSelect, 'rotation_period');
    userEvent.selectOptions(comparisonFilterSelect, 'igual a');
    userEvent.type(valueFilterInput, '23');
    userEvent.click(filterButton);

    // expect(bespin).not.toBeInTheDocument();
    screen.getByText(/Hoth/i);

    userEvent.click(removeButton);
  
    screen.getByText(/Endor/i);
  });

  test('testa adicionar filtros 2', async () => {
    render(<Table />);
    await screen.findByTestId('name-filter');
    
    const columnFilterSelect = screen.getByTestId('column-filter');
    const comparisonFilterSelect = screen.getByTestId('comparison-filter');
    const valueFilterInput = screen.getByTestId('value-filter');
    const filterButton = screen.getByTestId('button-filter');;

    userEvent.selectOptions(columnFilterSelect, 'orbital_period');
    userEvent.selectOptions(comparisonFilterSelect, 'menor que');
    userEvent.type(valueFilterInput, '315');
    userEvent.click(filterButton);

    screen.getByText(/Tatooine/i);
  });
});
