type CellId = number;
type CellValue = number;

type ArrayNumber = number[];
type ArrayString = string[];

export type Cell = {
  id: CellId,
  amount: CellValue
}

type Input = {
  m: number,
  n: number,
  x: number
}

type context = {
  matrixHeader: ArrayString,
  summary: ArrayNumber,
  average: ArrayNumber,
  percent: ArrayNumber,
  closetValue: Cell[],
  matrix: Array<Array<Cell>>,
  inputs: Input,
  changeInputs: (name: string, value: number) => void,
  changeMatrix: () => void,
  changeCell: (row: number, column: number) => void,
  deleteRow: (row: number) => void,
  changePercent: (row: number) => void,
  changeClosetValue: (amount: number, id: number) => void,
  addRow: () => void
}

export const initialValue: context = {
  matrixHeader: [],
  matrix: [],
  summary: [],
  average: [],
  percent: [],
  closetValue: [],
  inputs: {
    m: 0,
    n: 0,
    x: 0
  },
  changeInputs: () => {},
  changeMatrix: () => {},
  changeCell: () => {},
  deleteRow: () => {},
  changePercent: () => {},
  changeClosetValue: () => {},
  addRow: () => {}
}