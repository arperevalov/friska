import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Select } from "@/components/Select";

const data = {
    label: "Some label",
    values: [
        {
            title: "Something",
            id: 0,
        },
        {
            title: "Nothing",
            id: 1,
        },
        {
            title: "Anything",
            id: 2,
        },
    ],
    defaultValue: 2,
    setFormData: jest.fn(),
    formKey: "random",
};

describe("Select component", () => {
    beforeEach(() => {
        data.setFormData.mockClear();
    });

    it("renders", () => {
        const { container, getByText } = render(<Select {...data} />);

        const labelText = getByText(/some label/i);

        const select = container.querySelector("select");
        const selectedValueBeTruthy = parseInt(select.value, 10) === data.defaultValue;

        expect(labelText).toBeInTheDocument();
        expect(select).toBeInTheDocument();
        expect(selectedValueBeTruthy).toBeTruthy();
    });

    it("renders without values", () => {
        const { container, getByText } = render(<Select {...data} values={[]} />);

        const labelText = getByText(/some label/i);

        const select = container.querySelector("select");

        expect(labelText).toBeInTheDocument();
        expect(select).toBeInTheDocument();
    });

    it("calls callback onchange", () => {
        const { container } = render(<Select {...data} />);

        const select = container.querySelector("select");

        fireEvent.change(select, { target: { value: 1 } });
        fireEvent.change(select, { target: { value: 2 } });

        const callbackCalls = data.setFormData.mock.calls;

        expect(callbackCalls.length).toBe(3);
    });
});
