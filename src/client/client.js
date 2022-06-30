import React from "react";
import ReactDOM from "react-dom";
import Home from "./components/Home";

const props = window.PROPS;

console.log(props);

ReactDOM.hydrate(<Home {...props} />, document.querySelector("#root"));
