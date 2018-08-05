import React from "react";

export default function Square(props) {
  const className = props.needHighlight ? "square square-highlight" : "square";
  return (
    <button className={className} onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}
