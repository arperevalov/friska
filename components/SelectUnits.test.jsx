import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { SelectUnits } from "@/components/SelectUnits";

const data = {
    label: "Some label",
    values: ["uno", "dos", "tres"],
    defaultValue: 2,
    setFormData: jest.fn(),
    formKey: "random",
};

describe("SelectUnits component", () => {
    beforeEach(() => {
        data.setFormData.mockClear();
    });

    it("renders", () => {
        const { container, getByText } = render(<SelectUnits {...data} />);

        const labelText = getByText(/some label/i);

        const select = container.querySelector("select");
        const selectedValueBeTruthy = select.value === data.values[data.defaultValue];

        expect(labelText).toBeInTheDocument();
        expect(select).toBeInTheDocument();
        expect(selectedValueBeTruthy).toBeTruthy();
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

        const callbackCalls = data.setFormData.mock.calls;

        expect(callbackCalls.length).toBe(3);
    });
});
