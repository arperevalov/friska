import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { InputCalendar } from "@/components/InputCalendar";

const onChange = jest.fn();
const onInput = jest.fn();

const data = {
    label: "Some label",
    register: () => {
        return {
            onChange,
            onInput,
        };
    },
    formKey: "random",
};

describe("InputCalendar component", () => {
    beforeEach(() => {});

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

        const callbackCalls = onChange.mock.calls;

        expect(callbackCalls.length).toBe(1);
    });
});
