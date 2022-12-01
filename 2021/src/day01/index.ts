import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split("\n")

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput);
    let increases = 0;
    let lastDepth = Number.MAX_SAFE_INTEGER;

    for (const depthStr of input) {
        const depth = parseInt(depthStr, 10);
        if (depth > lastDepth) {
            increases += 1;
        }
        lastDepth = depth;
    }
    return increases;
}

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput);
    let increases3 = 0;
    const last3DepthArray: number[] = [];
    for (const depthStr of input) {
        const depth = parseInt(depthStr, 10);
        if (last3DepthArray.length === 3) {
            const lastDepth3 = last3DepthArray.reduce((l, r) => {return l+r;});
            last3DepthArray.shift();
            last3DepthArray.push(depth);
            const depth3 = last3DepthArray.reduce((l, r) => {return l + r;})
            if (depth3 > lastDepth3) {
                increases3 += 1;
            }
        } else {
            last3DepthArray.push(depth);
        }
    }

    return increases3;
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
})