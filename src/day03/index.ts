import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split('\n').map(v => v.split('').map(v => Number(v)))

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const counts = input[0].map(() => 0)
  for(let i = 0; i < input.length; i++) {
    for(let j = 0; j < input[i].length; j++) {
      counts[j] += input[i][j]
    }
  }
  // puzzle is unclear on what to do if the count is even, favouring 1
  console.log('data length', input.length)
  const halfLength = input.length / 2
  console.log('halfLength', halfLength)
  const gammaBinary = counts.map(b => b >= halfLength ? 1 : 0)
  const epsilonBinary = gammaBinary.map(b => b ? 0 : 1)
  const gammaDecimal = parseInt(gammaBinary.join(''), 2)
  const epsilonDecimal = parseInt(epsilonBinary.join(''), 2)
  const power = gammaDecimal * epsilonDecimal
  console.log('counts', counts)
  console.log('gammaBinary', gammaBinary)
  console.log('epsilonBinary', epsilonBinary)
  console.log('gammaDecimal', gammaDecimal)
  console.log('epsilonDecimal', epsilonDecimal)
  console.log('power', power)
  return power
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return
}

run({
  part1: {
    tests: [
      { 
        input: `00100\n11110\n10110\n10111\n10101\n01111\n00111\n11100\n10000\n11001\n00010\n01010`, 
        expected: 198
      },
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