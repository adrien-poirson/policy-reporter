import modThreeFSM from "../utils/modThreeFSM";

describe("modThreeFSM", () => {
    test("returns correct object for binary numbers divisible by 3", () => {
        expect(modThreeFSM.process("0")).toEqual({
            accepted: true,
            finalState: "S0",
            output: "0",
        });
        expect(modThreeFSM.process("11")).toEqual({
            accepted: true,
            finalState: "S0",
            output: "0",
        });
        expect(modThreeFSM.process("110")).toEqual({
            accepted: true,
            finalState: "S0",
            output: "0",
        });
        expect(modThreeFSM.process("1001")).toEqual({
            accepted: true,
            finalState: "S0",
            output: "0",
        });
        expect(modThreeFSM.process("11110")).toEqual({
            accepted: true,
            finalState: "S0",
            output: "0",
        });
    });

    test("returns correct object for binary numbers that give remainder 1 when divided by 3", () => {
        expect(modThreeFSM.process("1")).toEqual({
            accepted: true,
            finalState: "S1",
            output: "1",
        });
        expect(modThreeFSM.process("100")).toEqual({
            accepted: true,
            finalState: "S1",
            output: "1",
        });
        expect(modThreeFSM.process("111")).toEqual({
            accepted: true,
            finalState: "S1",
            output: "1",
        });
        expect(modThreeFSM.process("1010")).toEqual({
            accepted: true,
            finalState: "S1",
            output: "1",
        });
        expect(modThreeFSM.process("1101")).toEqual({
            accepted: true,
            finalState: "S1",
            output: "1",
        });
    });

    test("returns correct object for binary numbers that give remainder 2 when divided by 3", () => {
        expect(modThreeFSM.process("10")).toEqual({
            accepted: true,
            finalState: "S2",
            output: "2",
        });
        expect(modThreeFSM.process("1011")).toEqual({
            accepted: true,
            finalState: "S2",
            output: "2",
        });
        expect(modThreeFSM.process("101001")).toEqual({
            accepted: true,
            finalState: "S2",
            output: "2",
        });
        expect(modThreeFSM.process("11010100")).toEqual({
            accepted: true,
            finalState: "S2",
            output: "2",
        });
        expect(modThreeFSM.process("110100110")).toEqual({
            accepted: true,
            finalState: "S2",
            output: "2",
        });
    });

    test("handles empty string input", () => {
        expect(modThreeFSM.process("")).toEqual({
            accepted: true,
            finalState: "S0",
            output: "0",
        });
    });

    test("handles long binary strings", () => {
        expect(modThreeFSM.process("100110100111001001101000110101")).toEqual({
            accepted: true,
            finalState: "S2",
            output: "2",
        });
        expect(
            modThreeFSM.process(
                "100110100111001001101000110101100110100111001001101000110101"
            )
        ).toEqual({ accepted: true, finalState: "S1", output: "1" });
    });

    test("throws error for invalid input", () => {
        expect(() => modThreeFSM.process("102")).toThrow();
        expect(() => modThreeFSM.process("abc")).toThrow();
    });
});
