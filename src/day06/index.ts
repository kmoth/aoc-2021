import run from "aocrunner"

interface Group { age: number, count: number }

const parseInput = (rawInput: string): number[] => {
  return rawInput.split(',').map(n => Number(n))
}

const addFish = (age: number, groups: Group[], count: number): void => {
  const group = groups.find(c => c.age === age)
  if (group !== undefined) group.count += count
  else groups.push({ age, count })
}

const fishDay = (groups: Group[]) => {
  let newFish = 0
  for(let i = groups.length - 1; i > -1; i--) {
    groups[i].age--
  }
  for(let i = groups.length - 1; i > -1; i--) {
    if (groups[i].age === -1) {
      const group = groups.find(c => c.age === 6)
      newFish += groups[i].count
      if (group !== undefined) {
        group.count += groups[i].count
        groups.splice(i, 1)
      } else {
        groups[i].age = 6
      }
    }
  }
  if (newFish > 0) {
    addFish(8, groups, newFish)
  }
}

const fishForDays = (fish: number[], days: number) => {
  const groups: Group[] = []
  for(let i = 0; i < fish.length; i++) {
    addFish(fish[i], groups, 1)
  }
  for(let i = 0; i < days; i++) {
    fishDay(groups)
  }
  return groups.reduce((p, c) => p + c.count, 0)
}

const part1 = (rawInput: string) => {
  const fish = parseInput(rawInput)
  return fishForDays(fish, 80)
}

const part2 = (rawInput: string) => {
  let fish = parseInput(rawInput)
  return fishForDays(fish, 256)
}

const testInput = `3,4,3,1,2`

run({
  part1: {
    tests: [
      { input: testInput, expected: 5934 },
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
  onlyTests: false,
})