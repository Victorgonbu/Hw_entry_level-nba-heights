import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AOSMock from 'aos';
import Pairs from '../components/Pairs';
/* eslint-disable react/display-name */
jest.mock('../components/Pair', () => () => <div data-testid="pair" />);

const findPairs = () => screen.getAllByTestId('pair');

describe('Pairs', () => {
  const list = [
    [
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
    ],
  ];
  it('Renders list pass in props using Pair component', async () => {
    render(<Pairs list={list} />);
    const foundPairs = await findPairs();
    expect(foundPairs.length).toBe(1);
  });

  it('Render fade down effect using AOS library', async () => {
    render(<Pairs list={list} />);
    await waitFor(() => expect(AOSMock.init).toHaveBeenCalledTimes(1));
    expect(AOSMock.init).toHaveBeenCalledTimes(1);
  });
});
