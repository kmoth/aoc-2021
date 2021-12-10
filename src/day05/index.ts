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
    const line = { start: startPoint, end: endPoint }
    if (startPoint.x === endPoint.x || startPoint.y === endPoint.y) {
      lines.push(line)
    }
  })
  return lines
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const field: (number |  undefined)[][] = []
  const vertical: Line[] = []
  const horizontal: Line[] = []
  input.forEach(line => {
    if (line.start.x === line.end.x) {
      vertical.push(line)
    } else if (line.start.y === line.end.y){
      horizontal.push(line)
    }
  })
  vertical.forEach(line => {
    const start = Math.min(line.start.y, line.end.y)
    const end = Math.max(line.start.y, line.end.y)
    for(let i = start; i <= end; i++) {
      if (field[i] === undefined) {
        field[i] = []
      }
      field[i][line.start.x] = (field[i][line.start.x] || 0) + 1
    }
  })
  horizontal.forEach(line => {
    const start = Math.min(line.start.x, line.end.x)
    const end = Math.max(line.start.x, line.end.x)
    if (field[line.start.y] === undefined) {
      field[line.start.y] = []
    }
    for(let i = start; i <= end; i++) {
      field[line.start.y][i] = (field[line.start.y][i] || 0) + 1
    }
  })
  return field.flat().reduce((p, c) => c !== undefined && c > 1 ? (p || 0) + 1 : p, 0)
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
  onlyTests: false,
})