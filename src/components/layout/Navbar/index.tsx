import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav>
        <div className="nav-wrapper blue">
          <a href="/" className="brand-logo center">
            Awesome Contact List
          </a>
          <a href="#mobile-nav-menu" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul id="nav-mobile" className="left hide-on-med-and-down">
            <li>
              <Link to="/contacts">
                <i className="material-icons left">person</i>Contacts
              </Link>
            </li>
            <li>
              <Link to="/skills">
                <i className="material-icons left">build</i>Skills
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <ul id="mobile-nav-menu" className="sidenav">
        <li>
          <Link to="/contacts">
            <i className="material-icons left">person</i>Contacts
          </Link>
        </li>
        <li>
          <Link to="/skills">
            <i className="material-icons left">build</i>Skills
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Navbar;
