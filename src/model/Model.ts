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

type Context = {
  matrixHeader: ArrayString,
  summary: ArrayNumber,
  average: ArrayNumber,
  percent: ArrayNumber,
  rowForShowPercent: number,
  cellForShowClosetValue: Cell,
  closetValue: Cell[],
  matrix: Array<Array<Cell>>,
  inputs: Input,
  changeInputs: (name: string, value: number) => void,
  changeMatrix: () => void,
  changeCell: (row: number, column: number) => void,
  deleteRow: (row: number) => void,
  changeCellForShowClosetValue: (cell: Cell) => void,
  changeRowForShowPercent: (row: number) => void,
  addRow: () => void
}

export const initialValue: Context = {
  matrixHeader: [],
  matrix: [[]],
  summary: [],
  average: [],
  percent: [],
  closetValue: [],
  rowForShowPercent: -1,
  cellForShowClosetValue: {
    id: -1,
    amount: 0
  },
  inputs: {
    m: 0,
    n: 0,
    x: 1
  },
  changeInputs: () => {},
  changeMatrix: () => {},
  changeCell: () => {},
  deleteRow: () => {},
  changeRowForShowPercent: () => {},
  changeCellForShowClosetValue: () => {},
  addRow: () => {}
}