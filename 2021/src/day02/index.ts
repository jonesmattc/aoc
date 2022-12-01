import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split("\n");

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput);
    let depth = 0;
    let distance = 0;

    // part 1
    for(const rule of input) {
        const [direction, count_str] = rule.split(" ");
        const count = parseInt(count_str, 10);
        switch (direction) {
            case 'forward':
                distance += count;
                break;
            case 'down':
                depth += count;
                break;
            case 'up':
                depth -= count;
                break;
        }
    }

    return depth*distance;
}

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput);
    let depth = 0;
    let distance = 0;
    let aim = 0;

    // part 2
    for(const rule of input) {
        const [direction, count_str] = rule.split(" ");
        const count = parseInt(count_str, 10);
        switch (direction) {
            case 'forward':
                distance += count;
                depth += aim*count;
                break;
            case 'down':
                aim += count;
                break;
            case 'up':
                aim -= count;
                break;
        }
    }
    return distance * depth;
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