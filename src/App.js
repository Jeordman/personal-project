import React from "react";
import "./App.css";
import { HashRouter } from "react-router-dom";
import routes from "./routes";
import Header from "./components/Header";
import Login from "./components/Login/Login";

function App() {
  return (
    <div>
      <HashRouter>
        <Header />
        {routes}
      </HashRouter>
    </div>
  );
}

export default App;
