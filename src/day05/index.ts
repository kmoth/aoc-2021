import run from "aocrunner"

const parseInput = (rawInput: string) => {
  return rawInput
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  // filter out diagonal lines 
  // plot lines as number values in a grid
  // count cells with value > 1
  return 'norp'
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return 'grimace'
}

const testInput = 
`0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`

run({
  part1: {
    tests: [
      { 
        input: testInput, 
        expected: 5,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { 
        input: testInput, 
        expected: '',
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
})