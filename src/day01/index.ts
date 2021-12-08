import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split(/\r?\n/).map(v => Number(v))

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let count = 0
  input.reduce((prev, curr) => {
    count += curr > prev ? 1 : 0
    return curr
  })
  return count
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let count = 0
  input.reduce((prev, curr, index, array) => {
    let value = curr
    if (index + 2 < array.length) {
      value += array[index + 1] + 
        array[index + 2]
    }
    count += index > 1 && value > prev ? 1 : 0
    return value
  })
  return count
}

run({
  part1: {
    tests: [
      // { input: ``, expected: "" },
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
})