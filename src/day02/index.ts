import run from "aocrunner"

type Direction = 'forward' | 'down' | 'up'
interface Sub {
  position: number
  depth: number
}
interface Sub2 extends Sub {
  aim: number
}
class SubCommand {
  direction: Direction
  distance: number
  constructor(input: string) {
    const t = input.split(' ')
    this.direction = t[0] as Direction
    this.distance = Number(t[1])
  }
}

const parseInput = (rawInput: string) => rawInput.split('\n').map(v => new SubCommand(v))

const funcs: Record<Direction,(p: Sub, d: number)=>void> = {
  'forward': (p: Sub, d: number) => {
    p.position += d
  },
  'down': (p: Sub, d: number) => {
    p.depth += d
  },
  'up': (p: Sub, d: number) => {
    p.depth -= d
  },
}

const funcs2: Record<Direction,(p: Sub2, d: number)=>void> = {
  'forward': (p: Sub2, d: number) => {
    p.position += d
    p.depth += p.aim * d
  },
  'down': (p: Sub2, d: number) => {
    p.aim += d
  },
  'up': (p: Sub2, d: number) => {
    p.aim -= d
  },
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const sub: Sub = { position: 0, depth: 0 }
  input.forEach(c => funcs[c.direction](sub, c.distance))
  return sub.position * sub.depth
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const sub: Sub2 = { position: 0, depth: 0, aim: 0 }
  input.forEach(c => funcs2[c.direction](sub, c.distance))
  return sub.position * sub.depth
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