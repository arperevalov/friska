import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Input } from "@/components/Input";

const data = {
    label: "Some label",
    setFormData: jest.fn(),
    formKey: "random",
};

const dataNumber = {
    defaultValue: 2,
    type: "number",
    min: 2,
    max: 5,
};

const dataText = {
    defaultValue: "",
    type: "text",
};

describe("Input component", () => {
    it("renders number type", () => {
        const { container, getByText } = render(<Input {...data} {...dataNumber} />);

        const labelText = getByText(/some label/i);

        const input = container.querySelector("input");
        const inputTypeNumber = input.getAttribute("type") === "number";

        const inputMin = parseInt(input.getAttribute("min"), 10);
        const inputMax = parseInt(input.getAttribute("max"), 10);
        const inputMinAndMaxSet = inputMin === dataNumber.min && inputMax === dataNumber.max;

        const inputValue = parseInt(input.value, 10);

        expect(labelText).toBeInTheDocument();
        expect(inputTypeNumber).toBeTruthy();
        expect(inputMinAndMaxSet).toBeTruthy();
        expect(inputValue).toEqual(dataNumber.defaultValue);
    });

    it("renders text type", () => {
        const { container, getByText } = render(<Input {...data} {...dataText} />);

        const labelText = getByText(/some label/i);

        const input = container.querySelector("input");
        const inputTypeText = input.getAttribute("type") === "text";

        const inputValue = input.value;

        expect(labelText).toBeInTheDocument();
        expect(inputTypeText).toBeTruthy();
        expect(inputValue).toEqual(dataText.defaultValue);
    });

    it("calls callback onchange", () => {
        const { container } = render(<Input {...data} {...dataText} />);

        const input = container.querySelector("input");

        fireEvent.change(input, {target: {value: 'Hello'}});
        fireEvent.change(input, {target: {value: 'Hello world'}});

        const callbackCalls = data.setFormData.mock.calls;

        expect(callbackCalls.length).toBe(2)
    });
});
