import run from "aocrunner"

interface Group { age: number, count: number }

class LinkedList {
  
}

const parseInput = (rawInput: string): Group[] => {
  const groups: Group[] = []
  rawInput.split(',').map(n => Number(n)).forEach(age => {
    const group = groups.find(group => group.age === age)
    if (group) group.count++
    else groups.push({ age, count: 1})
  })
  return groups
}

const fishDay = (groups: Group[]): number => {
  let newFish = 0
  for (let groupIndex = 0; groupIndex < groups.length; groupIndex++) {
    groups[groupIndex].age--
    if (groups[groupIndex].age === -1) {
      groups[groupIndex].age = 6
      newFish++
    }
  }
  return newFish
}

const fishCycle = (groups: Group[], days: number) => {
  for (let day = 0; day < days; day++) {
    const newFish = fishDay(groups)
  }
  
  return 
}

const part1 = (rawInput: string) => {
  const groups = parseInput(rawInput)
  return fishCycle(groups, 80)
}

const part2 = (rawInput: string) => {
  let fish = parseInput(rawInput)
  return fishCycle(fish, 256)
}

const testInput = `3,4,3,1,2`

run({
  part1: {
    tests: [
      // { input: testInput, expected: 5934 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: testInput, expected: 26984457539 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
})