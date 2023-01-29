import {createContext, FC, ReactNode, useMemo, useState} from 'react';
import {Cell, initialValue} from "../model/Model";
import {localization} from "../localization/Localization";

const Context = createContext(initialValue)

type Props = {
  children: ReactNode
};

const Provider: FC<Props> = ({children}) => {
  const [inputs, setInputs] = useState(initialValue.inputs);
  const [matrix, setMatrix] = useState(initialValue.matrix);
  const [rowForShowPercent, setRowForShowPercent] = useState(initialValue.rowForShowPercent);
  const [cellForShowClosetValue, setCellForShowClosetValue] = useState(initialValue.cellForShowClosetValue);
  const [idCell, setIdCell] = useState(1);

  const matrixHeader = useMemo(() => changeMatrixHeader(matrix[0].length), [matrix[0].length]);
  const summary = useMemo(() => sumValues(matrix), [matrix]);
  const average = useMemo(() => averageValues(matrix), [matrix]);
  const percent = useMemo(() => changePercent(rowForShowPercent), [rowForShowPercent]);
  const closetValue = useMemo(() => changeClosetValue(cellForShowClosetValue), [cellForShowClosetValue, inputs.x]);


  const changeInputs = (name: string, value: number) => {
    setInputs(values => ({...values, [name]: value}));
  }

  const random = () => {
    return Math.round(Math.random() * (999 - 100 + 1) + 100);
  }

  const resetMatrix = () => {
    let newMatrix = Array(inputs.m).fill("").map(() => Array(inputs.n).fill({
      id: 0,
      amount: 0
    }));
    setIdCell(0);
    setMatrix(matrix.splice(0, 100, ...newMatrix));
  }

  const changeMatrix = () => {
    resetMatrix();

    let counter = 0;
    setMatrix(matrix.map((column,) => {
      return column.map(() => {
        counter++;
        setIdCell(counter);
        return {
          id: counter,
          amount: random()
        }
      })
    }))
  }

  const changeCell = (row: number, column: number) => {
    setMatrix(matrix.map((item, indexRow) => {
      if (indexRow === row) return item.map((cell, indexCell) => {
        if (indexCell === column) return {...cell, amount: cell.amount + 1};
        else return cell;
      })
      else return item
    }))
  }

  const deleteRow = (row: number) => {
    setMatrix(matrix.filter((item, index) => row !== index));
    changeInputs("m", inputs.m - 1)
  }

  const addRow = () => {
    let counter = idCell;
    const newRow = Array(inputs.n).fill("").map(() => {
      counter++;
      setIdCell(counter);
      return {
        id: counter,
        amount: Math.round(Math.random() * (999 - 100 + 1) + 100)
      }
    });
    setMatrix([...matrix, newRow]);

    changeInputs("m", inputs.m + 1)
  }

  const changeRowForShowPercent = (row: number) => {
    setRowForShowPercent(row);
  }

  const changeCellForShowClosetValue = (cell: Cell) => {
    setCellForShowClosetValue(cell)
  }

  function changeMatrixHeader(lengthRow: number) {
    return Array(lengthRow + 2).fill("").map((item, index) => {
      if (index === lengthRow) return localization.cell.summary;
      else if (index === lengthRow + 1) return localization.cell.actions;
      else return `${localization.cell.n}${index + 1}`;
    })
  }

  function averageValues(matrix: Array<Array<Cell>>) {
    let sum = 0;
    let newAverage: number[] = []
    for (let i = 0; i < matrix[0].length; i++) {
      sum = 0;
      for (let j = 0; j < matrix.length; j++) {
        sum = sum + matrix[j][i].amount;
      }
      newAverage.push(Math.floor(sum / matrix.length * 10) / 10)
    }
    return newAverage;
  }

  function sumValues(matrix: Array<Array<Cell>>) {
    let newSummary: number[] = [];
    matrix.forEach((column) => {
      let sum = column.reduce((acc, prev) => acc + prev.amount, 0)
      newSummary.push(sum)
    })
    return newSummary
  }

  function changePercent(row: number) {
    if (row === -1) return []
    else {
      let newPercent: number[] = [];
      matrix[row].forEach((item) => {
        newPercent.push(Math.round(item.amount * 100 / summary[row]))
      })
      return newPercent;
    }
  }

  function changeClosetValue(cell: Cell) {
    if (cell.id !== -1) {
      let newArray: Array<Cell> = [];
      for (let i = 0; i < inputs.m; i++) {
        for (let j = 0; j < inputs.n; j++) {
          if (matrix[i][j].id !== cell.id) {
            if (newArray.length < inputs.x) {
              newArray.push({
                id: matrix[i][j].id,
                amount: matrix[i][j].amount
              })

            } else if (newArray.length === inputs.x) {
              newArray.sort((a, b) => {
                return a.amount - b.amount;
              });
              const differentWithAmount = Math.abs(matrix[i][j].amount - cell.amount);
              const differentWithFirstValueArrayAmount = Math.abs(newArray[0].amount - cell.amount);
              const differentWithLastValueArrayAmount = Math.abs(newArray[newArray.length - 1].amount - cell.amount);
              const minDifferent = Math.min(differentWithAmount, differentWithFirstValueArrayAmount, differentWithFirstValueArrayAmount);
              if (minDifferent === differentWithAmount) {
                if (differentWithFirstValueArrayAmount > differentWithLastValueArrayAmount) {
                  newArray.splice(0, 1, {
                    id: matrix[i][j].id,
                    amount: matrix[i][j].amount
                  })
                } else {
                  newArray.splice(newArray.length - 1, 1, {
                    id: matrix[i][j].id,
                    amount: matrix[i][j].amount
                  })
                }
              }
            }
          }
        }
      }
      return newArray;
    } else return [{
      id: -1,
      amount: 0
    }]
  }

  return (
      <Context.Provider value={{
        matrixHeader,
        matrix,
        inputs,
        summary,
        average,
        percent,
        closetValue,
        cellForShowClosetValue,
        rowForShowPercent,
        changeInputs,
        changeMatrix,
        changeCell,
        deleteRow,
        addRow,
        changeCellForShowClosetValue,
        changeRowForShowPercent
      }}
      >
        {children}
      </Context.Provider>
  );
};

export {Provider, Context}