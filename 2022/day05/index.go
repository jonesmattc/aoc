package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func push(input []string, element string) []string {
	return append(input, element)
}

func pop(input []string) (string, []string) {
	return input[len(input)-1], input[:len(input)-1]
}

func part1() {
	file, err := os.Open("input.txt")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer file.Close()
	scanner := bufio.NewScanner(file)

	var stacks [9][]string = [9][]string{}
	var input []string = make([]string, 0)
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			break
		}
		input = push(input, line)
	}

	var x string
	// pop indexes
	_, input = pop(input)
	for len(input) > 0 {
		x, input = pop(input)
		for count, offset := 0, 1; offset < len(x); offset += 4 {
			if x[offset] != ' ' {
				stacks[count] = push(stacks[count], x[offset:offset+1])
			}

			count++
		}
	}

	fmt.Println(stacks)

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			break
		}
		instructions := strings.Split(line, " ")
		amount, _ := strconv.ParseInt(instructions[1], 10, 64)
		from, _ := strconv.ParseInt(instructions[3], 10, 64)
		to, _ := strconv.ParseInt(instructions[5], 10, 64)
		var i int64
		var element string

		for i = 0; i < amount; i++ {
			element, stacks[from-1] = pop(stacks[from-1])
			stacks[to-1] = push(stacks[to-1], element)
		}
	}

	for i := 0; i < 9; i++ {
		el, _ := pop(stacks[i])
		fmt.Print(el)
	}
	fmt.Println()

	// fmt.Println(stacks)

}

func part2() {

	file, err := os.Open("input.txt")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer file.Close()
	scanner := bufio.NewScanner(file)

	var stacks [9][]string = [9][]string{}
	var input []string = make([]string, 0)
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			break
		}
		input = push(input, line)
	}

	var x string
	// pop indexes
	_, input = pop(input)
	for len(input) > 0 {
		x, input = pop(input)
		for count, offset := 0, 1; offset < len(x); offset += 4 {
			if x[offset] != ' ' {
				stacks[count] = push(stacks[count], x[offset:offset+1])
			}

			count++
		}
	}

	fmt.Println(stacks)

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			break
		}
		instructions := strings.Split(line, " ")
		amount, _ := strconv.ParseInt(instructions[1], 10, 64)
		from, _ := strconv.ParseInt(instructions[3], 10, 64)
		to, _ := strconv.ParseInt(instructions[5], 10, 64)
		var i int64
		var element string

		var loader []string = []string{}

		for i = 0; i < amount; i++ {
			element, stacks[from-1] = pop(stacks[from-1])
			loader = push(loader, element)
		}

		for i = 0; i < amount; i++ {
			element, loader = pop(loader)
			stacks[to-1] = push(stacks[to-1], element)
		}
	}

	for i := 0; i < 9; i++ {
		el, _ := pop(stacks[i])
		fmt.Print(el)
	}
	fmt.Println()
}

func main() {
	part1()
	part2()
}
