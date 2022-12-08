package main

import (
	"bufio"
	"fmt"
	"os"
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
	score := 0
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			break
		}
		keys := strings.Split(line, " ")
		opponent := keys[0]
		mine := keys[1]
		if opponent == "A" {
			// rock
			if mine == "X" {
				// tie
				score += 4
			} else if mine == "Y" {
				// win
				score += 8
			} else {
				// loss
				score += 3
			}
		} else if opponent == "B" {
			if mine == "X" {
				// loss
				score += 1
			} else if mine == "Y" {
				// tie
				score += 5
			} else {
				score += 9
			}
		} else {
			if mine == "X" {
				// win
				score += 7
			} else if mine == "Y" {
				score += 2
			} else {
				score += 6
			}
		}
	}

	if err := scanner.Err(); err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println(score)

}

func part2() {
	file, err := os.Open("input.txt")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer file.Close()
	scanner := bufio.NewScanner(file)

	score := 0
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			break
		}
		keys := strings.Split(line, " ")
		opponent := keys[0]
		mine := keys[1]
		if opponent == "A" {
			// rock
			if mine == "X" {
				// lose + scissors (3)
				score += 3
			} else if mine == "Y" {
				// tie + rock(1)
				score += 4
			} else {
				// win + paper(2)
				score += 8
			}
		} else if opponent == "B" {
			if mine == "X" {
				// loss + rock (1)
				score += 1
			} else if mine == "Y" {
				// tie + paper (2)
				score += 5
			} else {
				// win + scissors (3)
				score += 9
			}
		} else {
			if mine == "X" {
				// loss + paper (2)
				score += 2
			} else if mine == "Y" {
				// tie + scissors(3)
				score += 6
			} else {
				// win + rock(1)
				score += 7
			}
		}
	}

	if err := scanner.Err(); err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println(score)
}

func main() {
	part1()
	part2()
}
