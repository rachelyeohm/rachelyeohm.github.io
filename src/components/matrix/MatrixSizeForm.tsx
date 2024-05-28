import React from 'react';

type MatrixSizeFormProps =  {
    text : string;
    number : number;
    onChange : (e : React.ChangeEvent<HTMLInputElement>) => void;
}

const MatrixSizeForm = ({text, number, onChange} : MatrixSizeFormProps) => { //form format for entering of rows / columns
  return (
    <form className = "general">
    <label>
        {text}:   &nbsp; &nbsp;
        <input
        type="number"
        min = "0"
        step = "1"
        name="n"
        value={number}
        onChange={onChange}
        />
    </label>
  </form>
  );
}

export default MatrixSizeForm