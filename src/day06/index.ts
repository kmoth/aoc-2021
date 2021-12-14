import run from "aocrunner"

interface Group { age: number, count: number }

const parseInput = (rawInput: string): number[] => {
  return rawInput.split(',').map(n => Number(n))
}

const addFish = (age: number, fishCycles: Group[], count: number): void => {
  const group = fishCycles.find(c => c.age === age)
  if (group !== undefined) group.count += count
  else fishCycles.push({ age, count })
}

const fishDay = (fishCycles: Group[]) => {
  let newFish = 0
  for(let i = fishCycles.length - 1; i > -1; i--) {
    fishCycles[i].age--
  }
  for(let i = fishCycles.length - 1; i > -1; i--) {
    if (fishCycles[i].age === -1) {
      const group = fishCycles.find(c => c.age === 6)
      if (group !== undefined) {
        group.count += fishCycles[i].count
        newFish += fishCycles[i].count
        fishCycles.splice(i, 1)
      } else {
        fishCycles[i].age = 6
        newFish += fishCycles[i].count
      }
    }
  }
  if (newFish > 0) {
    addFish(8, fishCycles, newFish)
  }
}

const fishForDays = (fish: number[], days: number) => {
  const fishCycles: Group[] = []
  for(let i = 0; i < fish.length; i++) {
    addFish(fish[i], fishCycles, 1)
  }
  for(let i = 0; i < days; i++) {
    fishDay(fishCycles)
  }
  return fishCycles.reduce((p, c) => p + c.count, 0)
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