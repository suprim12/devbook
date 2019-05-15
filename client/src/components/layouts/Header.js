import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logoutuser } from "../../actions/authActions";
import { clearprofile } from "../../actions/profileActions";
class Header extends Component {
  handleLogout = e => {
    e.preventDefault();
    this.props.logoutuser();
    this.props.clearprofile();
  };
  render() {
    const { isAuthenticate, user } = this.props.auth;
    const { profile } = this.props.profile;
    const authLinks = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link
            to={`/profile/${profile ? profile.handle : ""}`}
            className="nav-link"
          >
            <img
              src={user.avatar}
              alt={user.name}
              title="Must have gravatar"
              width="24"
              height="24"
              className="d-inline-block align-top avatar"
            />
          </Link>
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
              Dev Book
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
  profile: state.profile,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutuser, clearprofile }
)(Header);
