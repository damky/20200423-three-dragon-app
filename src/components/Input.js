import React from "react";

function Input(props) {
  return (
    <>
      <label>
        {props.preLabel && <span>{props.preLabel}</span>}
        <input
          type={props.type}
          name={props.name}
          id={`the${props.name}toggle`}
          placeholder={props.placeholder}
          iter={props.iter}
          onChange={props.onChange}
          data-property={props["data-property"]}
        />
        {props.postLabel && (
          <label htmlFor={`the${props.name}toggle`} className="btn">
            {props.postLabel}
          </label>
        )}
      </label>
    </>
  );
}

export default Input;
