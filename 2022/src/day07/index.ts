import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split("\n");

type Node = {
    dirs: { [key: string]: Node }
    size: number
    totalSize: number
    parent: Node | null
}

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput);
    const root = { dirs: { }, size: 0, totalSize: 0, parent: null };
    let cd: Node = root;
    for (const line of input) {
        if(line[0] === "$") {
            const elements = line.split(" ");
            if (elements[1] === "ls") {
                continue;
            }

            const dir = elements[2] as string;
            if (dir === "/") {
                cd = root;
            } else if (dir === "..") {
                cd = cd.parent || root;
            } else {
                cd = cd.dirs[dir] || root;
            }
        } else {
            const [sSize, name] = line.split(" ");
            if (sSize === "dir") {
                cd.dirs[name] = { dirs: {}, size: 0, totalSize: 0, parent: cd };
            } else {
                const size = Number.parseInt(sSize, 10);

                cd.size += size;
                cd.totalSize += size;
                let p = cd.parent;
                while (p) {
                    // if (p.totalSize < 100000) {
                        p.totalSize += size;
                    // }
                    p = p.parent;
                }
            }
        }
    }

    const queue: Node[] = [root];
    let sum = 0;
    while (queue.length > 0) {
        const node = queue.shift()!;
        if (node.totalSize <= 100000) {
            sum += node?.totalSize || 0;
        }
        queue.push(...Object.values(node.dirs))
    }
    console.log(root);

    return sum;
}

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput);
    const root = { dirs: { }, size: 0, totalSize: 0, parent: null };
    let cd: Node = root;
    for (const line of input) {
        if(line[0] === "$") {
            const elements = line.split(" ");
            if (elements[1] === "ls") {
                continue;
            }

            const dir = elements[2] as string;
            if (dir === "/") {
                cd = root;
            } else if (dir === "..") {
                cd = cd.parent || root;
            } else {
                cd = cd.dirs[dir] || root;
            }
        } else {
            const [sSize, name] = line.split(" ");
            if (sSize === "dir") {
                cd.dirs[name] = { dirs: {}, size: 0, totalSize: 0, parent: cd };
            } else {
                const size = Number.parseInt(sSize, 10);

                cd.size += size;
                cd.totalSize += size;
                let p = cd.parent;
                while (p) {
                    // if (p.totalSize < 100000) {
                        p.totalSize += size;
                    // }
                    p = p.parent;
                }
            }
        }
    }

    const queue: Node[] = [root];
    let sum = 0;
    while (queue.length > 0) {
        const node = queue.shift()!;
        if (node.totalSize <= 100000) {
            sum += node?.totalSize || 0;
        }
        queue.push(...Object.values(node.dirs))
    }
    console.log(root);

    return sum;
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