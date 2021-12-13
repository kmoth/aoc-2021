import run from "aocrunner"

interface Point {
  x: number
  y: number
}

interface Line {
  start: Point
  end: Point
}

const parseInput = (rawInput: string) => {
  const lines: Line[] = []
  rawInput.split(/\r?\n/).map(rawLine => {
    const startEnd = rawLine.split(' -> ')
    const start = startEnd[0].split(',')
    const end = startEnd[1].split(',')
    const startPoint = { x: Number(start[0]), y: Number(start[1]) }
    const endPoint = { x: Number(end[0]), y: Number(end[1]) }
    lines.push({ start: startPoint, end: endPoint })
  })
  return lines
}

const generateMarkedField = (input: Line[]): (number |  undefined)[][] => {
  const field: (number |  undefined)[][] = []
  input.forEach(line => {
    const distX = line.end.x - line.start.x
    const distY = line.end.y - line.start.y
    const length = Math.max(Math.abs(distX), Math.abs(distY))
    for(let i = 0; i <= length; i++) {
      const point = {
        x: line.start.x + distX * i / length, 
        y: line.start.y + distY * i / length,
      }
      field[point.y] ||= []
      field[point.y][point.x] = (field[point.y][point.x] || 0) + 1
    }
  })
  return field
}

const countDensitiesGreaterThan = (field: (number |  undefined)[][], value: number): number | undefined => {
  return field.flat().reduce((p, c) => c !== undefined && c > value ? (p || 0) + 1 : p, 0)
}

const filterStraightLines = (line: Line) => {
  return line.start.x === line.end.x || line.start.y === line.end.y
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const field = generateMarkedField(input.filter(filterStraightLines))
  return countDensitiesGreaterThan(field, 1)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const field = generateMarkedField(input)
  return countDensitiesGreaterThan(field, 1)
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
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})