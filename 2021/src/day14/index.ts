import run from "aocrunner"

const parseInput = (rawInput: string): string[] => rawInput.split("\n");
const parseInputNumbers = (rawInput: string): number[] => parseInput(rawInput).map(Number)
const parseInput2DNumbers = (rawInput: string): number[][] => parseInput(rawInput).map(row=>row.split("").map(Number))
const parseInputTwoParts = (rawInput: string): string[] => rawInput.split("\n\n");

const applyRules = (template: string, rules: Map<string, string>) => {
    let offset = 1;
    const inserts: any[] = []
    for(let i = 0; i < template.length-1; i++) {
        const replacement = rules.get(template.slice(i, i+2))
        inserts.push([i+offset, replacement]);
        offset = offset+1;
    }
    // console.log(inserts)
    for(const [index, replacement] of inserts) {
        template = template.slice(0, index) + replacement + template.slice(index);
    }
    // console.log(template)
    return template;
}
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
    const [template, pairInsertionRulesString] = parseInputTwoParts(rawInput);
    const pairInsertionRules: string[][] = pairInsertionRulesString.split("\n").map(item=>item.split(" -> "))
    let result = template;
    const replacementsMap = pairInsertionRules.reduce((map, [key, replacement]) => map.set(key, replacement), new Map<string, string>());
    for(let i = 0; i < 10; i++) {
        result = applyRules(result, replacementsMap);
    }

    const freq = result.split("").reduce((map, letter) => {
        const lastFreq = map.get(letter) || 0;
        map.set(letter, lastFreq+1);
        return map;
    }, new Map<string, number>())
    const frequencies: number[] = Array.from(freq.values());
    return Math.max(...frequencies) - Math.min(...frequencies)
}

const gen2LetterMap = (lettersMap: Map<string, number>): Map<string, number> => {
    const results = new Map<string, number>();

    for(const letter1 of lettersMap.keys()) {
        for(const letter2 of lettersMap.keys()) {
            results.set(letter1+letter2, 0);
        }
    }

    // console.log(results);
    return results;
}

const part2 = (rawInput: string) => {
    const [template, pairInsertionRulesString] = parseInputTwoParts(rawInput);
    const pairInsertionRules: string[][] = pairInsertionRulesString.split("\n").map(item=>item.split(" -> "))
    const letterFrequency = new Map<string, number>();

    for (const letter of template.split("")) {
        const currentCount = letterFrequency.get(letter) || 0;
        letterFrequency.set(letter, currentCount + 1);
    }
    for (const [template, replacement] of pairInsertionRules) {
        const letter1 = template.charAt(0);
        const letter2 = template.charAt(1);
        if(!letterFrequency.has(letter1)) {
            letterFrequency.set(letter1, 0);
        }
        if(!letterFrequency.has(letter2)) {
            letterFrequency.set(letter2, 0);
        }
        if(!letterFrequency.has(replacement)) {
            letterFrequency.set(replacement, 0);
        }
    }

    let results = gen2LetterMap(letterFrequency);
    for(let i = 0; i < template.length - 1; i++) {
        const segment = template.slice(i, i+2)
        const current = results.get(segment) as number;
        results.set(segment, current + 1);
    }
    for (let i = 0; i < 40; i++) {
        let stepMap = new Map(results);
        for (const [key, replacement] of pairInsertionRules) {
            const first = key.substring(0,1) + replacement;
            const second = replacement + key.substring(1);
            const movement = results.get(key);
            if (movement && movement > 0) {
                letterFrequency.set(replacement, (letterFrequency.get(replacement) as number) + movement);
                stepMap.set(key, (stepMap.get(key) as number) - movement);
                stepMap.set(first, (stepMap.get(first) as number || 0)+movement);
                stepMap.set(second, (stepMap.get(second) as number || 0)+movement);
            }
        }
        results = stepMap;
    }
    console.log(results);
    console.log(letterFrequency);
    return Math.max(...letterFrequency.values()) - Math.min(...letterFrequency.values())
}
run({
    part1: {
        tests: [
            { input: `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`, expected: 1588 },
        ],
        solution: part1,
    },
    part2: {
        tests: [
//             {input: `NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB
//
// NN -> B`, expected: 10},
            { input: `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`, expected: 2188189693529 },
        ],
        solution: part2,
    },
    trimTestInputs: true,
});