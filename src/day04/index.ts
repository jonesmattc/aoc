import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split("\n\n");

class Coordinates {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
class Board {
    board: number[][];
    called: boolean[][];
    lookup: Map<Number, Coordinates>;
    constructor(board: string) {
        this.board = board.split("\n").map(a=>a.trim().split(/\s+/).map(Number));
        this.called = [];
        this.lookup = new Map();
        for(let i = 0; i < 5; i++) {
            this.called.push([false, false, false, false, false]);
            for(let j = 0; j < 5; j++) {
                this.lookup.set(this.board[i][j], new Coordinates(i, j));
            }
        }
    }

    addNumber(input: number){
        console.log(input);
        const exists = this.lookup.get(input);
        if(exists !== undefined) {
            this.called[exists.x][exists.y] = true;
            return this.isComplete();
        }

        return false;
    }

    unmarkedNumbers(): number{
        let total = 0;
        for(let i = 0; i < 5; i++){
            for(let j = 0; j < 5; j++) {
                if(!this.called[i][j]) {
                    total += this.board[i][j];
                }
            }
        }
        console.log(total);

        return total;
    }

    isComplete(): boolean {
        console.log(this.board);
        console.log(this.called);
        let diagonalUpRight = true;
        let diagonalUpLeft = true;
        let diagonalDownRight = false;
        let diagonalDownLeft = false;
        for(let i = 0; i < 5; i++) {
            let allHorizontal = true;
            let allVertical = true;
            for(let j = 0; j < 5; j++) {
                if (!this.called[i][j]) {
                    allHorizontal = false;
                }
                if(!this.called[j][i]) {
                    allVertical = false;
                }
            }
            if (allHorizontal || allVertical) {
                return true;
            }
            if (!this.called[i][i]) {
                diagonalDownRight = false;
            }
            if (!this.called[4-i][i]) {
                diagonalDownLeft = false;
            }
            if (!this.called[i][4-i]) {
                diagonalUpRight = false;
            }
            if (!this.called[4-i][4-i]) {
                diagonalUpLeft = false;
            }

        }
        return false;
        // return diagonalDownRight || diagonalDownLeft || diagonalUpRight || diagonalUpLeft;
    }
}

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput);
    const called_numbers: number[] = input[0].split(",").map(Number);
    const boards = input.slice(1);
    const parsedBoards = boards.map(s=>{console.log(s); console.log("\n"); return new Board(s);});
    parsedBoards.forEach(s=>console.log(s.board));

    for (let num of called_numbers) {
        for (let board of parsedBoards) {
            const success = board.addNumber(num);
            if (success) {
                return num * board.unmarkedNumbers();
            }
        }
    }
}

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput);
    const called_numbers: number[] = input[0].split(",").map(Number);
    const boards = input.slice(1);
    let parsedBoards = boards.map(s=>{console.log(s); console.log("\n"); return new Board(s);});
    parsedBoards.forEach(s=>console.log(s.board));

    for (let num of called_numbers) {
        let removeBoard: Board[] = [];
        for (let board of parsedBoards) {
            const success = board.addNumber(num);
            if (success) {
                if(parsedBoards.length === 1) {
                    return board.unmarkedNumbers()*num;
                }
                removeBoard.push(board);
            }
        }
        parsedBoards = parsedBoards.filter((s)=>{return removeBoard.indexOf(s) === -1;});
    }
}


run({
    part1: {
        tests: [
            //{ input: ``, expected: 4512 },
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