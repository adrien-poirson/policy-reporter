import isValidBinary from "./isValidBinary";

export const INVALID_BINARY_ERROR_MESSAGE =
    "Invalid binary string. Only 0s and 1s are allowed.";

function binaryToDecimal(binary: string): number {
    if (!isValidBinary(binary)) {
        throw new Error(INVALID_BINARY_ERROR_MESSAGE);
    }

    let decimal = 0;
    const binaryLength = binary.length;

    for (let i = 0; i < binaryLength; i++) {
        if (binary[binaryLength - 1 - i] === "1") {
            decimal += Math.pow(2, i);
        }
    }

    return decimal;
}

export default binaryToDecimal;
