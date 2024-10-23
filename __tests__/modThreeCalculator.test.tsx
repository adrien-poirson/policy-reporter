import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import ModThreeCalculator from "../src/components/modThreeCalculator/modThreeCalculator";

describe("ModThreeCalculator", () => {
    it("renders without crashing", () => {
        render(<ModThreeCalculator />);
        expect(
            screen.getByText("Modulo Three Calculator FSM")
        ).toBeInTheDocument();
    });

    it("handles valid binary input correctly", () => {
        render(<ModThreeCalculator />);
        const input = screen.getByPlaceholderText("Enter a binary number");
        const submitButton = screen.getByText("Calculate");

        fireEvent.change(input, { target: { value: "1010" } });
        fireEvent.click(submitButton);

        expect(screen.getByText("Decimal value: 10")).toBeInTheDocument();
        expect(screen.getByText("The remainder is 1")).toBeInTheDocument();
    });

    it("displays error for invalid binary input", () => {
        render(<ModThreeCalculator />);
        const input = screen.getByPlaceholderText("Enter a binary number");
        const submitButton = screen.getByText("Calculate");

        fireEvent.change(input, { target: { value: "1234" } });
        fireEvent.click(submitButton);

        expect(
            screen.getByText(
                "Please enter a valid binary number (only 0s and 1s)"
            )
        ).toBeInTheDocument();
    });

    it("resets the form when Reset button is clicked", () => {
        render(<ModThreeCalculator />);
        const input = screen.getByPlaceholderText("Enter a binary number");
        const submitButton = screen.getByText("Calculate");
        const resetButton = screen.getByText("Reset");

        fireEvent.change(input, { target: { value: "1010" } });
        fireEvent.click(submitButton);
        fireEvent.click(resetButton);

        expect(input).toHaveValue("");
        expect(screen.queryByText("Decimal value:")).not.toBeInTheDocument();
        expect(screen.queryByText("The remainder is")).not.toBeInTheDocument();
    });

    it("toggles FSM visualization when Show/Hide FSM button is clicked", () => {
        render(<ModThreeCalculator />);
        const toggleButton = screen.getByText("Show FSM");

        fireEvent.click(toggleButton);
        expect(screen.getByText("Hide FSM")).toBeInTheDocument();

        fireEvent.click(toggleButton);
        expect(screen.getByText("Show FSM")).toBeInTheDocument();
    });
});
