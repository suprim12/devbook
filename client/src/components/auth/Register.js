import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
// Actions
import { registeruser } from "../../actions/authActions";
// Components
import InputField from "./InputField";
class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };
    if (this.state.password === this.state.password2) {
      this.setState({
        errors: {}
      });
      this.props.registeruser(newUser, this.props.history);
    }
  };
  render() {
    const { name, email, password, password2, errors } = this.state;
    return (
      <React.Fragment>
        <div className="app-form">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto ">
                <h2 className="text-center mb-0">Register</h2>
                <p className="lead text-center mb-4">Create your account.</p>
                <form className="" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <InputField
                      type="text"
                      className={
                        errors.type === "name"
                          ? "is-invalid form-control"
                          : "form-control"
                      }
                      placeholder="Enter your name"
                      name="name"
                      value={name}
                      onChange={this.handleChange}
                    />
                    <span className="invalid-feedback">{errors.msg}</span>
                  </div>
                  <div className="form-group">
                    <InputField
                      type="email"
                      className={
                        errors.type === "email"
                          ? "is-invalid form-control"
                          : "form-control"
                      }
                      placeholder="Enter your email"
                      name="email"
                      value={email}
                      onChange={this.handleChange}
                    />
                    <span className="invalid-feedback">{errors.msg}</span>
                  </div>
                  <div className="form-group">
                    <InputField
                      type="password"
                      className={
                        errors.type === "password"
                          ? "is-invalid form-control"
                          : "form-control"
                      }
                      placeholder="Enter your password"
                      name="password"
                      value={password}
                      onChange={this.handleChange}
                    />
                    <span className="invalid-feedback">{errors.msg}</span>
                  </div>
                  <div className="form-group">
                    <InputField
                      type="password"
                      className={
                        password !== password2
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      placeholder="Confirm your password"
                      name="password2"
                      value={password2}
                      onChange={this.handleChange}
                    />
                    <span className="invalid-feedback">
                      Password doesn't match.
                    </span>
                  </div>
                  <input
                    type="submit"
                    className="btn btn-primary form-control"
                    value="Register"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
Register.propTypes = {
  registeruser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registeruser }
)(withRouter(Register));
