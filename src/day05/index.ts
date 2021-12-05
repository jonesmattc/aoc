import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split("\n").map(a=>a.split(' -> ').map(a=>a.split(',').map(Number).reverse()));


const part1 = (rawInput: string) => {
    const input: number[][][] = parseInput(rawInput);
    const xs = input.flatMap(i=>[i[0],i[1]]).map(i=>i[0]);
    const ys = input.flatMap(i=>[i[0],i[1]]).map(i=>i[1]);
    const maxx = xs.reduce((l,r) =>Math.max(l, r))+1;
    const maxy = ys.reduce((l, r) => Math.max(l, r))+1;
    let answer = 0;

    const result: number[][] = [];
    for(let i =0; i < maxx; i++) {
        let row: number[] = [];
        result.push(row);
        for(let j = 0; j < maxy; j++) {
            row.push(0);
        }
    }

    for(const line of input) {
        const [x1, y1] = line[0];
        const [x2, y2] = line[1];
        if (x1 === x2) {
            const [ymin, ymax] = [y1,y2].sort((a,b)=>a-b);
            for(let y = ymin; y <= ymax; y++) {
                if (result[x1][y] == 1) {
                    answer++;
                }
                result[x1][y]++;

            }
        } else if (y1 === y2) {
            const [xmin, xmax] = [x1,x2].sort((a,b)=>a-b);
            for (let x = xmin; x <= xmax; x++) {
                if (result[x][y1] == 1) {
                    answer++;
                }
                result[x][y1]++;
            }
        }
    }


    return answer;
}

const part2 = (rawInput: string) => {
    const input: number[][][] = parseInput(rawInput);
    const xs = input.flatMap(i=>[i[0],i[1]]).map(i=>i[0]);
    const ys = input.flatMap(i=>[i[0],i[1]]).map(i=>i[1]);
    const maxx = xs.reduce((l,r) =>Math.max(l, r))+1;
    const maxy = ys.reduce((l, r) => Math.max(l, r))+1;
    let answer = 0;

    const result: number[][] = [];
    for(let i =0; i < maxx; i++) {
        let row: number[] = [];
        result.push(row);
        for(let j = 0; j < maxy; j++) {
            row.push(0);
        }
    }

    for(const line of input) {
        const [x1, y1] = line[0];
        const [x2, y2] = line[1];
        if (x1 === x2) {
            const [ymin, ymax] = [y1,y2].sort((a,b)=>a-b);
            for(let y = ymin; y <= ymax; y++) {
                if (result[x1][y] == 1) {
                    answer++;
                }
                result[x1][y]++;

            }
        } else if (y1 === y2) {
            const [xmin, xmax] = [x1,x2].sort((a,b)=>a-b);
            for (let x = xmin; x <= xmax; x++) {
                if (result[x][y1] == 1) {
                    answer++;
                }
                result[x][y1]++;
            }
        } else {
            let xmult = 1;
            let ymult = 1;
            if (x1 > x2) {
                xmult = -1;
            }
            if(y1 > y2) {
                ymult = -1;
            }
            for(let i = 0; i <= Math.abs(x1-x2); i++) {
                if (result[x1+xmult*i][y1+ymult*i] === 1) {
                    answer++;
                }
                result[x1+xmult*i][y1+ymult*i]++;
            }
        }
        // console.log(x1,x2,y1,y2);
        // console.log(result.map(a=>a.map(b=>b===0?'.':b.toString()).join("")).join("\n"));
        // console.log("\n");
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