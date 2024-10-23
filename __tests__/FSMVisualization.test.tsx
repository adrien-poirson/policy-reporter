import React from "react";
import { render, screen } from "@testing-library/react";
import FSMVisualization from "../src/components/fsmVisualizer/FSMVisualizer";
import { FSMConfig } from "fsm-generator";

const mockFSM: FSMConfig<string> = {
    states: ["S0", "S1", "S2"],
    initialState: "S0",
    acceptingStates: ["S2"],
    transitions: [
        ["S0", "0", "S0"],
        ["S0", "1", "S1"],
        ["S1", "0", "S2"],
        ["S1", "1", "S0"],
        ["S2", "0", "S1"],
        ["S2", "1", "S2"],
    ],
    alphabet: ["0", "1"],
    outputs: [],
};

describe("FSMVisualization", () => {
    it("renders SVG container", () => {
        render(<FSMVisualization fsm={mockFSM} />);
        const svgContainer = screen.getByTestId("fsm-visualization");
        expect(svgContainer).toBeInTheDocument();
    });

    it("renders correct number of state representations", () => {
        render(<FSMVisualization fsm={mockFSM} />);
        const stateElements = screen.getAllByTestId("fsm-state");
        expect(stateElements).toHaveLength(mockFSM.states.length);
    });

    test("renders correct number of transitions", () => {
        render(<FSMVisualization fsm={mockFSM} />);
        const svg = screen.getByTestId("fsm-visualization");
        const transitionGroups = svg.querySelectorAll("g > path");
        // We add 1 because one path is used for the initial state indicator
        expect(transitionGroups).toHaveLength(mockFSM.transitions.length + 1);
    });

    test("renders initial state indicator", () => {
        render(<FSMVisualization fsm={mockFSM} />);
        const initialStateIndicator = screen.getByTestId(
            "initial-state-indicator"
        );
        expect(initialStateIndicator).toBeInTheDocument();
    });
});
