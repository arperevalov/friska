import React from "react";
import { render } from "@testing-library/react";
import Header from "@/components/Header";

describe("Card component", () => {
    // it("renders with data", () => {
    // const title = 'random title'
    // const { getByText } = render(<Header title={title}/>);

    // const titleText = getByText(title);
    // const backText = getByText(/go back/i);
    // const itemText = getByText(/new item/i);

    // expect(titleText).toBeInTheDocument()
    // expect(backText).toBeInTheDocument();
    // expect(itemText).toBeInTheDocument();
    // });

    it("renders without data", () => {
        const { getByText } = render(<Header />);

        const brandText = getByText(/friska/i);
        const itemText = getByText(/new item/i);

        expect(brandText).toBeInTheDocument();
        expect(itemText).toBeInTheDocument();
    });
});
