import {useContext, useState} from 'react';
import {Context} from "../../core/Provider";
import {localization} from "../../localization/Localization";
import HeaderCell from "./cell/HeaderCell";
import Cell from "./cell/Cell";
import Button from "../button/Button";
import SumCell from "./cell/SumCell";
import HeaderCellColumn from "./header/HeaderCellColumn";
import AverageCell from "./cell/AverageCell";
import "./Table.scss"

const Table = () => {
  const {
    matrix,
    summary,
    percent,
    changeCell,
    deleteRow,
    addRow,
    rowForShowPercent,
    changeCellForShowClosetValue,
    changeRowForShowPercent
  } = useContext(Context);

  const {cell, button} = localization;

  const [hoverCell, setHoverCell] = useState(false);

  return (
      <div className="table">
        {matrix[0].length > 0
            ?
            <table className="table_align">
              <thead>
              <HeaderCellColumn/>
              </thead>
              <tbody>
              {matrix.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <HeaderCell key={`${rowIndex}`} name={`${cell.m}${rowIndex + 1}`}/>
                    {row.map((cell, columnIndex) => (
                        <Cell
                            hover={hoverCell}
                            onMouseEnter={() => {
                              changeCellForShowClosetValue(cell)
                              setHoverCell(true)
                            }}
                            onMouseLeave={() => setHoverCell(false)}
                            percent={rowForShowPercent === rowIndex ? percent[columnIndex] : -1}
                            key={cell.id}
                            cell={cell}
                            onPress={() => changeCell(rowIndex, columnIndex)}/>
                    ))}
                    <SumCell
                        onMouseEnter={() => {
                          changeRowForShowPercent(rowIndex);
                        }}
                        onMouseLeave={() => changeRowForShowPercent(-1)}
                        key={`Summary${rowIndex}`}
                        name={(summary[rowIndex]).toString()}
                    />
                    <td>
                      <Button key={`Delete${rowIndex}`}
                              onPress={() => deleteRow(rowIndex)}
                              name={button.delete}
                              className={"delete"}/>
                    </td>
                  </tr>
              ))}
              <AverageCell/>
              </tbody>
              <tfoot>
              <tr>
                <td>
                  <Button onPress={addRow} name={button.add} className={"add"}/>
                </td>
              </tr>
              </tfoot>
            </table>
            :
            null
        }
      </div>
  );
};

export default Table;