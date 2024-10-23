import FiniteStateMachine, { FSMConfig } from "fsm-generator";

export enum State {
    S0 = "S0",
    S1 = "S1",
    S2 = "S2",
}

type Output = "0" | "1" | "2";

const fsmConfig: FSMConfig<Output> = {
    states: Object.values(State),
    alphabet: ["0", "1"],
    initialState: State.S0,
    acceptingStates: Object.values(State), // All states are accepting in this implementation
    transitions: [
        [State.S0, "0", State.S0],
        [State.S0, "1", State.S1],
        [State.S1, "0", State.S2],
        [State.S1, "1", State.S0],
        [State.S2, "0", State.S1],
        [State.S2, "1", State.S2],
    ],
    outputs: [
        [State.S0, "0"],
        [State.S1, "1"],
        [State.S2, "2"],
    ],
};

// We export the instanciated version of the Modulo Three FSM (Singleton pattern) for ease of use across the app.
const modThreeFSM = new FiniteStateMachine<Output>(fsmConfig);

export default modThreeFSM;
