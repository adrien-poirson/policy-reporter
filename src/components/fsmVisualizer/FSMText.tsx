import { FSMConfig } from "fsm-generator";

interface FSMTextProps {
    fsm: FSMConfig<string>;
}

function FSMText({ fsm }: FSMTextProps): JSX.Element {
    const formatTransitions = (transitions: [string, string, string][]) => {
        return transitions.map(([from, input, to], index) => (
            <li key={index}>
                {from} (input: {input}) → {to}
            </li>
        ));
    };

    return (
        <div className="fsm-text">
            <h3>FSM Structure:</h3>
            <p>
                <strong>States:</strong> {fsm.states.join(", ")}
            </p>
            <p>
                <strong>Initial State:</strong> {fsm.initialState}
            </p>
            <p>
                <strong>Accept States:</strong> {fsm.acceptingStates.join(", ")}
            </p>
            <h4>Transitions:</h4>
            <ul>{formatTransitions(fsm.transitions)}</ul>
        </div>
    );
}

export default FSMText;
