import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split("\n");

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput);
    const count = [0,0,0,0,0,0,0,0,0,0,0,0];
    const inputs = input.length;
    for (const row of input) {
        for (let i = 0; i < row.length; i++) {
            const char = row.charAt(i);
            if (char === '1') {
                count[i]++;
            }
        }
    }
    let gamma = "";
    let epsilon = "";
    for(let i = 0; i < 12; i++){
        if (count[i] > inputs/2) {
            gamma += '1';
            epsilon += '0';
        } else {
            gamma += '0';
            epsilon += '1';
        }
    }
    const output = eval('0b'+gamma) * eval('0b'+epsilon);

    return output;
}

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput);
    let oxygenCandidates = input;
    let co2Candidates = input;
    let oxygen = "";
    let co2 = "";
    for(let i = 0; i < 12; i++) {
        const oxygenCount = oxygenCandidates.length;
        const interimOxygen = oxygenCandidates.filter(s=>s.charAt(i) === '1');
        if (interimOxygen.length >= oxygenCount/2) {
            oxygenCandidates = interimOxygen;
        } else {
            oxygenCandidates = oxygenCandidates.filter(s=>s.charAt(i) === '0');
        }
        if (oxygenCandidates.length === 1) {
            oxygen = oxygenCandidates[0];
            break;
        }
    }
    for(let i = 0; i < 12; i++) {
        const co2Count = co2Candidates.length;
        const interimCo2 = co2Candidates.filter(s=>s.charAt(i) === '1');
        if (interimCo2.length >= co2Count/2) {
            co2Candidates = co2Candidates.filter(s=>s.charAt(i) === '0');
        } else {
            co2Candidates = interimCo2;
        }
        if (co2Candidates.length === 1) {
            co2 = co2Candidates[0];
            break;
        }
    }

    return eval('0b'+oxygen) * eval('0b'+co2);
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