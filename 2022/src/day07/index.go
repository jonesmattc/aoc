package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

type Directory struct {
	parent         *Directory
	subDirectories map[string]*Directory
	// files          []File
	size int64
}

type File struct {
	size int64
	name string
}

func sizeOfDirectory(directory *Directory) int64 {
	const s = 0
	for ()
	return directory.size
}

func part1() {
	file, err := os.Open("input.txt")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer file.Close()
	scanner := bufio.NewScanner(file)

	root := &Directory{parent: nil, subDirectories: make(map[string]*Directory)}
	currentDirectory := root

	fmt.Println(root)

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			break
		}
		elements := strings.Split(line, " ")

		if elements[0] == "$" {
			if elements[1] == "cd" {
				if elements[2] == "/" {
					currentDirectory = root
				} else if elements[2] == ".." {
					currentDirectory = currentDirectory.parent
				} else {
					currentDirectory = currentDirectory.subDirectories[elements[2]]
				}
			}
		} else {
			if elements[0] == "dir" {
				if value, present := currentDirectory.subDirectories[elements[1]]; present {
					// already exists
					fmt.Println("ERROR", value)
				} else {
					newDirectory := &Directory{parent: currentDirectory, subDirectories: make(map[string]*Directory)}
					currentDirectory.subDirectories[elements[1]] = newDirectory
				}
			} else {
				// var newFile File
				// newFile.name = elements[1]
				size, _ := strconv.ParseInt(elements[0], 10, 64)
				// currentDirectory.files = append(currentDirectory.files, newFile)
				currentDirectory.size += size
			}
		}
	}

	queue := []*Directory{root}
	for len(queue) > 0 {

	}

	fmt.Println(root)

	if err := scanner.Err(); err != nil {
		fmt.Println(err)
		return
	}

}

func part2() {
}

func main() {
	part1()
	part2()
}
