import run from "aocrunner"

type BingoCard = {
  numbers: string[]
  marks: boolean[]
}

const parseInput = (rawInput: string): { callNumbers: string[], cards: BingoCard[] } => {
  const lines = rawInput.split(/\r?\n/)
  const callNumbers = lines[0].split(',')
  const cards = []
  let line = 2
  while(line < lines.length) {
    let i
    const card: BingoCard = {
      numbers: [],
      marks: [],
    }
    for(i = 0; i < 5; i++ ) {
      const lineNumbers = lines[line + i].trim().split(/\s+/)
      card.numbers = card.numbers.concat(lineNumbers)
    }
    cards.push(card)
    line += i + 1
  }
  return { callNumbers, cards }
}

const hasWin = (card: BingoCard) => {
  let ind
  for(let i = 0; i < card.numbers.length; i++) {
    if (card.marks[i] === true) {
      ind = i

    }
  }
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let currentNumberIndex = 0
  const currentCard = input.cards[0]
  while(currentNumberIndex < input.callNumbers.length) {
    const currentNumber = input.callNumbers[currentNumberIndex]
    const numberIndex = currentCard.numbers.indexOf(currentNumber)
    if (numberIndex > -1) {
      currentCard.marks[numberIndex] = true
    }
    hasWin(currentCard)
    currentNumberIndex++
  }
  console.log('marks', currentCard.marks)
  return
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return
}

run({
  part1: {
    tests: [
      { 
        input: 
`7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`,
        expected: 4512
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
  onlyTests: true,
})