import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
class Header extends Component {
  render() {
    return (
      <header className="app-header">
        <nav className="navbar navbar-expand bg-dark navbar-dark p-1">
          <div className="container">
            <Link to="/" className="navbar-brand">
              Dev Book{" "}
              <span className="badge badge-primary badge-pill">MERN</span>
            </Link>
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/register" className="nav-link">
                  Signin
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
