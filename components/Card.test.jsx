import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Card } from '@/components/Card';

const cardData = {
    id: 0,
    title: "Milk",
    left: 1,
    units: "kg",
    listId: 0
};

const currentDate = new Date();
const oldDate = "Tue Sep 12 1999 23:39:55 GMT+0700 (Krasnoyarsk Standard Time)";

describe('Card component', () => {
    it('renders with data', () => {
        const { getByText } = render(<Card {...cardData} expDate={currentDate}/>);

        const titleText = getByText(/Milk/i);
        const expDateText = getByText(currentDate.toLocaleDateString());
        const leftText = getByText(/1 kg/i);

        expect(titleText).toBeInTheDocument();
        expect(expDateText).toBeInTheDocument();
        expect(leftText).toBeInTheDocument();
    });

    it('renders fresh', () => {
        const { container } = render(<Card {...cardData} expDate={currentDate}/>);

        const outdated = container.querySelector('.card').classList.contains('outdated');
        expect(outdated).toBeFalsy();
    });

    it('renders outdated', () => {
        const { container } = render(<Card {...cardData} expDate={oldDate}/>);

        const outdated = container.querySelector('.card').classList.contains('outdated');
        expect(outdated).toBeTruthy();
    });

    it('toggles card active state', () => {
        const { container } = render(<Card {...cardData} expDate={currentDate}/>);

        const card = container.querySelector('.card');
        const cardContainer = container.querySelector('.card__container');

        fireEvent.click(cardContainer);
        const active = card.classList.contains('active');
        expect(active).toBeTruthy();

        fireEvent.click(cardContainer);
        const activeSecond = card.classList.contains('active');
        expect(activeSecond).toBeFalsy();
    });
});
