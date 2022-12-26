package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func part1() {
	file, err := os.Open("input.txt")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer file.Close()
	scanner := bufio.NewScanner(file)

	forest := [][]int64{}
	visible := [][]bool{}

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		trees := strings.Split(line, "")
		visibleRow := []bool{}

		row := []int64{}
		for _, tree := range trees {
			height, _ := strconv.ParseInt(tree, 10, 64)
			row = append(row, height)
			visibleRow = append(visibleRow, false)
		}
		forest = append(forest, row)
		visible = append(visible, visibleRow)
	}

	count := 0
	for i, row := range forest {
		var lMax int64 = -1
		var rMax int64 = -1
		for j := 0; j < len(row); j++ {
			if forest[i][j] > lMax {
				if !visible[i][j] {
					count++
					visible[i][j] = true
				}
				lMax = forest[i][j]
			}

			if forest[i][len(row)-1-j] > rMax {
				if !visible[i][len(row)-1-j] {
					count++
					visible[i][len(row)-1-j] = true
				}
				rMax = forest[i][len(row)-1-j]
			}
		}
	}

	for j := 0; j < len(forest[0]); j++ {
		var uMax int64 = -1
		var dMax int64 = -1
		for i := 0; i < len(forest); i++ {
			if forest[i][j] > dMax {
				if !visible[i][j] {
					count++
					visible[i][j] = true
				}
				dMax = forest[i][j]
			}

			if forest[len(forest)-1-i][j] > uMax {
				if !visible[len(forest)-1-i][j] {
					count++
					visible[len(forest)-1-i][j] = true
				}
				uMax = forest[len(forest)-1-i][j]
			}
		}
	}

	fmt.Println(count)
	// fmt.Println(visible)

}

func calculateScore(forest [][]int64, i int, j int) int {
	left, right, up, down := 0, 0, 0, 0
	tree := forest[i][j]

	for x := i - 1; x >= 0; x-- {
		left++
		if forest[x][j] >= tree {
			break
		}
	}

	for x := i + 1; x < len(forest); x++ {
		right++
		if forest[x][j] >= tree {
			break
		}
	}

	for y := j - 1; y >= 0; y-- {
		up++
		if forest[i][y] >= tree {
			break
		}
	}

	for y := j + 1; y < len(forest[i]); y++ {
		down++
		if forest[i][y] >= tree {
			break
		}
	}

	// fmt.Println(left, right, up, down)

	return left * right * up * down
}

func part2() {

	file, err := os.Open("input.txt")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer file.Close()
	scanner := bufio.NewScanner(file)

	forest := [][]int64{}
	visible := [][]int{}

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		trees := strings.Split(line, "")
		visibleRow := []int{}

		row := []int64{}
		for _, tree := range trees {
			height, _ := strconv.ParseInt(tree, 10, 64)
			row = append(row, height)
			visibleRow = append(visibleRow, 0)
		}
		forest = append(forest, row)
		visible = append(visible, visibleRow)
	}

	maxScore := 0
	// calculateScore(forest, 3, 2)
	for i, row := range forest {
		for j, _ := range row {
			score := calculateScore(forest, i, j)
			if score > maxScore {
				maxScore = score
				fmt.Println(i, j)
			}
		}
	}

	fmt.Println(maxScore)
}

func main() {
	part1()
	part2()
}
