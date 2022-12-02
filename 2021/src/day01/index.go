package main

import (
	"bufio"
	"fmt"
	"math"
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
	var last int64 = math.MaxInt64
	var count int64
	for scanner.Scan() {
		line := scanner.Text()
		i, _ := strconv.ParseInt(line, 10, 64)

		if i > last {
			count += 1
		}

		last = i
	}

	if err := scanner.Err(); err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println(count)

}

func part2() {
	file, err := os.Open("input.txt")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer file.Close()
	scanner := bufio.NewScanner(file)
	var count int64
	var index int64
	var depths []int64
	for scanner.Scan() {
		line := scanner.Text()
		i, _ := strconv.ParseInt(line, 10, 64)
		depths = append(depths, i)
		index++
	}
	for i := 3; i < len(depths); i++ {
		if depths[i] > depths[i-3] {
			count++
		}
	}

	fmt.Println(count)
}

func main() {
	part1()
	part2()
}
