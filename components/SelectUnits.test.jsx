import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { SelectUnits } from "@/components/SelectUnits";

const onChange = jest.fn();
const onInput = jest.fn();

const data = {
    label: "Some label",
    values: ["uno", "dos", "tres"],
    register: () => {
        return {
            onChange,
            onInput,
        };
    },
    formKey: "random",
};

describe("SelectUnits component", () => {
    beforeEach(() => {});

    it("renders", () => {
        const { container, getByText } = render(<SelectUnits {...data} />);

        const labelText = getByText(/some label/i);

        const select = container.querySelector("select");

        expect(labelText).toBeInTheDocument();
        expect(select).toBeInTheDocument();
    });

    it("renders without values", () => {
        const { container, getByText } = render(<SelectUnits {...data} values={[]} defaultValue={null} />);

        const labelText = getByText(/some label/i);

        const select = container.querySelector("select");

        expect(labelText).toBeInTheDocument();
        expect(select).toBeInTheDocument();
    });

    it("calls callback onchange", () => {
        const { container } = render(<SelectUnits {...data} />);

        const select = container.querySelector("select");

        fireEvent.change(select, { target: { value: data.values[0] } });
        fireEvent.change(select, { target: { value: data.values[2] } });

        const callbackCalls = onChange.mock.calls;

        expect(callbackCalls.length).toBe(2);
    });
});
