import binaryToDecimal, {
    INVALID_BINARY_ERROR_MESSAGE,
} from "../utils/binaryToDecimal";

describe("binaryToDecimal function", () => {
    test("converts simple binary numbers correctly", () => {
        expect(binaryToDecimal("0")).toBe(0);
        expect(binaryToDecimal("1")).toBe(1);
        expect(binaryToDecimal("10")).toBe(2);
        expect(binaryToDecimal("11")).toBe(3);
        expect(binaryToDecimal("100")).toBe(4);
        expect(binaryToDecimal("101")).toBe(5);
    });

    test("converts larger binary numbers correctly", () => {
        expect(binaryToDecimal("1010")).toBe(10);
        expect(binaryToDecimal("1100100")).toBe(100);
        expect(binaryToDecimal("1111111")).toBe(127);
        expect(binaryToDecimal("10000000")).toBe(128);
        expect(binaryToDecimal("11111111")).toBe(255);
    });

    test("handles binary numbers with leading zeros", () => {
        expect(binaryToDecimal("00101")).toBe(5);
        expect(binaryToDecimal("000000001")).toBe(1);
        expect(binaryToDecimal("01010101")).toBe(85);
    });

    test("throws error for invalid binary strings", () => {
        expect(() => binaryToDecimal("12")).toThrow(
            INVALID_BINARY_ERROR_MESSAGE
        );
        expect(() => binaryToDecimal("1a10")).toThrow(
            INVALID_BINARY_ERROR_MESSAGE
        );
        expect(() => binaryToDecimal("1 0")).toThrow(
            INVALID_BINARY_ERROR_MESSAGE
        );
        expect(() => binaryToDecimal("")).toThrow(INVALID_BINARY_ERROR_MESSAGE);
    });

    test("handles very long binary strings", () => {
        const longBinaryString = "1".repeat(53); // Max safe integer in JavaScript is 2^53 - 1
        expect(binaryToDecimal(longBinaryString)).toBe(9007199254740991); // 2^53 - 1
    });

    test("handles edge cases", () => {
        expect(binaryToDecimal("0000000000")).toBe(0);
        expect(binaryToDecimal("1111111111")).toBe(1023);
    });

    test("throws error for non-string inputs", () => {
        expect(() => binaryToDecimal(123 as any)).toThrow(
            INVALID_BINARY_ERROR_MESSAGE
        );
        expect(() => binaryToDecimal(null as any)).toThrow(
            INVALID_BINARY_ERROR_MESSAGE
        );
        expect(() => binaryToDecimal(undefined as any)).toThrow(
            INVALID_BINARY_ERROR_MESSAGE
        );
        expect(() => binaryToDecimal([] as any)).toThrow(
            INVALID_BINARY_ERROR_MESSAGE
        );
        expect(() => binaryToDecimal({} as any)).toThrow(
            INVALID_BINARY_ERROR_MESSAGE
        );
    });
});
