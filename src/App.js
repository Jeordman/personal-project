import React from "react";
import "./App.css";
import { HashRouter } from "react-router-dom";
import routes from "./routes";
import Header from "./components/Header/Header";
import { Provider } from 'react-redux'

import { PersistGate } from "redux-persist/integration/react";

import {store} from "./ducks/store";
import {persistor} from "./ducks/store";

function App() {
  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <HashRouter>{routes}</HashRouter>
        </PersistGate>
      </Provider>
  );
}

export default App;
