import {useContext} from "react";
import {Context} from "../../../core/Provider";
import HeaderCell from "../cell/HeaderCell";

const HeaderColumn = () => {

  const {matrixHeader} = useContext(Context)

  return (
      <tr>
        <HeaderCell name={""} />
        {matrixHeader.map((item, index) => <HeaderCell key={index} name={item}/>)}
      </tr>
  );
};

export default HeaderColumn;