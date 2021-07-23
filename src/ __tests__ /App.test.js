import React from 'react';
import {
  render, fireEvent, screen, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import 'whatwg-fetch';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from '../App';

jest.mock('../components/Pairs', () => () => <div data-testid="pairs" />);

const server = setupServer(
  rest.get('https://mach-eight.uc.r.appspot.com/', (req, res, ctx) => res(ctx.json({
    values: [
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
  }))),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('App', () => {

  it('Renders title and search container after successfully fetching nba players height API.', async () => {
    render(<App/>);
    await waitFor(() => screen.getByTestId('main-container'));
    const searchBox = await screen.getByPlaceholderText('Input target height');
    const searchButton = await screen.getByTestId('search-button');
    const title = await screen.getByText('NBA Player heights');
    expect(searchBox).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  })

  describe('Looks for pairs of NBA players whose heights adds up to inputted value.', () => {

    it('Renders successful message and Pairs component if any matches are found.', async ()=> {
        render(<App />);
        await waitFor(() => screen.getByTestId('main-container'));
        const searchBox = await screen.getByPlaceholderText('Input target height');
        const searchButton = await screen.getByTestId('search-button');
        fireEvent.change(searchBox, { target: { value: 120 } });
        fireEvent.click(searchButton);

        expect(await screen.getByTestId('pairs')).toBeInTheDocument();
        expect(await screen.getByText('Result for pairs of players whose height adds up to 120 inches')).toBeInTheDocument();
    });

    it('Renders unsuccessful message and does not render Pairs component if not matches are found.', async() => {
        render(<App />);
        await waitFor(() => screen.getByTestId('main-container'));
        const searchBox = await screen.getByPlaceholderText('Input target height');
        const searchButton = await screen.getByTestId('search-button');
        fireEvent.change(searchBox, { target: { value: 121 } });
        fireEvent.click(searchButton);

        expect(await screen.queryByTestId('pairs')).toBeFalsy();
        expect(await screen.getByText('No matches found')).toBeInTheDocument();
    })
    
  });
});
