import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split("\n").map(b=>b.split("-"));

class Cave {
    name: string;
    large: boolean;
    edges: Cave[];

    constructor(name: string, large: boolean) {
        this.name = name;
        this.large = large;
        this.edges = [];
    }

    addEdge(edge: Cave) {
        this.edges.push(edge);
    }
}

const getPaths = (cave: Cave, path: string[], seenDouble: boolean) => {
    if (cave.name === "end") {
        return [1, [path.join("-")]];
    }

    // if (path.join("-") == "start-A-b-A-c-A") {
    //     console.log(path.join("-"), cave.edges, seenDouble);
    // }

    let paths = 0;
    let writtenPaths: string[] = [];
    for(const edge of cave.edges) {
        let newDouble = seenDouble;
        if (edge.name === "start") {
            continue;
        }

        if(path.includes(edge.name) && !edge.large) {
            if (seenDouble) {
                continue;
            } else {
                newDouble = true;
            }
        }

        const [newCount, newPaths]  = getPaths(edge, [...path, edge.name], newDouble);
        const pathz = newPaths as string[];
        paths += newCount as number;
        writtenPaths = [...writtenPaths, ...pathz];
    }

    return [paths, writtenPaths];
}

const part1 = (rawInput: string) => {
    const nameToCave = new Map<string, Cave>();
    const input = parseInput(rawInput);
    for(const [sideA, sideB] of input) {
        if(!nameToCave.has(sideA)) {
            const isLarge = sideA.toUpperCase() === sideA;
            const caveA = new Cave(sideA, isLarge);
            nameToCave.set(sideA, caveA);
        }
        if(!nameToCave.has(sideB)) {
            const isLarge = sideB.toUpperCase() === sideB;
            const caveB = new Cave(sideB, isLarge);
            nameToCave.set(sideB, caveB);
        }
        const caveA = nameToCave.get(sideA);
        const caveB = nameToCave.get(sideB);
        if (caveA && caveB) {
            caveA.addEdge(caveB);
            caveB.addEdge(caveA);
        }
    }

    const startCave = nameToCave.get("start") as Cave;
    const [counts, paths] = getPaths(startCave, [startCave.name], true);
    return counts;
}

const part2 = (rawInput: string) => {
    const nameToCave = new Map<string, Cave>();
    const input = parseInput(rawInput);
    for(const [sideA, sideB] of input) {
        if(!nameToCave.has(sideA)) {
            const isLarge = sideA.toUpperCase() === sideA;
            const caveA = new Cave(sideA, isLarge);
            nameToCave.set(sideA, caveA);
        }
        if(!nameToCave.has(sideB)) {
            const isLarge = sideB.toUpperCase() === sideB;
            const caveB = new Cave(sideB, isLarge);
            nameToCave.set(sideB, caveB);
        }
        const caveA = nameToCave.get(sideA);
        const caveB = nameToCave.get(sideB);
        if (caveA && caveB) {
            caveA.addEdge(caveB);
            caveB.addEdge(caveA);
        }
    }

    const startCave = nameToCave.get("start") as Cave;
    const [counts, paths] = getPaths(startCave, [startCave.name], false);
    // console.log((paths as string[]).sort());
    return counts;
    
}

run({
    part1: {
        tests: [
            { input: `start-A
start-b
A-c
A-b
b-d
A-end
b-end`, expected: 10 },
            { input: `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`, expected: 19 },
            { input : `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`, expected: 226},
        ],
        solution: part1,
    },
    part2: {
        tests: [
            { input: `start-A
start-b
A-c
A-b
b-d
A-end
b-end`, expected: 36 },
            { input: `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`, expected: 103 },
            { input : `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`, expected: 3509},
        ],
        solution: part2,
    },
    trimTestInputs: true,
});