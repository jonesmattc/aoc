import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split("\n").map(a=>a.split("").map(Number));
const emptyBArray = (y: number, x: number): boolean[][] => {
    const result: boolean[][] = [];
    for(let i = 0; i < y; i++) {
        const row: boolean[] = [];
        for(let j = 0; j < x; j++) {
            row.push(false);
        }
        result.push(row);
    }

    return result;
}

const flash = (input: number[][], hasFlashed: boolean[][], y: number, x: number) => {
    hasFlashed[y][x] = true;
    const updateQueue: number[][] = [[y,x]];
    while (updateQueue.length > 0) {
        const [y, x] = updateQueue.shift() as number[];

        for(const [ydiff, xdiff] of [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]]) {
            if (y+ydiff >= input.length || y+ydiff < 0 || x+xdiff >= input[0].length || x+xdiff < 0) {
                continue;
            }
            input[y+ydiff][x+xdiff]++;
            const result = input[y+ydiff][x+xdiff];
            // console.log(y+ydiff, x+xdiff, result);
            if(result > 9 && !hasFlashed[y+ydiff][x+xdiff]) {
                // console.log('flashing', y+ydiff, x+xdiff, result);
                hasFlashed[y+ydiff][x+xdiff] = true;
                updateQueue.push([y+ydiff, x+xdiff]);
            }
        }
    }
}

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput);
    let flashes = 0;
    // console.log(input.map(i=>i.join(" ")).join("\n"));
    // console.log();
    for(let i = 0; i < 100; i++) {
        const hasFlashed = emptyBArray(input.length, input[0].length);
        for(let y = 0; y < input.length; y++) {
            for(let x = 0; x < input[0].length; x++) {
                input[y][x]++;
            }
        }

        // console.log("incremented\n",input.map(i=>i.join(" ")).join("\n"));
        // console.log();

        for(let y = 0; y < input.length; y++) {
            for(let x = 0; x < input[0].length; x++) {
                if(input[y][x] > 9 && !hasFlashed[y][x]) {
                    // console.log('flashing', y, x, input[y][x]);
                    flash(input, hasFlashed, y, x);
                }
            }
        }

        // console.log("flashed\n",input.map(i=>i.join(" ")).join("\n"));
        // console.log();
        // console.log("flashes\n", hasFlashed.map(i=>i.map(r=>r?"x":".").join("")).join("\n"));
        // console.log();

        for(let y = 0; y < input.length; y++) {
            for(let x = 0; x < input[0].length; x++) {
                if(hasFlashed[y][x]) {
                    input[y][x] = 0;
                }
            }
        }
        flashes += hasFlashed.reduce((l, r) => l + r.filter(z=>z).length, 0);
        // console.log("end of step\n", input.map(i=>i.join(" ")).join("\n"));
        // console.log();
    }

    return flashes;
}

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput);

    for(let i = 0; i <= 1000; i++) {
        const hasFlashed = emptyBArray(input.length, input[0].length);
        for(let y = 0; y < input.length; y++) {
            for(let x = 0; x < input[0].length; x++) {
                input[y][x]++;
            }
        }

        for(let y = 0; y < input.length; y++) {
            for(let x = 0; x < input[0].length; x++) {
                if(input[y][x] > 9 && !hasFlashed[y][x]) {
                    flash(input, hasFlashed, y, x);
                }
            }
        }

        for(let y = 0; y < input.length; y++) {
            for(let x = 0; x < input[0].length; x++) {
                if(hasFlashed[y][x]) {
                    input[y][x] = 0;
                }
            }
        }
        if (hasFlashed.reduce((l, r) => l + r.filter(z=>z).length, 0) === input.length*input[0].length) {
            return i+1;
        }
    }

    return 0;
}

run({
    part1: {
        tests: [
            {input: `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`, expected: 1656 },
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