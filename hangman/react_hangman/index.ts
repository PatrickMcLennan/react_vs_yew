import React, { createElement } from "react";
import ReactDOM from "react-dom";

import App from "./App";

const ROOT: HTMLDivElement = document.querySelector("#ROOT");

ReactDOM.render(createElement(App), ROOT);
