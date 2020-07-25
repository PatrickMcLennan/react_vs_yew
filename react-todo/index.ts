import React, { createElement } from "react";
import ReactDOM from "react-dom";

import App from "./App";

import "../styles.css";

const ROOT: HTMLDivElement = document.querySelector(`#ROOT`);

ReactDOM.render(createElement(App), ROOT);
