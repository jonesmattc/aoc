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
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		i, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			fmt.Println(err)
			return
		}
	}

	if err := scanner.Err(); err != nil {
		fmt.Println(err)
		return
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

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		i, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			fmt.Println(err)
			return
		}
	}

	if err := scanner.Err(); err != nil {
		fmt.Println(err)
		return
	}
}

func main() {
	part1()
	part2()
}
