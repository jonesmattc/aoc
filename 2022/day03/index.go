package main

import (
	"bufio"
	"fmt"
	"os"
)

func part1() {
	priority := 0
	file, err := os.Open("input.txt")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer file.Close()
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		var seen = make(map[string]bool)
		line := scanner.Text()
		if line == "" {
			continue
		}
		left := line[0 : len(line)/2]
		right := line[len(line)/2:]
		for i := 0; i < len(left); i++ {
			seen[left[i:i+1]] = true
		}

		for i := 0; i < len(right); i++ {
			if seen[right[i:i+1]] {
				if right[i:i+1] <= "Z" {
					priority += 27 + int(right[i]-'A')
				} else {
					priority += 1 + int(right[i]-'a')
				}
				break
			}
		}

		// return
	}

	if err := scanner.Err(); err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(priority)
}

func part2() {
	priority := 0
	file, err := os.Open("input.txt")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer file.Close()
	scanner := bufio.NewScanner(file)
	var seen = make(map[string]int)
	for scanner.Scan() {
		var seenThisLine = make(map[string]bool)
		line := scanner.Text()

		if line == "" {
			break
		}

		for i := 0; i < len(line); i++ {
			var charInQuestion = line[i : i+1]
			if seenThisLine[charInQuestion] {
				continue
			}
			seenThisLine[charInQuestion] = true
			seen[charInQuestion] += 1
			if seen[charInQuestion] == 3 {
				fmt.Println(seen)
				seen = make(map[string]int)
				fmt.Println(charInQuestion)
				if line[i:i+1] <= "Z" {
					priority += 27 + int(line[i]-'A')
				} else {
					priority += 1 + int(line[i]-'a')
				}
				break
			}
		}
	}

	if err := scanner.Err(); err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(priority)
}

func main() {
	part1()
	part2()
}
