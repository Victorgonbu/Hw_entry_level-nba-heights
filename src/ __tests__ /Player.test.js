import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Player from '../components/Player';

describe('Player', () => {
  it('Display player attributes pass in props', async () => {
    const player = {
      first_name: 'Victor',
      h_in: '61',
      h_meters: '1.81',
      last_name: 'Gonzalez',
    };

    render(<Player value={player} />);
    const firstName = await screen.getByText('Victor');
    const lastName = await screen.getByText('Gonzalez');
    const heightInches = await screen.getByText('61″');
    const heightMeters = await screen.getByText('1.81 m');

    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
    expect(heightInches).toBeInTheDocument();
    expect(heightMeters).toBeInTheDocument();
  });
});
