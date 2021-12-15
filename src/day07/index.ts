import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split(',').map(n => Number(n))

const costOfMovingTo = (input: number[], value: number) => {
  return input.reduce((p, c) => p + Math.abs(c - value), 0)
}

const newCostOfMovingTo = (input: number[], value: number) => {
  return input.reduce((p, c) => {
    const d = Math.abs(c - value)
    return p + (d * (d + 1) / 2)
  }, 0)
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const cost = Array.from(new Set(input)).reduce((p, c) => {
    return Math.min(p, costOfMovingTo(input, c))
  }, Number.MAX_VALUE)
  return cost
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  console.log('cost', newCostOfMovingTo(input, 2))
  const cost = Array.from(new Set(input)).reduce((p, c) => {
    return Math.min(p, newCostOfMovingTo(input, c))
  }, Number.MAX_VALUE)
  return cost
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
  onlyTests: true,
})