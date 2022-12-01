import run from "aocrunner"

const parseInput = (rawInput: string): string[] => rawInput.split("\n");
const parseInputNumbers = (rawInput: string): number[] => parseInput(rawInput).map(Number)
const parseInput2DNumbers = (rawInput: string): number[][] => parseInput(rawInput).map(row=>row.split("").map(Number))
const parseInputTwoParts = (rawInput: string): string[] => rawInput.split("\n\n");

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

class Pair {
    y: number
    x: number

    constructor(y: number, x: number) {
        this.y = y;
        this.x = x;
    }

    public static fromArray(array: number[]) {
        return new Pair(array[0], array[1]);
    }

    public add(other: Pair) {
        return new Pair(this.y + other.y, this.x + other.x);
    }
}

class WPair {
    weight: number;
    pair: Pair;

    constructor(weight: number, pair: Pair) {
        this.weight = weight;
        this.pair = pair;
    }

}


const getTile = (y: number, x: number, maze: any[][]) => {
    const yDenom = maze.length;
    const xDenom = maze[0].length;
    return Math.floor(y / yDenom) + Math.floor(x / xDenom);
}

const getWeight = (baseWeight: number, tile: number) => {
    if (tile === 0) {
        return baseWeight;
    }
    let weight = baseWeight;
    for(let i = 0; i < tile; i++) {
        weight += 1;
        if(weight > 9) {
            weight -= 9;
        }
    }

    return weight;
}

const getMinDirection = (progress: number[][], y: number, x: number, directions: number[][]) => {
    let min = Number.MAX_SAFE_INTEGER;
    let dIndex = [-1, -1];
    for (const direction of directions) {
        const dy = y+direction[0];
        const dx = x+direction[1];
        if (!(dy >= 0 && dy < progress.length && dx >= 0  && dx < progress[0].length)) {
            continue;
        }
        if (progress[dy][dx] < min) {
            dIndex = [dy, dx];
            min = progress[dy][dx];
        }
    }
    return dIndex;
}

const tracePath = (progress: number[][], maze: number[][]) => {
    const path = twoDArray(progress.length, progress[0].length, ".");
    let cell = [progress.length - 1, progress[0].length - 1];
    let tile = getTile(cell[0], cell[1], maze);
    path[cell[0]][cell[1]] = getWeight(maze[cell[0] % maze.length][cell[1] % maze[0].length], tile).toString()
    const directions = [[0, 1], [0, -1], [1,0], [-1, 0]]
    while (cell[0] != 0 || cell[1] != 0) {
        cell = getMinDirection(progress, cell[0], cell[1], directions);
        tile = getTile(cell[0], cell[1], maze);
        path[cell[0]][cell[1]] = getWeight(maze[cell[0] % maze.length][cell[1] % maze[0].length], tile).toString()
    }
    // console.log(path.map(row=>row.map(n=>String(n).padStart(3, '0'))))
    prettyPrint2D(path);
}

const solveMaze = (maze: number[][], goal: number[], multiplier=1): number => {
    const progress = twoDArray(maze.length*multiplier, maze[0].length*multiplier, Number.MAX_SAFE_INTEGER);
    const visited = twoDArray(maze.length*multiplier, maze[0].length*multiplier, false);
    progress[0][0] = 0;
    visited[0][0] = true;

    let candidates = [new WPair(progress[0][0],new Pair(0, 0))];
    const directions = [[0, 1], [0, -1], [1,0], [-1, 0]]
    while (candidates.length) {
        // for the current shortest path, get the leaf node
        const {pair: {y: cy, x: cx}, weight: cWeight} = candidates.shift() as WPair;
        for(const [ydiff, xdiff] of directions) {
            const dy = cy+ydiff;
            const dx = cx+xdiff;
            if (!(dy >= 0 && dy < progress.length && dx >= 0  && dx < progress[0].length)) {
                continue;
            }
            if (visited[dy][dx]) {
                continue;
            }
            visited[dy][dx] = true;
            const tile = getTile(dy, dx, maze);
            progress[dy][dx] = cWeight + getWeight(maze[dy % maze.length][dx % maze[0].length], tile);
            if (goal[0] === dy && goal[1] === dx) {
                if (progress.length <= 300) {
                    tracePath(progress, maze);
                }
                // console.log(progress.map(row=>row.map(n => String(n).padStart(3, '0')).join(".")).join("\n"));
                return progress[dy][dx];
            }
            candidates.push(new WPair(progress[dy][dx], new Pair(dy,dx)));
        }
        candidates = candidates.sort((a, b) => a.weight - b.weight);
    }

    return -1;
}

const part1 = (rawInput: string) => {
    const maze: number[][] = parseInput2DNumbers(rawInput);
    const goal = [maze.length - 1, maze[0].length - 1];
    return solveMaze(maze, goal, 1)

}

const part2 = (rawInput: string) => {
    const maze: number[][] = parseInput2DNumbers(rawInput);
    const goal = [maze.length*5 - 1, maze[0].length*5 - 1];
    return solveMaze(maze, goal, 5)
}

run({
    part1: {
        tests: [
            { input: `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`, expected: 40 },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            { input: `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`, expected: 315 },
        ],
        solution: part2,
    },
    trimTestInputs: true,
});