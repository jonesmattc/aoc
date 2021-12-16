import run from "aocrunner"

const parsePacket = (input: string, startingOffset: number) => {
    let offset = startingOffset;
    let result = 0;
    const packetVersionId = parseInt(input.slice(offset, offset+3), 2);
    let typeId = parseInt(input.slice(offset+3, offset+6), 2);
    offset += 6;
    let versionSum = packetVersionId;
    if (typeId === 4) {
        // number literal
        let numString = input.slice(offset, offset+5);
        offset = offset+5;
        let resultString = numString.slice(1);
        while(numString[0] === '1') {
            // not at last nibble
            numString = input.slice(offset, offset+5);
            resultString += numString.slice(1);
            offset += 5;
        }
        result = parseInt(resultString, 2);
    } else {
        // operator
        const lengthType = input.slice(offset, offset+1);
        offset += 1;
        const subPacketValues = []
        if (lengthType === "1") {
            const subPacketCount = parseInt(input.slice(offset, offset+11), 2);
            offset += 11;
            for(let i = 0; i < subPacketCount; i++) {
                const [subPacketVersionSum, subPacketResult, subPacketOffset] = parsePacket(input, offset);
                offset = subPacketOffset;
                versionSum += subPacketVersionSum;
                subPacketValues.push(subPacketResult);
            }
        } else {
            const subPacketLength = parseInt(input.slice(offset, offset+15), 2);
            offset += 15;
            const subPacketEnd = offset + subPacketLength;
            while (offset < subPacketEnd) {
                const [subPacketVersionSum, subPacketResult, subPacketOffset] = parsePacket(input, offset)
                offset = subPacketOffset;
                versionSum += subPacketVersionSum;
                subPacketValues.push(subPacketResult);
            }
            offset = subPacketEnd;
        }

        if (typeId === 0) { // sum
            result = subPacketValues.reduce((l, r) => l+r, 0);
            console.log('sum', subPacketValues, result);
        } else if (typeId === 1) { // product
            result = subPacketValues.reduce((l, r) => l*r, 1);
            console.log('product', subPacketValues, result);
        } else if (typeId === 2) { // min
            result = subPacketValues.reduce((l, r) => Math.min(l, r), Number.MAX_SAFE_INTEGER);
            console.log('min', subPacketValues, result);
        } else if (typeId === 3) { // max
            result = subPacketValues.reduce((l, r) => Math.max(l, r), 0);
            console.log('max', subPacketValues, result);
        } else if (typeId === 5) { // greater than
            result = subPacketValues[0] > subPacketValues[1] ? 1 : 0;
            console.log('greater than', subPacketValues, result);
        } else if (typeId === 6) { // less than
            result = subPacketValues[0] < subPacketValues[1] ? 1 : 0;
            console.log('less than', subPacketValues, result);
        } else if (typeId === 7) { // equal to
            result = subPacketValues[0] === subPacketValues[1] ? 1 : 0;
            console.log('equal to', subPacketValues, result);
        } else {
            console.log('incorrect type');
        }
    }
    return [versionSum, result, offset]
}
const part1 = (rawInput: string) => {
    let input: string = rawInput.split("").map(h=>parseInt(h, 16).toString(2).padStart(4, "0")).join("");
    input = input.padStart(4 - input.length % 4, '0');
    const [versionSum, packetResult, finalOffset] = parsePacket(input, 0);
    return versionSum;
}

const part2 = (rawInput: string) => {
    let input: string = rawInput.split("").map(h=>parseInt(h, 16).toString(2).padStart(4, "0")).join("");
    input = input.padStart(4 - input.length % 4, '0');
    const [versionSum, packetResult, finalOffset] = parsePacket(input, 0);
    return packetResult;
}
run({
    part1: {
        tests: [
            { input: `D2FE28`, expected: 6},
            {input: `38006F45291200`, expected: 9},
            { input: `8A004A801A8002F478`, expected: 16 },
            { input: `620080001611562C8802118E34`, expected: 12 },
            { input: `C0015000016115A2E0802F182340`, expected: 23 },
            { input: `A0016C880162017C3686B18A3D4780`, expected: 31 },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            { input: `C200B40A82`, expected: 3 },
            { input: `04005AC33890`, expected: 54 },
            { input: `880086C3E88112`, expected: 7 },
            { input: `CE00C43D881120`, expected: 9 },
            { input: `D8005AC2A8F0`, expected: 1 },
            { input: `F600BC2D8F`, expected: 0 },
            { input: `9C005AC2F8F0`, expected: 0 },
            { input: `9C0141080250320F1802104A08`, expected: 1 },
        ],
        solution: part2,
    },
    trimTestInputs: true,
});