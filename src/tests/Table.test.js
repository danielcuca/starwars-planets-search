import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Table from '../components/Table';

describe('Tests no componenent Table', () => {
  test('testa os filtros', () => {
    render(<Table />);
  const selectElement = getByTestId('column-filter');
  userEvent.selectOptions(selectElement, 'diameter');

  const comparisonElement = getByTestId('comparison-filter');
  userEvent.selectOptions(comparisonElement, 'menor que');

  const valueElement = getByTestId('value-filter');
  userEvent.type(valueElement, '10000');

  const buttonElement = getByTestId('button-filter');
  userEvent.click(buttonElement);

  screen.getByText(/Hoth/i)
  })
});
