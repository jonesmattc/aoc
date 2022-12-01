import run from "aocrunner"

const parseInput = (rawInput: string): (number | boolean)[][][] => rawInput.split("\n").map(row=>row.split("").map(i => [Number(i), false]));

const isLowPoint = (input: (number|boolean)[][][], y: number, x: number) => {
    const [depth, _] = input[y][x];
    const directions = [[0,1], [0,-1], [1,0], [-1,0]];
    const neighbors = directions.map(([ydiff,xdiff]) => {
        if (y + ydiff >= input.length || y + ydiff < 0 || x + xdiff >= input[y].length || x + xdiff < 0) {
            return null;
        } else {
            const [newDepth, _] = input[y + ydiff][x + xdiff];
            return newDepth;
        }
    }).filter(neighbor => {
        if(neighbor === null) {
            return false;
        }
        return neighbor <= depth;
    });
    return neighbors.length === 0;
}

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput);
    let risk = 0;
    for(let y = 0; y < input.length; y++) {
        const row = input[y];
        for(let x = 0; x < row.length; x++) {
            if (isLowPoint(input, y, x)) {
                const [depth, _] = input[y][x]
                risk += (depth as number) + 1;
            }
        }
    }
    return risk
}

const findBasinSize = (input: (number|boolean)[][][], y: number, x: number): number => {
    let basinSize = 0;
    const directions = [[0,1], [0,-1], [1,0], [-1,0]];
    const queue = [[ y, x]];
    while(queue.length > 0) {
        const [y, x] = queue.shift() as number[];
        for(const [ydiff, xdiff] of directions) {
            try {
                const [nDepth, nSeen] = input[y + ydiff][x + xdiff];
                if (!nSeen) {
                    input[y+ydiff][x+xdiff][1] = true;
                    if(nDepth !== 9) {
                        basinSize++;
                        queue.push([y+ydiff, x+xdiff]);
                    }
                }
            } catch(e){}
        }
    }
    return basinSize;
}

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput);
    const lowPoints: number[][] = [];
    for(let y = 0; y < input.length; y++) {
        for(let x = 0; x < input[y].length; x++) {
            if(isLowPoint(input, y, x)) {
                lowPoints.push([y,x]);
            }
        }
    }

    const basinSizes = [];
    for(const [y,x] of lowPoints) {
        const basinSize = findBasinSize(input, y, x);
        basinSizes.push(basinSize);
    }
    return basinSizes.sort((a,b)=>b-a).slice(0, 3).reduce((l,r) => l*r);
}

run({
    part1: {
        tests: [
            { input: `21\n12`, expected:4},
            { input: `2199943210
3987894921
9856789892
8767896789
9899965678`, expected: 15 },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            { input: `2199943210
3987894921
9856789892
8767896789
9899965678`, expected: 1134 }
        ],
        solution: part2,
    },
    trimTestInputs: true,
});