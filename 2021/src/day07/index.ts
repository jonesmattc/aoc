import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split(",").map(Number).sort((a,b)=>a-b);

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput);

    let min = Number.MAX_SAFE_INTEGER;
    for(const num of input) {
        const candidate = input.map(a=>Math.abs(num-a)).reduce((l,r)=>l+r);
        if (candidate < min) {
            min = candidate;
        }
    }
    return min;
}

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput);

    let min = Number.MAX_SAFE_INTEGER;
    for(const num of input) {
        const candidate = input.map(a=> {
            const distance = Math.abs(num - a);
            return distance*(distance-1)/2;

        }).reduce((l,r)=>l+r);
        if (candidate < min) {
            min = candidate;
        }
    }
    return min;
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