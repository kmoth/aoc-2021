import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split(/\r?\n/).map(v => v.split('').map(v => Number(v)))

function getCounts(input: number[][]): number[] {
  const counts = input[0].map(() => 0)
  for(let i = 0; i < input.length; i++) {
    for(let j = 0; j < input[i].length; j++) {
      counts[j] += input[i][j]
    }
  }
  return counts
}

function getBinary(input: number[], halfLength: number, bits: number[]) {
  return input.map(b => b >= halfLength ? bits[0] : bits[1])
}

function getDecimal(input: number[], halfLength: number, bits: number[]) {
  const binary = getBinary(input, halfLength, bits)
  return parseInt(binary.join(''), 2)
}

function findRating({ 
  input, 
  set, 
  bitIndex, 
}:{ 
  input: number[][],
  set: number[], 
  bitIndex: number, 
}): number[] {
  const halfLength = input.length / 2
  const counts = getCounts(input)
  const binary = getBinary(counts, halfLength, set)
  input = input.filter(c => c[bitIndex] === binary[bitIndex])
  return input.length > 1 
    ? findRating({ input, set, bitIndex: bitIndex + 1 }) 
    : input[0]
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const halfLength = input.length / 2
  const counts = getCounts(input)
  const gamma = getDecimal(counts, halfLength, [1, 0])
  const epsilon = getDecimal(counts, halfLength, [0, 1])
  const power = gamma * epsilon
  return power
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const o2Data = { input, bitIndex: 0, set: [1, 0] }
  const co2Data = { input, bitIndex: 0, set: [0, 1] }
  const o2Result = findRating(o2Data)
  const co2Result = findRating(co2Data)
  const o2Rating = parseInt(o2Result.join(''), 2)
  const co2Rating = parseInt(co2Result.join(''), 2)
  return o2Rating * co2Rating
}

const testInput = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 198
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 230
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})