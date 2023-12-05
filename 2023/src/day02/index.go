package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func part1(path string) {
	maxRed := int64(12)
	maxGreen := int64(13)
	maxBlue := int64(14)
	file, err := os.Open(path)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer file.Close()
	scanner := bufio.NewScanner(file)
	sum := 0
	round := 0
	for scanner.Scan() {
		line := scanner.Text()
		round += 1
		gamestringr := strings.Split(line, ": ")

		games := strings.Split(gamestringr[1], "; ")
		possible := true
		for _, game := range games {
			colorstring := strings.Split(game, ", ")
			for _, combo := range colorstring {
				s := strings.Split(combo, " ")
				count, _ := strconv.ParseInt(s[0], 10, 64)
				color := s[1]

				if color == "red" && count > maxRed {
					possible = false
				}
				if color == "blue" && count > maxBlue {
					possible = false
				}
				if color == "green" && count > maxGreen {
					possible = false
				}
			}
			if possible == false {
				break
			}
		}

		if possible {
			sum += round
		}
	}
	fmt.Println(sum)
}

func part2(path string) {
	file, err := os.Open(path)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer file.Close()
	scanner := bufio.NewScanner(file)
	power := int64(0)
	round := 0
	for scanner.Scan() {
		minRed := int64(0)
		minGreen := int64(0)
		minBlue := int64(0)
		line := scanner.Text()
		round += 1
		gamestringr := strings.Split(line, ": ")

		games := strings.Split(gamestringr[1], "; ")
		for _, game := range games {
			colorstring := strings.Split(game, ", ")
			for _, combo := range colorstring {
				s := strings.Split(combo, " ")
				count, _ := strconv.ParseInt(s[0], 10, 64)
				color := s[1]

				if color == "red" && count > minRed {
					minRed = count
				}
				if color == "blue" && count > minBlue {
					minBlue = count
				}
				if color == "green" && count > minGreen {
					minGreen = count
				}
			}
		}
		//fmt.Println(round, minRed*minBlue*minGreen)
		power += minRed * minBlue * minGreen
	}
	fmt.Println(power)
}

func solve(path string) {
	part1(path)
	part2(path)
}

func main() {
	solve("src/day02/sample.txt")
	solve("src/day02/input.txt")
}
