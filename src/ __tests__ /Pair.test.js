import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Pair from '../components/Pair';
/* eslint-disable react/display-name */
jest.mock('../components/Player', () => () => <div data-testid="player" />);

describe('Pair', () => {
  it('Display pair of Player components', async () => {
    const pair = [
      {
        first_name: 'Victor',
        h_in: '61',
        h_meters: '1.81',
        last_name: 'Gonzalez',
      },
      {
        first_name: 'Charles',
        h_in: '59',
        h_meters: '1.78',
        last_name: 'Johnson',

      },
    ];
    render(<Pair list={pair} />);
    const pairOfPlayers = await screen.getAllByTestId('player');
    expect(pairOfPlayers.length).toBe(2);
  });
});
