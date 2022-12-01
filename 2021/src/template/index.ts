import run from "aocrunner"

const parseInput = (rawInput: string): string[] => rawInput.split("\n");
const parseInputNumbers = (rawInput: string): number[] => parseInput(rawInput).map(Number)
const parseInput2DNumbers = (rawInput: string): number[][] => parseInput(rawInput).map(row=>row.split("").map(Number))
const parseInputTwoParts = (rawInput: string): string[] => rawInput.split("\n\n");

function twoDArray<T>(x: number, y: number, startingValue: T): T[][] {
    const result = []
    for(let i = 0; i < y; i++) {
        const row: T[] = [];
        result.push(row);
        for(let j = 0; j < x; j++) {
            row.push(startingValue);
        }
    }
    return result
}

function prettyPrint2D<T>(array: T[][]): void {
    console.log(array.map(row=>row.join("")).join("\n"));
}


const part1 = (rawInput: string) => {
    const input: number[] = parseInputNumbers(rawInput);

    return
}

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput);

    return
}

run({
    part1: {
        tests: [
            // { input: ``, expected: "" },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            // { input: ``, expected: "" },
        ],
        solution: part2,
    },
    trimTestInputs: true,
});