import cn from 'classnames';
import {MouseEventHandler, useContext} from "react";
import {Cell as CellType} from "../../../model/Model";
import {Context} from "../../../core/Provider";
import "./Cell.scss"


const Cell = (props: {
  hover: boolean
  percent: number,
  cell: CellType,
  onPress: MouseEventHandler<HTMLTableCellElement>,
  onMouseEnter: MouseEventHandler<HTMLTableCellElement>,
  onMouseLeave: MouseEventHandler<HTMLTableCellElement>
}) => {

  const {closetValue} = useContext(Context)

  const cellClass = cn('cell cell__item', {
    'cell__item_percent': props.percent >= 0,
    'cell__item_hover': closetValue.find(item => item.id === props.cell.id) && props.hover,
  });

  return (
      <td
          className={cellClass}
          onClick={props.onPress}
          onMouseEnter={props.onMouseEnter}
          onMouseLeave={props.onMouseLeave}
      >
        {props.percent >= 0 ? `${props.cell.amount} \u2192 ${props.percent}%` : props.cell.amount}
      </td>
  );
};

export default Cell;