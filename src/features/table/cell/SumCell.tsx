import {MouseEventHandler} from 'react';

const SumCell = (props: {
  name: string,
  onMouseEnter: MouseEventHandler<HTMLTableCellElement>,
  onMouseLeave: MouseEventHandler<HTMLTableCellElement>
}) => {

  return (
      <td className="cell cell__header_summary"
          onMouseEnter={props.onMouseEnter}
          onMouseLeave={props.onMouseLeave}
      >{props.name}</td>
  );
};

export default SumCell;