import isValidBinary from "../utils/isValidBinary";

describe("isValidBinary function", () => {
    test("returns true for valid binary strings", () => {
        expect(isValidBinary("0")).toBe(true);
        expect(isValidBinary("1")).toBe(true);
        expect(isValidBinary("00")).toBe(true);
        expect(isValidBinary("11")).toBe(true);
        expect(isValidBinary("01")).toBe(true);
        expect(isValidBinary("10")).toBe(true);
        expect(isValidBinary("1010")).toBe(true);
        expect(isValidBinary("1111000011110000")).toBe(true);
    });

    test("returns false for strings containing non-binary characters", () => {
        expect(isValidBinary("2")).toBe(false);
        expect(isValidBinary("01201")).toBe(false);
        expect(isValidBinary("1a10")).toBe(false);
        expect(isValidBinary("1 0")).toBe(false);
        expect(isValidBinary("0.1")).toBe(false);
    });

    test("returns false for empty string", () => {
        expect(isValidBinary("")).toBe(false);
    });

    test("returns false for strings with only spaces", () => {
        expect(isValidBinary(" ")).toBe(false);
        expect(isValidBinary("   ")).toBe(false);
    });

    test("returns false for non-string inputs", () => {
        expect(isValidBinary(123 as any)).toBe(false);
        expect(isValidBinary(null as any)).toBe(false);
        expect(isValidBinary(undefined as any)).toBe(false);
        expect(isValidBinary([] as any)).toBe(false);
        expect(isValidBinary({} as any)).toBe(false);
    });

    test("returns false for strings with leading or trailing spaces", () => {
        expect(isValidBinary(" 101")).toBe(false);
        expect(isValidBinary("101 ")).toBe(false);
        expect(isValidBinary(" 101 ")).toBe(false);
    });

    test("handles very long binary strings", () => {
        const longBinaryString = "1".repeat(1000000) + "0".repeat(1000000);
        expect(isValidBinary(longBinaryString)).toBe(true);
    });
});
