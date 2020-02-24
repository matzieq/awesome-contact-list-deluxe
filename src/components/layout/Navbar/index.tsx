import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import itemContext from "context/items/itemContext";
import tagContext from "context/tags/tagContext";
import platformContext from "context/platforms/platformContext";

const Navbar = () => {
  const { getItems } = useContext(itemContext);
  const { getTags } = useContext(tagContext);
  const { getPlatforms } = useContext(platformContext);

  useEffect(() => {
    getItems();
    getTags();
    getPlatforms();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <nav>
        <div className="nav-wrapper blue">
          <a href="/" className="brand-logo center">
            Awesome Game List
          </a>
          <a href="#mobile-nav-menu" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul id="nav-mobile" className="left hide-on-med-and-down">
            <li>
              <Link to="/games">
                <i className="material-icons left">games</i>Games
              </Link>
            </li>
            <li>
              <Link to="/tags">
                <i className="material-icons left">format_list_bulleted</i>Tags
              </Link>
            </li>
            <li>
              <Link to="/platforms">
                <i className="material-icons left">tv</i>Platforms
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <ul id="mobile-nav-menu" className="sidenav">
        <li>
          <Link to="/games">
            <i className="material-icons left">games</i>Games
          </Link>
        </li>
        <li>
          <Link to="/tags">
            <i className="material-icons left">format_list_bulleted</i>Tags
          </Link>
        </li>
        <li>
          <Link to="/platforms">
            <i className="material-icons left">tv</i>Platforms
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Navbar;
