import React from "react";
import { render } from "@testing-library/react";
import useLists from "@/hooks/useLists";
import useCards from "@/hooks/useCards";
import Home from "@/app/page";

jest.mock("@/hooks/useLists");
jest.mock("@/hooks/useCards");

const mockStore = {
    cards: [
        {
            id: 0,
            title: "Milk",
            expDate: "Tue Sep 12 2023 23:39:55 GMT+0700 (Krasnoyarsk Standard Time)",
            left: 1,
            units: "kg",
            listId: 0,
        },
        {
            id: 1,
            title: "sss",
            expDate: "Tue Sep 12 2023 23:39:55 GMT+0700 (Krasnoyarsk Standard Time)",
            left: 1,
            units: "l",
            listId: 1,
        },
    ],
    lists: [
        {
            title: "Fridge",
            id: 0,
        },
        {
            title: "Shelf",
            id: 1,
        },
    ],
};

const emptyStore = {
    cards: [],
    lists: [],
};

beforeEach(() => {
    useLists.mockClear();
    useCards.mockClear();
});

describe("Home page", () => {
    it("renders without data", () => {
        useLists.mockReturnValue({ lists: emptyStore.lists });
        useCards.mockReturnValue({ lists: emptyStore.cards });

        const { getByText } = render(<Home />);

        const settingsText = getByText(/settings/i);
        expect(settingsText).toBeInTheDocument();
    });

    it("renders correctly", () => {
        useLists.mockReturnValue({ lists: mockStore.lists });
        useCards.mockReturnValue({ cards: mockStore.cards });

        const { getByText } = render(<Home />);

        const listText = getByText(/fridge/i);
        const cardText = getByText(/milk/i);
        expect(listText).toBeInTheDocument();
        expect(cardText).toBeInTheDocument();
    });
});
