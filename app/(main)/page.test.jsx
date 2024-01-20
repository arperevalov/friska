import React from "react";
import { render } from "@testing-library/react";
import useLists from "@/hooks/useLists";
import useCards from "@/hooks/useCards";
import Home from "@/app/(main)/page";

jest.mock("@/hooks/useLists");
jest.mock("@/hooks/useCards");

const dateString = new Date().toISOString().replace(/(\d)T(\d.{0,})\.\d{0,}Z/, "$1 $2");

const mockStore = {
    cards: [
        {
            id: 0,
            units: "l",
            list_id: 0,
            title: "Oranges",
            units: "kg",
            left_count: 1,
            user_id: 1,
            exp_date: dateString,
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
            exp_date: dateString,
        },
    ],
    lists: [
        {
            id: 0,
            title: "List Title",
            best_before: 2,
        },
    ],
};

const emptyStore = {
    cards: [],
    lists: [],
};

describe("Home page", () => {
    beforeEach(() => {
        useCards.mockClear();
        useLists.mockClear();
    });

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

        const listText = getByText(/list title/i);
        const cardText = getByText(/oranges/i);
        expect(listText).toBeInTheDocument();
        expect(cardText).toBeInTheDocument();
    });
});
