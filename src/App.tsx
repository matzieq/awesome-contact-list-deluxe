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
import PlatformState from "context/platforms/PlatformState";

import Navbar from "components/layout/Navbar";
import Items from "components/pages/Items";
import Tags from "components/pages/Tags";
import Platforms from "components/pages/Platforms";

import AddButton from "components/layout/AddButton";
import AddItemModal from "components/items/AddItemModal";
import AddTagModal from "components/items/AddTagModal";
import EditTagModal from "components/items/EditTagModal";
import TagState from "context/tags/TagState";
import EditItemModal from "components/items/EditITemModal";
import AddPlatformModal from "components/items/AddPlatformModal";
import EditPlatformModal from "components/items/EditPlatformModal";

const App: React.FC = () => {
  useEffect(() => {
    M.AutoInit();
  });
  return (
    <Router>
      <ItemState>
        <TagState>
          <PlatformState>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/games" component={Items} />
                <Route exact path="/platforms" component={Platforms} />
                <Route exact path="/tags" component={Tags} />
                <Route exact path="/">
                  <Redirect to="/games" />
                </Route>
              </Switch>
              <AddButton />
            </div>
            <AddItemModal />
            <AddTagModal />
            <EditTagModal />
            <EditItemModal />
            <AddPlatformModal />
            <EditPlatformModal />
          </PlatformState>
        </TagState>
      </ItemState>
    </Router>
  );
};

export default App;
