import React from "react";
import "./App.css";
import { HashRouter } from "react-router-dom";
import routes from "./routes";
import Header from "./components/Header/Header";

function App() {
  return (
    <div>
      <HashRouter>
        {routes}
      </HashRouter>
    </div>
  );
}

export default App;
