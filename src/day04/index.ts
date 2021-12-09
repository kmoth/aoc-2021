import run from "aocrunner"

type BingoCard = {
  numbers: string[]
  marks: boolean[]
}

interface Input {
  callNumbers: string[]
  cards: BingoCard[]
}

const parseInput = (rawInput: string): Input => {
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

const hasWin = (card: BingoCard, numberIndex: number) => {
  const hasRow = (card: BingoCard, numberIndex: number) => {
    const rowIndex = Math.floor(numberIndex / 5) * 5
    for(let i = 0; i < 5; i++) {
      if (!card.marks[rowIndex + i]) {
        return false
      }
    }
    return true
  }
  const hasColumn = (card: BingoCard, numberIndex: number) => {
    const columnIndex = numberIndex % 5
    for(let i = 0; i < 5; i++) {
      if (!card.marks[columnIndex + i * 5]) {
        return false
      }
    }
    return true
  }
  return hasRow(card, numberIndex) || hasColumn(card, numberIndex)
}

const markCard = (input: Input, callNumberIndex: number, cardIndex: number): boolean => {
  const currentCard = input.cards[cardIndex]
  const currentNumber = input.callNumbers[callNumberIndex]
  const matchIndex = currentCard.numbers.indexOf(currentNumber)
  if (matchIndex === -1) {
    return false
  }
  currentCard.marks[matchIndex] = true
  return hasWin(input.cards[cardIndex], matchIndex)
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let numberIndex = undefined
  let cardIndex = undefined
  numberLoop:
  for(let i = 0; i < input.callNumbers.length; i++) {
    for(let j = 0; j < input.cards.length; j++) {
      if (markCard(input, i, j)) {
        numberIndex = i
        cardIndex = j
        break numberLoop
      }
    }
  }
  if (cardIndex !== undefined && numberIndex !== undefined) {
    const card = input.cards[cardIndex]
    const tally = []
    for(let i = 0; i <card.numbers.length; i++) {
      if (!card.marks[i]) {
        tally.push(Number(card.numbers[i]))
      }
    }
    const total = tally.reduce((p, c) => p + c)
    const lastCall = Number(input.callNumbers[numberIndex])
    return total * lastCall
  }
  return 'barf'
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let numberIndex = undefined
  let cardIndex = undefined
  let wins: number[] = []
  let uniqueWins: number = 0
  numberLoop:
  for(let i = 0; i < input.callNumbers.length; i++) {
    for(let j = 0; j < input.cards.length; j++) {
      if (markCard(input, i, j)) {
        if (wins[j] === undefined) {
          wins[j] = 0
          uniqueWins += 1
        }
        wins[j] += 1
        if (uniqueWins === input.cards.length) {
          numberIndex = i
          cardIndex = j
          break numberLoop
        }
      }
    }
  }
  if (cardIndex !== undefined && numberIndex !== undefined) {
    const card = input.cards[cardIndex]
    const tally = []
    for(let i = 0; i <card.numbers.length; i++) {
      if (!card.marks[i]) {
        tally.push(Number(card.numbers[i]))
      }
    }
    const total = tally.reduce((p, c) => p + c)
    const lastCall = Number(input.callNumbers[numberIndex])
    return total * lastCall
  }

  return 'groargh'
}

const testInput = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

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
 2  0 12  3  7`

run({
  part1: {
    tests: [
      { 
        input: testInput,
        expected: 4512,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { 
        input: testInput, 
        expected: 1924,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})