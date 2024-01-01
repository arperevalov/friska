import React from "react";
import { render } from "@testing-library/react";
import { List } from "@/components/List";

const cards = [
    {
        id: 0,
        title: "Milk",
        left_count: 1,
        units: "l",
        list_id: 0,
    },
    {
        id: 1,
        title: "Juice",
        left_count: 1,
        units: "l",
        list_id: 0,
    },
    {
        id: 2,
        title: "Another List Product",
        left_count: 1,
        units: "kg",
        list_id: 1,
    },
];

const data = {
    id: 0,
    title: "List Title",
    cards: cards,
};

describe("List component", () => {
    it("renders", () => {
        const { queryByText } = render(<List {...data} />);

        const titleText = queryByText(/List Title/i);
        const milkText = queryByText(/Milk/i);
        const juiceText = queryByText(/Juice/i);
        const anotherText = queryByText(/Another List Product/i);

        expect(titleText).toBeInTheDocument();
        expect(milkText).toBeInTheDocument();
        expect(juiceText).toBeInTheDocument();
        expect(anotherText).not.toBeInTheDocument();
    });

    it("renders without values", () => {
        const { queryByText } = render(<List {...data} cards={[]} />);

        const titleText = queryByText(/List Title/i);
        const milkText = queryByText(/Milk/i);
        const juiceText = queryByText(/Juice/i);
        const anotherText = queryByText(/Another List Product/i);

        expect(titleText).toBeInTheDocument();
        expect(milkText).not.toBeInTheDocument();
        expect(juiceText).not.toBeInTheDocument();
        expect(anotherText).not.toBeInTheDocument();
    });
});
