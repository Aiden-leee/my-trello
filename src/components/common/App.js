import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./Navigation";
import Main from "../../routes/Main";
import styled from "styled-components";
import NotFound from "../NotFound";
import "../../assets/css/init.css";

const Wrap = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100% - 56px);
  border: 1px solid #eaeaea;
  background: #eaeaea;
  box-sizing: border-box;
`;

function App() {
  return (
    <Router>
      <Navigation></Navigation>
      <Wrap>
        <Switch>
          <Route path="/" exact component={Main}></Route>
          <Route component={NotFound}></Route>
        </Switch>
      </Wrap>
    </Router>
  );
}

export default App;
