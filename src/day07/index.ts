import run from "aocrunner"

interface Range {
  min: number
  max: number
}

const parseInput = (rawInput: string) => rawInput.split(',').map(n => Number(n))

const part1CostOfMoving = (input: number[], value: number) => {
  return input.reduce((p, c) => p + Math.abs(c - value), 0)
}

const part2CostOfMoving = (input: number[], value: number) => {
  return input.reduce((p, c) => {
    const d = Math.abs(c - value)
    return p + (d * (d + 1) / 2)
  }, 0)
}

const getRange = (s: Set<number>): Range => {
  let min = Number.MAX_VALUE
  let max = Number.MIN_VALUE
  const d = s.forEach(x => {
    min = Math.min(x, min)
    max = Math.max(x, max)
  })
  return { min, max }
}

const getLowestCost = (input: number[], range: Range, costCalculation: (input: number[], value: number) => number): number => {
  let leastCost = Number.MAX_VALUE
  for(let i = range.min; i <= range.max; i++) {
    leastCost = Math.min(costCalculation(input, i), leastCost)
  }
  return leastCost
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const uniqueSet = new Set(input)
  const range = getRange(uniqueSet)
  return getLowestCost(input, range, part1CostOfMoving)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const uniqueSet = new Set(input)
  const range = getRange(uniqueSet)
  return getLowestCost(input, range, part2CostOfMoving)
}

const testInput = '16,1,2,0,4,2,7,1,2,14'

run({
  part1: {
    tests: [
      { input: testInput, expected: 37 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: testInput, expected: 168 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})