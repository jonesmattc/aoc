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

	var x int64 = 1
	var cycle int64 = 0
	var signalStrength int64 = 0
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		parts := strings.Split(line, " ")
		cycle++

		if cycle == 20 || cycle == 60 || cycle == 100 || cycle == 140 || cycle == 180 || cycle == 220 {
			signalStrength += x * cycle
		}

		switch parts[0] {
		case "addx":
			registerChange, _ := strconv.ParseInt(parts[1], 10, 64)
			cycle++
			if cycle == 20 || cycle == 60 || cycle == 100 || cycle == 140 || cycle == 180 || cycle == 220 {
				signalStrength += x * cycle
			}
			x += registerChange

			// fmt.Println(registerChange, x, cycle)
		case "noop":
			// fmt.Println("noop", cycle)
		}

	}
	fmt.Println(signalStrength)

}

func part2() {
	file, err := os.Open("input.txt")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer file.Close()
	scanner := bufio.NewScanner(file)

	var x int64 = 1
	var cycle int64 = 0
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		parts := strings.Split(line, " ")

		pixelInRow := cycle % 40
		if pixelInRow-x <= 1 && pixelInRow-x >= -1 {
			fmt.Print("#")
		} else {
			fmt.Print(" ")
		}
		cycle++

		if cycle == 40 || cycle == 80 || cycle == 120 || cycle == 160 || cycle == 200 || cycle == 240 {
			fmt.Println()
		}

		switch parts[0] {
		case "addx":
			registerChange, _ := strconv.ParseInt(parts[1], 10, 64)
			pixelInRow = cycle % 40
			if pixelInRow-x <= 1 && pixelInRow-x >= -1 {
				fmt.Print("#")
			} else {
				fmt.Print(" ")
			}
			cycle++
			if cycle == 40 || cycle == 80 || cycle == 120 || cycle == 160 || cycle == 200 || cycle == 240 {
				fmt.Println()
			}
			x += registerChange
		}

	}
}

func main() {
	part1()
	part2()
}
