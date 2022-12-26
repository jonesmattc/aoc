package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

// func moveTail(yHead int64, xHead int64, yTail int64, xTail int64) (int64, int64) {
// 	// only 1 dimension can be |diff| > 1
// 	if xDiff > 1 {
// 		xTail = xHead - 1
// 		yTail = yHead
// 	} else if xDiff < -1 {
// 		xTail = xHead + 1
// 		yTail = yHead
// 	} else if yDiff > 1 {
// 		yTail = yHead - 1
// 		xTail = xHead
// 	} else if yDiff < -1 {
// 		yTail = yHead + 1
// 		xTail = xHead
// 	}

// 	return yTail, xTail
// }

func part1() {
	file, err := os.Open("input.txt")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer file.Close()

	directions := map[string][2]int64{
		"U": {1, 0},
		"D": {-1, 0},
		"L": {0, -1},
		"R": {0, 1},
	}

	var seen map[string]bool = make(map[string]bool)
	var rope [2][2]int64 = [2][2]int64{}

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		parts := strings.Split(line, " ")
		distance, _ := strconv.ParseInt(parts[1], 10, 64)

		direction := directions[parts[0]]
		var i int64
		var j int64
		for i = 0; i < distance; i++ {
			rope[0][0] = rope[0][0] + direction[0]
			rope[0][1] = rope[0][1] + direction[1]

			for j = 1; j < 2; j++ {
				for (rope[j-1][0]-rope[j][0] > 1) || (rope[j-1][0]-rope[j][0] < -1) || (rope[j-1][1]-rope[j][1] > 1) || (rope[j-1][1]-rope[j][1] < -1) {
					if rope[j-1][0]-rope[j][0] >= 1 {
						rope[j] = [2]int64{rope[j][0] + 1, rope[j][1]}
					} else if rope[j-1][0]-rope[j][0] <= -1 {
						rope[j] = [2]int64{rope[j][0] - 1, rope[j][1]}
					}

					if rope[j-1][1]-rope[j][1] >= 1 {
						rope[j] = [2]int64{rope[j][0], rope[j][1] + 1}
					} else if rope[j-1][1]-rope[j][1] <= -1 {
						rope[j] = [2]int64{rope[j][0], rope[j][1] - 1}
					}
					seen[strconv.FormatInt(rope[1][1], 10)+","+strconv.FormatInt(rope[1][0], 10)] = true
				}
			}
		}

		// fmt.Println(rope)
	}
	fmt.Println(rope)
	fmt.Println(len(seen))
}

func part2() {
	file, err := os.Open("input.txt")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer file.Close()

	directions := map[string][2]int64{
		"U": {1, 0},
		"D": {-1, 0},
		"L": {0, -1},
		"R": {0, 1},
	}

	var seen map[string]bool = make(map[string]bool)
	seen["0,0"] = true
	var rope [10][2]int64 = [10][2]int64{}

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		parts := strings.Split(line, " ")
		distance, _ := strconv.ParseInt(parts[1], 10, 64)

		direction := directions[parts[0]]
		var i int64
		var j int
		for i = 0; i < distance; i++ {
			rope[0][0] = rope[0][0] + direction[0]
			rope[0][1] = rope[0][1] + direction[1]

			for j = 1; j < len(rope); j++ {
				for yDiff, xDiff := rope[j-1][0]-rope[j][0], rope[j-1][1]-rope[j][1]; yDiff > 1 || yDiff < -1 || xDiff > 1 || xDiff < -1; yDiff, xDiff = rope[j-1][0]-rope[j][0], rope[j-1][1]-rope[j][1] {
					if yDiff >= 1 {
						rope[j] = [2]int64{rope[j][0] + 1, rope[j][1]}
					} else if yDiff <= -1 {
						rope[j] = [2]int64{rope[j][0] - 1, rope[j][1]}
					}

					if xDiff >= 1 {
						rope[j] = [2]int64{rope[j][0], rope[j][1] + 1}
					} else if xDiff <= -1 {
						rope[j] = [2]int64{rope[j][0], rope[j][1] - 1}
					}

					if j == len(rope)-1 {
						seen[strconv.FormatInt(rope[j][1], 10)+","+strconv.FormatInt(rope[j][0], 10)] = true
					}
				}
			}
		}
	}
	fmt.Println(rope)
	fmt.Println(len(seen))
}

func main() {
	part1()
	part2()
}
