import {createContext, FC, ReactNode, useEffect, useState} from 'react';
import {Cell, initialValue} from "../model/Model";
import {localization} from "../localization/Localization";

const Context = createContext(initialValue)

type Props = {
  children: ReactNode
};

const Provider: FC<Props> = ({children}) => {
  const [matrixHeader, setMatrixHeader] = useState(initialValue.matrixHeader);
  const [matrix, setMatrix] = useState(initialValue.matrix);
  const [inputs, setInputs] = useState(initialValue.inputs);
  const [summary, setSummary] = useState(initialValue.summary);
  const [average, setAverage] = useState(initialValue.average);
  const [percent, setPercent] = useState(initialValue.percent);
  const [closetValue, setClosetValue] = useState(initialValue.closetValue);
  const [idCell, setIdCell] = useState(1);
  const [refresh, setRefresh] = useState(false);

  const {cell} = localization;

  useEffect(() => {
    averageValues();
    sumValues();
  }, [matrix.length, refresh]);

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
    setRefresh(() => !refresh);
  }

  const changeMatrix = () => {
    resetMatrix();

    setMatrixHeader(Array(inputs.n + 2).fill("").map((item, index) => {
      if (index === inputs.n) return cell.summary;
      else if (index === inputs.n + 1) return cell.actions;
      else return `${cell.n}${index + 1}`;
    }))

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
    setSummary(summary.map((item, index) => {
      if (index === row) return item + 1
      else return item
    }))
    setAverage(average.map((item, index) => {
      if (index === column) return Math.floor((item * inputs.m + 1) / inputs.m * 10) / 10;
      else return item
    }))
  }

  const sumValues = () => {
    let newSummary: number[] = [];
    matrix.forEach((column) => {
      let sum = column.reduce((acc, prev) => acc + prev.amount, 0)
      newSummary.push(sum)
    })
    setSummary(newSummary)
  }

  const averageValues = () => {
    let sum = 0;
    let newAverage: number[] = []
    for (let i = 0; i < inputs.n; i++) {
      sum = 0;
      for (let j = 0; j < inputs.m; j++) {
        sum = sum + matrix[j][i].amount;
      }
      newAverage.push(Math.floor(sum / inputs.m * 10) / 10)
    }
    setAverage(newAverage)
  }

  const deleteRow = (row: number) => {
    setMatrix(matrix.filter((item, index) => row !== index));
    setSummary(summary.filter((item, index) => row !== index))
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

  const changePercent = (row: number) => {
    let newPercent: number[] = [];
    matrix[row].forEach((item) => {
      newPercent.push(Math.round(item.amount * 100 / summary[row]))
    })
    setPercent(newPercent)
  }

  const changeClosetValue = (amount: number, id: number) => {
    if (inputs.x > 0) {
      let newArray: Array<Cell> = [];
      for (let i = 0; i < inputs.m; i++) {
        for (let j = 0; j < inputs.n; j++) {
          if (matrix[i][j].id !== id) {
            if (newArray.length < inputs.x) {
              newArray.push({
                id: matrix[i][j].id,
                amount: matrix[i][j].amount
              })

            } else if (newArray.length === inputs.x) {
              newArray.sort((a, b) => {
                return a.amount - b.amount;
              });
              const differentWithAmount = Math.abs(matrix[i][j].amount - amount);
              const differentWithFirstValueArrayAmount = Math.abs(newArray[0].amount - amount);
              const differentWithLastValueArrayAmount = Math.abs(newArray[newArray.length - 1].amount - amount);
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
      setClosetValue(newArray)
    }
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
        changeInputs,
        changeMatrix,
        changeCell,
        deleteRow,
        addRow,
        changePercent,
        changeClosetValue
      }}
      >
        {children}
      </Context.Provider>
  );
};

export {Provider, Context}