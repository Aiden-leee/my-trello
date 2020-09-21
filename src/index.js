import React from "react";
import ReactDOM from "react-dom";
import App from "./components/common/App";
import { createStore, applyMiddleware } from "redux";
import thunk from "react-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/";
import { Provider } from "react-redux";

const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
