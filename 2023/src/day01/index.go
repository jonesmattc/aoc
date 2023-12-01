package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func part1(path string) {
	keys := []string{"0", "1", "2", "3", "4", "5", "6", "7", "8", "9"}
	file, err := os.Open(path)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer file.Close()
	scanner := bufio.NewScanner(file)
	sum := 0
	for scanner.Scan() {
		line := scanner.Text()
		first := -1
		min := len(line)
		max := -1
		last := -1
		for idx, key := range keys {
			inst := strings.Index(line, key)
			if inst != -1 && inst < min {
				min = inst
				first = idx % 10
			}
			inst = strings.LastIndex(line, key)
			if inst != -1 && inst > max {
				max = inst
				last = idx % 10
			}
		}
		sum += first*10 + last
	}
	fmt.Println(sum)
}

func part2(path string) {
	keys := []string{"zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"}
	file, err := os.Open(path)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer file.Close()
	scanner := bufio.NewScanner(file)
	sum := 0
	for scanner.Scan() {
		line := scanner.Text()
		first := -1
		min := len(line)
		max := -1
		last := -1
		for idx, key := range keys {
			inst := strings.Index(line, key)
			if inst != -1 && inst < min {
				min = inst
				first = idx % 10
			}
			inst = strings.LastIndex(line, key)
			if inst != -1 && inst > max {
				max = inst
				last = idx % 10
			}
		}
		sum += first*10 + last
	}
	fmt.Println(sum)
}

func solve(path string) {
	part1(path)
	part2(path)
}

func main() {
	solve("src/day01/sample.txt")
	solve("src/day01/input.txt")
}
