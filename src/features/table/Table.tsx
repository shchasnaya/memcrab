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
    changePercent,
    changeClosetValue
  } = useContext(Context);

  const {cell, button} = localization;

  const [showPercent, setShowPercent] = useState(-1);
  const [hoverCell, setHoverCell] = useState(false);

  return (
      <div className="table">
        {matrix.length > 0
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
                              changeClosetValue(cell.amount, cell.id)
                              setHoverCell(true)
                            }}
                            onMouseLeave={() => setHoverCell(false)}
                            percent={showPercent === rowIndex ? percent[columnIndex] : -1}
                            key={cell.id}
                            cell={cell}
                            onPress={() => changeCell(rowIndex, columnIndex)}/>
                    ))}
                    <SumCell
                        onMouseEnter={() => {
                          setShowPercent(rowIndex);
                          changePercent(rowIndex);
                        }}
                        onMouseLeave={() => setShowPercent(-1)}
                        key={`Summary${rowIndex}`}
                        name={String(summary[rowIndex])}
                    />
                    <Button key={`Delete${rowIndex}`}
                            onPress={() => deleteRow(rowIndex)}
                            name={button.delete}
                            className={"delete"}/>
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