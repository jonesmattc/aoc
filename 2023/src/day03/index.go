package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strconv"
	"strings"
)

func part1(path string) {
	regex, _ := regexp.Compile("[^\\w\\d\\.]")
	isDigit, _ := regexp.Compile("\\d")
	grid := [][]string{}
	file, err := os.Open(path)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer file.Close()
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		grid = append(grid, strings.Split(line, ""))
	}
	directions := [][]int{{-1, -1}, {-1, 0}, {-1, 1}, {0, -1}, {0, 1}, {1, -1}, {1, 0}, {1, 1}}
	sum := int64(0)

	for j, row := range grid {
		for i, cell := range row {
			if !regex.MatchString(cell) {
				continue
			}
			for _, direction := range directions {
				x := i + direction[0]
				y := j + direction[1]

				if y < 0 || y >= len(grid) || x < 0 || x >= len(grid[i]) {
					continue
				}

				if !isDigit.MatchString(grid[y][x]) {
					continue
				}

				k := 0
				for x+k-1 >= 0 && isDigit.MatchString(grid[y][x+k-1]) {
					k -= 1
				}

				leftLimit := x + k
				k = 1
				for x+k < len(grid[y]) {
					if !isDigit.MatchString(grid[y][x+k]) {
						break
					}
					k += 1
				}
				rightLimit := x + k
				num := int64(0)
				for a := leftLimit; a < rightLimit; a++ {
					digit, _ := strconv.ParseInt(grid[y][a], 10, 64)
					num = num*10 + digit
					grid[y][a] = "."
				}
				sum += num
			}
		}
	}
	fmt.Println(sum)
}

func part2(path string) {
	isSymbol, _ := regexp.Compile("\\*")
	isDigit, _ := regexp.Compile("\\d")
	grid := [][]string{}
	file, err := os.Open(path)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer file.Close()
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		grid = append(grid, strings.Split(line, ""))
	}
	directions := [][]int{{-1, -1}, {-1, 0}, {-1, 1}, {0, -1}, {0, 1}, {1, -1}, {1, 0}, {1, 1}}
	sum := int64(0)

	for j, row := range grid {
		for i, cell := range row {
			if !isSymbol.MatchString(cell) {
				continue
			}
			nums := 0
			gear := int64(0)
			for _, direction := range directions {
				x := i + direction[0]
				y := j + direction[1]

				if y < 0 || y >= len(grid) || x < 0 || x >= len(grid[i]) {
					continue
				}

				if !isDigit.MatchString(grid[y][x]) {
					continue
				}
				nums++

				k := 0
				for x+k-1 >= 0 && isDigit.MatchString(grid[y][x+k-1]) {
					k -= 1
				}

				leftLimit := x + k
				k = 1
				for x+k < len(grid[y]) {
					if !isDigit.MatchString(grid[y][x+k]) {
						break
					}
					k += 1
				}
				rightLimit := x + k
				num := int64(0)
				for a := leftLimit; a < rightLimit; a++ {
					digit, _ := strconv.ParseInt(grid[y][a], 10, 64)
					num = num*10 + digit
					grid[y][a] = "."
				}
				if gear == 0 {
					gear = num
				} else {
					gear *= num
				}
				if nums == 2 {
					sum += gear
					//fmt.Println(gear)
				}

			}
		}
	}
	fmt.Println(sum)
}

func solve(path string) {
	part1(path)
	part2(path)
}

func main() {
	solve("src/day03/sample.txt")
	solve("src/day03/input.txt")
}
