import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

import ItemState from "context/items/ItemState";

import Navbar from "components/layout/Navbar";
import Items from "components/pages/Items";
import Skills from "components/pages/Skills";

import "./App.css";
import AddButton from "components/layout/AddButton";
import AddItemModal from "components/items/AddItemModal";
import AddSkillModal from "components/items/AddSkillModal";

const localStorageName = "AWESOME_GAME_LIST_DATA";

const App: React.FC = () => {
  useEffect(() => {
    M.AutoInit();
  });
  return (
    <Router>
      <ItemState>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/games" component={Items} />
            <Route exact path="/skills" component={Skills} />
          </Switch>
          <AddButton />
          <button onClick={() => localStorage.removeItem(localStorageName)}>
            DEBUG
          </button>
        </div>
        <AddItemModal />
        <AddSkillModal />
      </ItemState>
    </Router>
  );
};

export default App;
