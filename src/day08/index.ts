import run from "aocrunner"

const ONE = 2
const FOUR = 4
const SEVEN = 3
const EIGHT = 7

const parseInput = (rawInput: string) => rawInput.split(/\r?\n/).map(e => e.split(' | ').map(t => t.split(' ')))

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  return input.reduce((p, c) => {
    const a = p + c[1].reduce((p1, c1) => {
      // console.log(`- ${c1.length}, ${c1}`)
      switch (c1.length) {
        case ONE:
        case FOUR:
        case SEVEN:
        case EIGHT:
          return p1 + 1
        default:
          return p1
      }
    }, 0)
    // console.log(a)
    return a
  }, 0)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return
}

const testInput = 'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf'
const longerTestInput = 
`be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`

run({
  part1: {
    tests: [
      { input: testInput, expected: 0 },
      { input: longerTestInput, expected: 26 },
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