import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split("\n\n").map(i=>i.split("\n"));

type Point = {
    x: number
    y: number
}

const transformDot = ({x: xstart, y: ystart}: Point, transforms: string[][]): Point => {
    let x = xstart;
    let y = ystart;
    for (const [dimension, axis] of transforms) {
        const axisNum = Number(axis);
        if (dimension === "x") {
            if (axisNum < x) {
                x = axisNum - (x - axisNum)
            }
        } else {
            if (axisNum < y) {
                y = axisNum - (y - axisNum)
            }
        }
    }
    // console.log(xstart, ystart, x, y)
    return {x, y}
}

const part1 = (rawInput: string) => {
    const [dots, folds] = parseInput(rawInput);
    const fold = folds[0];
    const [dimension, axis] = fold.substring(11).split("=")
    const transforms = [[dimension, axis]]

    const points = new Set<string>()

    for (const dot of dots) {
        const [x, y] = dot.split(",").map(Number)
        const {x: xend, y: yend} = transformDot({x, y}, transforms)
        points.add(`${xend}-${yend}`);
    }
    // console.log(
    //     Array.from(points)
    //         .map(r=>r.split("-").map(a=>Number(a)))
    //         .sort((l,r) => (l[0] - r[0]) || (l[1] - r[1])))
    return points.size
}

const part2 = (rawInput: string) => {
    const [dots, folds] = parseInput(rawInput);
    const transforms = folds.map(fold=>fold.substring(11).split("="));

    const points = new Set<string>()

    for (const dot of dots) {
        const [x, y] = dot.split(",").map(Number)
        const {x: xend, y: yend} = transformDot({x, y}, transforms)
        points.add(`${xend}-${yend}`);
    }

    const twoD: string[][] = []
    for(let y = 0; y < 8; y++) {
        const row: string[] = [];
        twoD.push(row);
        for (let x = 0 ; x < 41; x++) {
            row.push(' ')
        }
    }
    for(const point of points) {
        const [x,y] = point.split("-").map(Number);
        twoD[y][x] = 'X'
    }

    console.log(twoD.map(row=>row.join("")).join("\n"));

    console.log(
        Array.from(points)
            .map(r=>r.split("-").map(a=>Number(a)))
            .sort((l,r) => (l[0] - r[0]) || (l[1] - r[1])))
    return "LKREBPRK"
}

run({
    part1: {
        tests: [
            { input: `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`, expected:17 },
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