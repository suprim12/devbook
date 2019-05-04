import React, { Component } from "react";
import { connect } from "react-redux";
import { loginuser } from "../../actions/authActions";
import PropTypes from "prop-types";
import InputField from "./InputField";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticate) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticate) {
      this.props.history.push("/dashboard");
    }
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
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginuser(newUser);
  };
  errorCheck = key => {
    if (
      Object.keys(this.state.errors).length >= 1 &&
      Object.values(this.state.errors) !== null
    ) {
      if (this.state.errors.message) {
        if (this.state.errors.message.indexOf(key) !== -1) {
          return true;
        }
      }
      return false;
    }
  };
  render() {
    const { email, password, errors } = this.state;
    return (
      <React.Fragment>
        <div className="app-form">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto ">
                <h2 className="text-center mb-0">Log In</h2>
                <p className="lead text-center mb-4">Log in your account.</p>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <InputField
                      type="email"
                      className={
                        this.errorCheck("email") || errors.email
                          ? "is-invalid form-control"
                          : "form-control"
                      }
                      placeholder="Enter your email"
                      name="email"
                      value={email}
                      onChange={this.handleChange}
                    />
                    <span className="invalid-feedback">
                      {this.errorCheck("email") ? errors.message : ""}
                      {errors.email ? errors.email : ""}
                    </span>
                  </div>
                  <div className="form-group">
                    <InputField
                      type="password"
                      className={
                        this.errorCheck("password") || errors.password
                          ? "is-invalid form-control"
                          : "form-control"
                      }
                      placeholder="Enter your password"
                      name="password"
                      value={password}
                      onChange={this.handleChange}
                    />
                    <span className="invalid-feedback">
                      {this.errorCheck("password") ? errors.message : ""}
                      {errors.password ? errors.password : ""}
                    </span>
                  </div>
                  <input
                    type="submit"
                    className="btn btn-primary form-control"
                    value="Login"
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
Login.propTypes = {
  loginuser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginuser }
)(Login);
