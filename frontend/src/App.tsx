import React from "react";

import "./App.css";
import { Counter } from "./features/counter/counter";
import Login from "./features/auth/Login";

function App() {
  return (
    <div className="App">
      <Counter></Counter>
      <Login></Login>
    </div>
  );
}

export default App;
