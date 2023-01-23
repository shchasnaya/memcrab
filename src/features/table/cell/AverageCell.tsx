import HeaderCell from "./HeaderCell";
import {useContext} from "react";
import {localization} from "../../../localization/Localization";
import {Context} from "../../../core/Provider";

const AverageCell = () => {

  const {average} = useContext(Context)
  const {cell} = localization

  return (
      <tr>
        <HeaderCell name={cell.average}/>
        {average.map((item, index) =>
            <HeaderCell key={`${index}${average[index]}`} name={String(average[index])}/>)
        }
        <HeaderCell name={""}/>
        <HeaderCell name={""}/>
      </tr>
  );
};

export default AverageCell;