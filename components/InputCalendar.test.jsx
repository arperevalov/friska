import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { InputCalendar } from "@/components/InputCalendar";

const data = {
    label: "Some label",
    setFormData: jest.fn(),
    formKey: "random",
};

describe("InputCalendar component", () => {
    beforeEach(() => {
        data.setFormData.mockClear();
    });

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

    it("calls callback onchange", () => {
        const { container } = render(<InputCalendar {...data} />);

        const input = container.querySelector("input");

        const date = new Date();

        fireEvent.change(input, { target: { value: date.toLocaleDateString("sv-SE") } });

        const callbackCalls = data.setFormData.mock.calls;

        expect(callbackCalls.length).toBe(1);
    });
});
