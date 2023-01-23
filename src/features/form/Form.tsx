import {FormEvent, useContext} from 'react';
import {Context} from "../../core/Provider";
import {localization} from "../../localization/Localization";
import './Form.scss'
import Button from "../button/Button";

const Form = () => {

  const {inputs, changeInputs, changeMatrix} = useContext(Context);
  const {enter, button} = localization;

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = +event.target.value;
    if (name === "x") {
      const multiplication = inputs.n * inputs.m
      if(multiplication === 0 || multiplication <= value) {
        alert(`Value must be less than ${multiplication}`)
      } else changeInputs(name, value);
    } else changeInputs(name, value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    changeMatrix();
  }

  return (
      <>
        <form onSubmit={handleSubmit} className="form">
          <label className="form__label">{enter.m}</label>
          <input
              className="form__input"
              type="number"
              name="m"
              min={1}
              max={100}
              value={inputs.m}
              onChange={handleChange}
          />
          <label className="form__label">{enter.n}</label>
          <input
              className="form__input"
              type="number"
              name="n"
              min={1}
              max={100}
              value={inputs.n}
              onChange={handleChange}
          />
          <Button onPress={() => handleSubmit} name={button.create} className={"create"}/>
        </form>
        <div className="form__x">
          <label className="form__label">{enter.x}</label>
          <input
              className="form__input"
              type="number"
              name="x"
              min={0}
              value={inputs.x}
              onChange={handleChange}
          />
        </div>
      </>
  );
};

export default Form;