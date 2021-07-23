import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Pairs from '../components/Pairs';
/* eslint-disable react/display-name */
jest.mock('../components/Pair', () => () => <div data-testid="pair" />);

const findPairs = () =>  {
   return screen.getAllByTestId('pair');
}

describe('Pairs', () => {
    it('Renders list pass in props using Pair component', async() => {
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
            
                  }
            ]
        ]
        render(<Pairs list={list}/>);
        let foundPairs = await findPairs();
        expect(foundPairs.length).toBe(1);
    })
});
