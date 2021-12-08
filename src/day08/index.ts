import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split("\n")

const SEGMENTS = [
    "abcefg",
    "cf",
    "acdeg",
    "acdfg",
    "bcdf",
    "abdfg",
    "abdefg",
    "acf",
    "abcdefg",
    "abcdfg"
]

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput);
    let total1478 = 0;
    for(const row of input) {
        console.log(row);
        const [segment_row, answer_row] = row.split(" | ");
        const answers = answer_row.split(" ");
        for (const answer of answers) {
            if ([2,3,4,7].includes(answer.length)) {
                total1478++;
            }
        }
    }
    return total1478;
}


const part2 = (rawInput: string) => {
    const input = parseInput(rawInput);
    let sum = 0;
    for(const row of input) {
        const options = new Map(
            [['a', ['a','b','c','d','e','f','g']],
            ['b', ['a','b','c','d','e','f','g']],
            ['c', ['a','b','c','d','e','f','g']],
            ['d', ['a','b','c','d','e','f','g']],
            ['e', ['a','b','c','d','e','f','g']],
            ['f', ['a','b','c','d','e','f','g']],
            ['g', ['a','b','c','d','e','f','g']]]
        )
        const [segment_row, answer_row] = row.split(" | ");
        const segments = segment_row.split(" ").sort((a,b) => a.length-b.length);
        const answers = answer_row.split(" ");
        const one = segments[0].split("");
        const seven = segments[1].split("");
        const four = segments[2].split("");
        const zeroSixNine = segments.slice(6, 9).map(a=>a.split(""));
        const eight = segments[9].split("");

        for(const wire of SEGMENTS[1].split("")) {
            // @ts-ignore
            options.set(wire, options.get(wire).filter(b=>one.includes(b)));
        }
        options.set("c", one);
        options.set("f", one);
        options.set("a", seven.filter(a=>!one.includes(a))); // unique to 7
        options.set("b", four.filter(a=>!one.includes(a))); // 4
        options.set("d", four.filter(a=>!one.includes(a))); // 4
        // @ts-ignore
        options.set("e", options.get("e").filter(a=>(!options.get("c").includes(a) && !options.get("f").includes(a) && !options.get("b").includes(a) && !options.get("d").includes(a) && !options.get("a").includes(a))));
        // @ts-ignore
        options.set("g", options.get("g").filter(a=>(!options.get("c").includes(a) && !options.get("f").includes(a) && !options.get("b").includes(a) && !options.get("d").includes(a) && !options.get("a").includes(a))));

        zeroSixNine.forEach(can => {
            const cde = eight.filter(z=>!can.includes(z))[0];
            // @ts-ignore
            if (options.get("e").includes(cde)) {
                options.set("e", [cde]);
                // @ts-ignore
                options.set("g", options.get("g").filter(f=>f!=cde));
            }
            // @ts-ignore
            if (options.get("c").includes(cde)) {
                options.set("c", [cde]);
                // @ts-ignore
                options.set("f", options.get("f").filter(f=>f!=cde));
            }
            // @ts-ignore
            if (options.get("d").includes(cde)) {
                options.set("d", [cde]);
                // @ts-ignore
                options.set("b", options.get("b").filter(f=>f!=cde));
                return true;
            }
        });

        const cipher = new Map()
        for(const [key, value] of options) {
            cipher.set(value[0], key);
        }

        const translation = new Map();
        for(const ciphered of segments) {
            translation.set(ciphered.split("").sort().join(""), ciphered.split("").map(a=>cipher.get(a)).sort().join(""));
        }

        let result = 0;
        for(const answer of answers) {
            const translated = translation.get(answer.split("").sort().join(""));
            result = result*10 + SEGMENTS.indexOf(translated);
        }

        sum +=result;

    }
    return sum;
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