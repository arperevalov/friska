import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Select } from "@/components/Select";

const onChange = jest.fn();
const onInput = jest.fn();

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
    register: () => {
        return {
            onChange,
            onInput,
        };
    },
    formKey: "random",
};

describe("Select component", () => {
    beforeEach(() => {});

    it("renders", () => {
        const { container, getByText } = render(<Select {...data} />);

        const labelText = getByText(/some label/i);

        const select = container.querySelector("select");

        expect(labelText).toBeInTheDocument();
        expect(select).toBeInTheDocument();
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

        const callbackCalls = onChange.mock.calls;

        expect(callbackCalls.length).toBe(2);
    });
});
