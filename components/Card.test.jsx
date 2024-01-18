import React from "react";
import { render, fireEvent } from "@testing-library/react";
import useCards from "@/hooks/useCards";
import useLists from "@/hooks/useLists";
import { Card } from "@/components/Card";

jest.mock("@/hooks/useCards");
jest.mock("@/hooks/useLists");

const cardData = {
    id: 1,
    left_count: 1,
    list_id: 1,
    title: "Oranges",
    units: "kg",
    user_id: 1,
};

const listData = {
    title: "List name",
    id: 1,
    best_before: 2,
};
const removeCardAction = jest.fn();
const incrementCardLeftAction = jest.fn();
const decrementCardLeftAction = jest.fn();

const correctDate = new Date(new Date().getTime() + 10000000000);
const correctDateString = correctDate.toISOString().replace(/(\d)T(\d.{0,})\.\d{0,}Z/, "$1 $2");
const incorrectDate = "1999-01-18T00:00:00";

describe("Card component", () => {
    beforeEach(() => {
        useCards.mockClear();
        useCards.mockReturnValue({
            removeCardAction,
            incrementCardLeftAction,
            decrementCardLeftAction
        });

        useLists.mockClear();
        useLists.mockReturnValue({
            lists: [listData],
        });
    });

    it("renders with data", () => {
        const { getByText } = render(<Card {...cardData} exp_date={correctDateString} />);

        const titleText = getByText(/Oranges/i);
        const exp_dateText = getByText(correctDate.toLocaleDateString());
        const leftText = getByText(/1 kg/i);

        expect(titleText).toBeInTheDocument();
        expect(exp_dateText).toBeInTheDocument();
        expect(leftText).toBeInTheDocument();
    });

    it("renders fresh", () => {
        const { container } = render(<Card {...cardData} exp_date={correctDateString} />);

        const outdated = container.querySelector(".card").classList.contains("outdated");
        expect(outdated).toBeFalsy();
    });

    it("renders outdated", () => {
        const { container } = render(<Card {...cardData} exp_date={incorrectDate} />);

        const outdated = container.querySelector(".card").classList.contains("outdated");
        expect(outdated).toBeTruthy();
    });

    it("toggles card active state", () => {
        const { container } = render(<Card {...cardData} exp_date={correctDateString} />);

        const card = container.querySelector(".card");
        const cardContainer = container.querySelector(".card__container");

        fireEvent.click(cardContainer);
        const active = card.classList.contains("active");
        expect(active).toBeTruthy();

        fireEvent.click(cardContainer);
        const activeSecond = card.classList.contains("active");
        expect(activeSecond).toBeFalsy();
    });

    it("calls increment, decrement callbacks", () => {
        const { container } = render(<Card {...cardData} exp_date={correctDateString} />);

        const btnsContainer = container.querySelector(".card__btns");
        const btnIncrement = btnsContainer.querySelector(".btn--primary");
        const btnDecrement = btnsContainer.querySelector(".btn--secondary");

        fireEvent.click(btnIncrement);
        fireEvent.click(btnIncrement);
        fireEvent.click(btnDecrement);

        const decrementCalls = decrementCardLeftAction.mock.calls;
        const incrementCalls = incrementCardLeftAction.mock.calls;

        expect(decrementCalls.length).toBe(1);
        expect(incrementCalls.length).toBe(2);
    });
});
