import { useState, FormEvent, useMemo, ChangeEvent } from "react";

import modThreeFSM from "../../../utils/modThreeFSM";
import binaryToDecimal from "../../../utils/binaryToDecimal";
import isValidBinary from "../../../utils/isValidBinary";
import FSMVisualization from "../fsmVisualizer/FSMVisualizer";
import FSMText from "../fsmVisualizer/FSMText";
import "./styles.css";

type CalculationResult = {
    decimalValue: number;
    remainder: string;
};

const ModThreeCalculator: React.FC = () => {
    const [input, setInput] = useState<string>("");
    const [result, setResult] = useState<CalculationResult | null>(null);
    const [error, setError] = useState<string>("");
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    const modThree = (input: string) => {
        const result = modThreeFSM.process(input);
        if (!result.accepted) {
            throw new Error("Input ended in non-accepting state");
        }
        if (result.output === null) {
            throw new Error("No output produced for the final state");
        }
        return result.output;
    };

    const fsmStructure = useMemo(() => modThreeFSM.getStructure("object"), []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (!isValidBinary(input)) {
            setError("Please enter a valid binary number (only 0s and 1s)");
            setResult(null);
        } else {
            setError("");
            const decimalValue = binaryToDecimal(input);
            const remainder = modThree(input);
            setResult({ decimalValue, remainder });
        }
    };

    const handleReset = (): void => {
        setInput("");
        setResult(null);
        setError("");
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
        setInput(e.target.value);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <>
            <div className="mod-three-container">
                <h1>Modulo Three Calculator FSM</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Enter a binary number"
                    />
                    <button type="submit" className="submit-button">
                        Calculate
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        className="reset-button"
                    >
                        Reset
                    </button>
                </form>
                {error && <p className="error">{error}</p>}
                {result && (
                    <div>
                        <p className="decimal-value">
                            Decimal value: {result.decimalValue}
                        </p>
                        <p className="result">
                            The remainder is {result.remainder}
                        </p>
                    </div>
                )}
            </div>
            <button onClick={toggleDrawer} className="visualize-button">
                {drawerOpen ? "Hide" : "Show"} FSM
            </button>
            {drawerOpen && (
                <>
                    <FSMVisualization
                        fsm={fsmStructure}
                        width={800}
                        height={250}
                    />
                    <FSMText fsm={fsmStructure} />
                </>
            )}
        </>
    );
};

export default ModThreeCalculator;
