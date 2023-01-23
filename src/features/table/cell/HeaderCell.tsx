
const HeaderCell = (props: { name: string }) => {
  return (
      <td className="cell cell__header">{props.name}</td>
  );
};

export default HeaderCell;