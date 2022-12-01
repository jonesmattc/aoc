import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split("\n").map(a=>a.split(""));

const lookup = new Map([
    ["{", "}"],
    ["}", "{"],
    ["<", ">"],
    [">", "<"],
    ["(", ")"],
    [")", "("],
    ["[", "]"],
    ["]", "["]
]);

const start = "{<([";
const end = new Map([
    [")", 3],
    ["]", 57],
    ["}", 1197],
    [">", 25137]
])

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput);
    const inputStack: string[] = [];
    let answer = 0;
    for(const row of input) {
        for(const char of row) {
            if(start.includes(char)) {
                inputStack.unshift(char);
            } else {
                const start = inputStack.shift();
                if (start === undefined) {
                    // invalid//corrupted?
                    break;
                }
                if(lookup.get(start) === char) {
                    continue;
                } else {
                    answer += end.get(char) || 0
                    // invalid//corrupted
                }
            }
        }
    }

    return answer
}


const part2 = (rawInput: string) => {
    const input = parseInput(rawInput);
    const results: number[] = []

    for(const row of input) {
        const inputStack: string[] = [];
        let valid = true;
        for(const char of row) {
            if(start.includes(char)) {
                inputStack.unshift(char);
            } else {
                const start = inputStack.shift();
                if (start === undefined) {
                    console.log('ack');
                    // invalid//corrupted?
                    break;
                }
                if(lookup.get(start) !== char) {
                    valid=false;
                    break;
                    // answer += end.get(char) || 0
                }
            }
        }
        if(!valid) {
            continue;
        }

        const value = new Map([
            ["(", 1],
            ["[", 2],
            ["{", 3],
            ["<", 4]
        ])

        const result = inputStack.reduce((l,r) => {
            l = l*5+(value.get(r) as number);
            return l;
        }, 0);
        results.push(result);
    }

    const sortedResults = results.sort((l,r) => l-r);
    return sortedResults[Math.floor(sortedResults.length/2)];

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