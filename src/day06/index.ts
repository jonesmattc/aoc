import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split(",").map(Number);

const getStartingFish = (startingFish: number[]): number[] => {
    const fishes = [0,0,0,0,0,0,0,0,0,0];
    for(const newFish of startingFish) {
        fishes[newFish]++;
    }
    return fishes;
}

const calculateFishes = (days: number, startingFish: number[]): number[] => {
    const fish = getStartingFish(startingFish);
    for(let i = 0; i < days; i++) {
        const rollover = fish[0];
        for(let j = 0; j < fish.length - 1; j++) {
            fish[j] = fish[j+1];
        }
        fish[6] += rollover;
        fish[8] = rollover;
    }
    return fish;
}

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput);
    const fishes = calculateFishes(80, input);
    return fishes.reduce((l,r) => l+r);
}

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput);
    const fishes = calculateFishes(256, input);
    return fishes.reduce((l,r) => l+r);
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