package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func part1() {
	file, err := os.Open("input.txt")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer file.Close()
	scanner := bufio.NewScanner(file)
	var max int64
	var current int64
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			if current > max {
				max = current
			}
			current = 0
			continue
		}
		i, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			fmt.Println(err)
			return
		}
		current = current + i
	}

	if err := scanner.Err(); err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println(max)

}

func part2() {
	file, err := os.Open("input.txt")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer file.Close()
	scanner := bufio.NewScanner(file)
	var max [3]int64
	var current int64
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			if current > max[0] {
				max[2] = max[1]
				max[1] = max[0]
				max[0] = current
			} else if current > max[1] {
				max[2] = max[1]
				max[1] = current
			} else if current > max[2] {
				max[2] = current
			}
			current = 0
			continue
		}

		i, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			fmt.Println(err)
			return
		}
		current = current + i
	}

	if err := scanner.Err(); err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println(max[0] + max[1] + max[2])
}

func main() {
	part1()
	part2()
}
