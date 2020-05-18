import React from "react";

function Input(props) {
    return (
      <>
        <label>
          {props.label}
          <br/>
              <input type={props.type} name={props.name} placeholder={props.placeholder} iter={props.iter} onChange={props.onChange} data-property={props['data-property']} />
        </label>
        <br/>
      </>
    )
  }

export default Input;