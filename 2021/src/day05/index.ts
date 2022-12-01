import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split("\n").map(a=>a.split(' -> ').map(a=>a.split(',').map(Number).reverse()));

function getEmptyResultMap(input: number[][][]) {
    const xs = input.flatMap(i=>[i[0],i[1]]).map(i=>i[0]);
    const ys = input.flatMap(i=>[i[0],i[1]]).map(i=>i[1]);
    const maxx = xs.reduce((l,r) =>Math.max(l, r))+1;
    const maxy = ys.reduce((l, r) => Math.max(l, r))+1;
    const result: number[][] = [];
    for(let i =0; i < maxx; i++) {
        let row: number[] = [];
        result.push(row);
        for(let j = 0; j < maxy; j++) {
            row.push(0);
        }
    }

    return result;
}

const part1 = (rawInput: string) => {
    const input: number[][][] = parseInput(rawInput);
    const result = getEmptyResultMap(input);
    let answer = 0;

    for(const line of input) {
        const [[x1, y1], [x2, y2]] = line;
        const xmult = -(x1-x2)/Math.abs(x1-x2) || 0;
        const ymult = -(y1-y2)/Math.abs(y1-y2) || 0;
        if (xmult != 0 && ymult != 0) {
            // diagonal
            continue;
        }
        const steps = Math.max(Math.abs(x1-x2), Math.abs(y1-y2));
        for(let i = 0; i <= steps; i++) {
            if (result[x1+xmult*i][y1+ymult*i] === 1) {
                answer++;
            }
            result[x1+xmult*i][y1+ymult*i]++;
        }
    }
    return answer;
}

const part2 = (rawInput: string) => {
    const input: number[][][] = parseInput(rawInput);
    const result = getEmptyResultMap(input);
    let answer = 0;

    for(const line of input) {
        const [[x1, y1], [x2, y2]] = line;
        const xmult = -(x1-x2)/Math.abs(x1-x2) || 0;
        const ymult = -(y1-y2)/Math.abs(y1-y2) || 0;
        const steps = Math.max(Math.abs(x1-x2), Math.abs(y1-y2));
        for(let i = 0; i <= steps; i++) {
            if (result[x1+xmult*i][y1+ymult*i] === 1) {
                answer++;
            }
            result[x1+xmult*i][y1+ymult*i]++;
        }
    }
    return answer;
}

run({
    part1: {
        tests: [
            { input: `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`, expected: 5 },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            { input: `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`, expected: 12 },
        ],
        solution: part2,
    },
    trimTestInputs: true,
});