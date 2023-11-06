import React from "react";
import { render } from "@testing-library/react";
import { InputCalendar } from "@/components/InputCalendar";

const data = {
    label: "Some label",
    setFormData: jest.fn(),
    formKey: "random",
};

describe("InputCalendar component", () => {
    it("renders", () => {
        const { container, getByText } = render(<InputCalendar {...data} />);

        const labelText = getByText(/some label/i);

        const input = container.querySelector("input");
        const inputTypeDate = input.getAttribute("type") === "date";

        expect(labelText).toBeInTheDocument();
        expect(inputTypeDate).toBeTruthy();
    });

    it("renders default value", () => {
        const date = new Date();
        const { container, getByText } = render(<InputCalendar {...data} defaultValue={date} />);

        const labelText = getByText(/some label/i);

        const input = container.querySelector("input");

        const inputValue = input.value;

        expect(labelText).toBeInTheDocument();
        expect(inputValue).toEqual(date.toLocaleDateString("sv-SE"));
    });
});
