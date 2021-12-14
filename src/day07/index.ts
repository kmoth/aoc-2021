import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split(',').map(n => Number(n))

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const lookup: Record<number, number> = {}
  input.forEach(n => lookup[n] = (lookup[n] || 0) + 1)
  const uh = Number(Object.entries(lookup).reduce((p, c) => (c?.[1] > p?.[1]) ? c : p)[0])
  return input.reduce((p, c) => p + Math.abs(c - uh), 0)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return
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
      // { input: ``, expected: "" },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})