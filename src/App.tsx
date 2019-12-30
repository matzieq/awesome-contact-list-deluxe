import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

import Navbar from "components/layout/Navbar";
import Contacts from "components/pages/Contacts";
import Skills from "components/pages/Skills";

import "./App.css";

const App: React.FC = () => {
  useEffect(() => {
    M.AutoInit();
  });
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Switch>
          <Route exact path="/contacts" component={Contacts} />
          <Route exact path="/skills" component={Skills} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
