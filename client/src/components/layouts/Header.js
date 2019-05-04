import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logoutuser } from "../../actions/authActions";
class Header extends Component {
  handleLogout = e => {
    e.preventDefault();
    this.props.logoutuser();
  };
  render() {
    const { isAuthenticate, user } = this.props.auth;
    const authLinks = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink to="/register" className="nav-link">
            <img
              src={user.avatar}
              alt={user.name}
              title="Must have gravatar"
              width="24"
              height="24"
              className="d-inline-block align-top avatar"
            />
          </NavLink>
        </li>
        <li className="nav-item">
          <a href="/" className="nav-link" onClick={this.handleLogout}>
            Logout
          </a>
        </li>
      </ul>
    );
    const guestLinks = (
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
    );

    return (
      <header className="app-header">
        <nav className="navbar navbar-expand bg-dark navbar-dark p-1">
          <div className="container">
            <Link to="/" className="navbar-brand">
              Dev Book{" "}
              <span className="badge badge-primary badge-pill">MERN</span>
            </Link>
            {isAuthenticate ? authLinks : guestLinks}
          </div>
        </nav>
      </header>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutuser }
)(Header);
