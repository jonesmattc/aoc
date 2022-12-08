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
	count := 0
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
		sections := strings.Split(line, ",")
		firstSection := strings.Split(sections[0], "-")
		secondSection := strings.Split(sections[1], "-")
		fsStart, _ := strconv.ParseInt(firstSection[0], 10, 64)
		fsEnd, _ := strconv.ParseInt(firstSection[1], 10, 64)
		ssStart, _ := strconv.ParseInt(secondSection[0], 10, 64)
		ssEnd, _ := strconv.ParseInt(secondSection[1], 10, 64)
		fsDiff := fsEnd - fsStart
		ssDiff := ssEnd - ssStart
		var bigSection []int64
		var smallSection []int64
		if fsDiff > ssDiff {
			bigSection = []int64{fsStart, fsEnd}
			smallSection = []int64{ssStart, ssEnd}
		} else {
			bigSection = []int64{ssStart, ssEnd}
			smallSection = []int64{fsStart, fsEnd}
		}

		if smallSection[0] >= bigSection[0] && smallSection[1] <= bigSection[1] {
			count++
		}
	}

	if err := scanner.Err(); err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println(count)

}

func part2() {
	file, err := os.Open("input.txt")
	count := 0
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
		sections := strings.Split(line, ",")
		firstSection := strings.Split(sections[0], "-")
		secondSection := strings.Split(sections[1], "-")
		fsStart, _ := strconv.ParseInt(firstSection[0], 10, 64)
		fsEnd, _ := strconv.ParseInt(firstSection[1], 10, 64)
		ssStart, _ := strconv.ParseInt(secondSection[0], 10, 64)
		ssEnd, _ := strconv.ParseInt(secondSection[1], 10, 64)

		if (fsStart >= ssStart && fsStart <= ssEnd) || (ssStart >= fsStart && ssStart <= fsEnd) {
			count++
		}
	}

	if err := scanner.Err(); err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println(count)
}

func main() {
	part1()
	part2()
}
