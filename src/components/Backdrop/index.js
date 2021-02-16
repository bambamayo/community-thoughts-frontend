import * as React from "react";
import ReactDOM from "react-dom";

export default function Backdrop({ onClick }) {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={onClick}></div>,
    document.getElementById("backdrop-hook")
  );
}
