import {MouseEventHandler} from 'react';
import "./Button.scss"

const Button = (props: {onPress: MouseEventHandler<HTMLButtonElement>, name: string, className: string}) => {
  const {onPress, name, className} = props;

  return (
      <button className={`button button_${className}`} onClick={onPress}>{name}</button>
  );
};

export default Button;