package main

import (
	"bufio"
	"fmt"
	"os"
)

func part1() {
	file, err := os.Open("input.txt")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer file.Close()
	scanner := bufio.NewScanner(file)
	scanner.Scan()
	line := scanner.Text()
	var last4 [4]byte = [4]byte{line[0], line[1], line[2], 0}
	for index := 3; index < len(line); index++ {
		last4[index%4] = line[index]

		if last4[0] != last4[1] && last4[1] != last4[2] && last4[2] != last4[3] && last4[0] != last4[2] && last4[0] != last4[3] && last4[1] != last4[3] {
			fmt.Println(index + 1)
			return
		}
	}
}

func part2() {
	file, err := os.Open("input.txt")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer file.Close()
	scanner := bufio.NewScanner(file)
	scanner.Scan()
	line := scanner.Text()
	for index := 13; index < len(line); index++ {
		var seen = make(map[byte]bool)
		var answer = true
		for i := 0; i < 14; i++ {
			if seen[line[index-13+i]] == true {
				answer = false
				break
			}

			seen[line[index-13+i]] = true

		}

		if answer {
			fmt.Println(index + 1)
			return
		}

	}
}

func main() {
	part1()
	part2()
}
