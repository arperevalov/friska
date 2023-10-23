import React from 'react';
import { render } from '@testing-library/react';
import { Card } from '@/components/Card';

const cardData = {
    id: 0,
    title: "Milk",
    expDate: "Tue Sep 12 2023 23:39:55 GMT+0700 (Krasnoyarsk Standard Time)",
    left: 1,
    units: "kg",
    listId: 0
};

describe('Card component', () => {
    it('renders with data', () => {
        const { getByText } = render(<Card {...cardData}/>);

        const titleText = getByText(/Milk/i);
        const expDateText = getByText(/9\/12\/2023/i);
        const leftText = getByText(/1 kg/i);

        expect(titleText).toBeInTheDocument();
        expect(expDateText).toBeInTheDocument();
        expect(leftText).toBeInTheDocument();
    });
});
