import React from "react";
import { render } from "@testing-library/react";
import { List } from "@/components/List";
import useLists from "@/hooks/useLists";

jest.mock("@/hooks/useLists");


const cards = [
    {
        id: 0,
        units: "l",
        list_id: 0,
        title: "Oranges",
        units: "kg",
        left_count: 1,
        user_id: 1,
    },
    {
        id: 1,
        units: "l",
        list_id: 1,
        title: "Juice",
        units: "l",
        left_count: 1,
        user_id: 1,
        list_id: 0,
    },
    {
        list_id: 1,
        units: "kg",
        left_count: 1,
        user_id: 1,
        id: 2,
        title: "Another List Product",
        left_count: 1,
        units: "kg",
        list_id: 1,
    },
];

const lists = [
    {
        id: 0,
        title: "List Title",
        best_before: 2,
    }
]

const data = {
    ...lists[0],
    searchValue: "",
    cards,
};

describe("List component", () => {
    beforeEach(() => {
        useLists.mockClear();
        useLists.mockReturnValue({
            lists,
        });
    });

    it("renders", () => {
        const { queryByText } = render(<List {...data} />);

        const titleText = queryByText(/List Title/i);
        const milkText = queryByText(/Oranges/i);
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
        const milkText = queryByText(/Oranges/i);
        const juiceText = queryByText(/Juice/i);
        const anotherText = queryByText(/Another List Product/i);

        expect(titleText).toBeInTheDocument();
        expect(milkText).not.toBeInTheDocument();
        expect(juiceText).not.toBeInTheDocument();
        expect(anotherText).not.toBeInTheDocument();
    });
});
