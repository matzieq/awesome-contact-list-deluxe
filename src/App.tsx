import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

import ItemState from "context/items/ItemState";

import Navbar from "components/layout/Navbar";
import Items from "components/pages/Items";
import Tags from "components/pages/Tags";

import "./App.css";
import AddButton from "components/layout/AddButton";
import AddItemModal from "components/items/AddItemModal";
import AddTagModal from "components/items/AddTagModal";
import EditTagModal from "components/items/EditTagModal";
import { TAG_STORAGE_NAME, ITEM_STORAGE_NAME } from "shared/constants";
import TagState from "context/tags/TagState";

const App: React.FC = () => {
  useEffect(() => {
    M.AutoInit();
  });
  return (
    <Router>
      <ItemState>
        <TagState>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/games" component={Items} />
              <Route exact path="/tags" component={Tags} />
              <Route exact path="/">
                <Redirect to="/games" />
              </Route>
            </Switch>
            <AddButton />
            <button
              onClick={() => {
                localStorage.removeItem(ITEM_STORAGE_NAME);
                localStorage.removeItem(TAG_STORAGE_NAME);
              }}
            >
              DEBUG
            </button>
          </div>
          <AddItemModal />
          <AddTagModal />
          <EditTagModal />
        </TagState>
      </ItemState>
    </Router>
  );
};

export default App;
