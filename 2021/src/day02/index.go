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
	var depth int64
	var breadth int64
	for scanner.Scan() {
		line := scanner.Text()
		var parts = strings.Split(line, " ")
		direction := parts[0]
		distance, _ := strconv.ParseInt(parts[1], 10, 64)
		switch direction {
		case "forward":
			breadth += distance
		case "up":
			depth -= distance
		case "down":
			depth += distance
		}
	}

	if err := scanner.Err(); err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println(breadth * depth)

}

func part2() {
	file, err := os.Open("input.txt")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer file.Close()
	scanner := bufio.NewScanner(file)
	var depth int64
	var breadth int64
	var aim int64
	for scanner.Scan() {
		line := scanner.Text()
		var parts = strings.Split(line, " ")
		direction := parts[0]
		distance, _ := strconv.ParseInt(parts[1], 10, 64)
		switch direction {
		case "forward":
			breadth += distance
			depth += distance * aim
		case "up":
			aim -= distance
		case "down":
			aim += distance
		}
	}

	if err := scanner.Err(); err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println(breadth * depth)
}

func main() {
	part1()
	part2()
}
