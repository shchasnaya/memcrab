import {useContext} from "react";
import {Context} from "../../../core/Provider";
import HeaderCell from "../cell/HeaderCell";

const HeaderColumn = () => {

  const {matrixHeader} = useContext(Context)

  return (
      <tr>
        <td>&nbsp;</td>
        {matrixHeader.map((item, index) => <HeaderCell key={index} name={item}/>)}
      </tr>
  );
};

export default HeaderColumn;