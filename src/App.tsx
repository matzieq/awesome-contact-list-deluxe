import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

import ContactState from "context/contacts/ContactState";

import Navbar from "components/layout/Navbar";
import Contacts from "components/pages/Contacts";
import Skills from "components/pages/Skills";

import "./App.css";
import AddButton from "components/layout/AddButton";
import AddContactModal from "components/contacts/AddContactModal";

const App: React.FC = () => {
  useEffect(() => {
    M.AutoInit();
  });
  return (
    <Router>
      <ContactState>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/contacts" component={Contacts} />
            <Route exact path="/skills" component={Skills} />
          </Switch>
          <AddButton />
        </div>
        <AddContactModal />
      </ContactState>
    </Router>
  );
};

export default App;
