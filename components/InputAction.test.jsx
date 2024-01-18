import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { InputAction } from "@/components/InputAction";

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
    buttonAction: jest.fn(),
    buttonText: "Button Action",
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

describe("InputAction component", () => {
    beforeEach(() => {
        data.buttonAction.mockClear();
    });

    it("renders number type", () => {
        const { container, getByText } = render(<InputAction {...data} {...dataNumber} />);

        const labelText = getByText(/some label/i);
        const buttonText = getByText(/button action/i);

        const input = container.querySelector("input");
        const inputTypeNumber = input.getAttribute("type") === "number";

        const inputMin = parseInt(input.getAttribute("min"), 10);
        const inputMax = parseInt(input.getAttribute("max"), 10);
        const inputMinAndMaxSet = inputMin === dataNumber.min && inputMax === dataNumber.max;

        const inputValue = parseInt(input.value, 10);

        expect(labelText).toBeInTheDocument();
        expect(buttonText).toBeInTheDocument();
        expect(inputTypeNumber).toBeTruthy();
        expect(inputMinAndMaxSet).toBeTruthy();
        expect(inputValue).toEqual(dataNumber.defaultValue);
    });

    it("renders text type", () => {
        const { container, getByText } = render(<InputAction {...data} {...dataText} />);

        const labelText = getByText(/some label/i);
        const buttonText = getByText(/button action/i);

        const input = container.querySelector("input");
        const inputTypeText = input.getAttribute("type") === "text";

        const inputValue = input.value;

        expect(labelText).toBeInTheDocument();
        expect(buttonText).toBeInTheDocument();
        expect(inputTypeText).toBeTruthy();
        expect(inputValue).toEqual(dataText.defaultValue);
    });

    it("calls callback onchange", () => {
        const { container } = render(<InputAction {...data} {...dataText} />);

        const input = container.querySelector("input");

        fireEvent.change(input, { target: { value: "Hello" } });
        fireEvent.change(input, { target: { value: "Hello world" } });

        const callbackCalls = onChange.mock.calls;

        expect(callbackCalls.length).toBe(2);
    });

    it("calls buttonAction callback on click", () => {
        const { container } = render(<InputAction {...data} {...dataText} />);

        const button = container.querySelector("button");

        fireEvent.click(button);

        const callbackCalls = data.buttonAction.mock.calls;

        expect(callbackCalls.length).toBe(1);

        fireEvent.click(button);
        fireEvent.click(button);

        expect(callbackCalls.length).toBe(3);
    });
});
