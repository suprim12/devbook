import React, { Component } from "react";
import axios from "axios";
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
    if (
      Object.keys(this.state.errors).length >= 1 &&
      this.state.password !== this.state.password2
    ) {
      return false;
    } else {
      axios
        .post("/api/users/register", newUser)
        .then(res =>
          this.setState({
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
          })
        )
        .catch(err =>
          this.setState({
            errors: err.response.data
          })
        );
    }
  };
  errorCheck = key => {
    if (Object.keys(this.state.errors).length >= 1) {
      if (this.state.errors.message.includes(key)) {
        return true;
      }
      return false;
    }
    return false;
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
                        this.errorCheck("name")
                          ? "is-invalid form-control"
                          : "form-control"
                      }
                      placeholder="Enter your name"
                      name="name"
                      value={name}
                      onChange={this.handleChange}
                    />
                    <span className="invalid-feedback">
                      {" "}
                      {this.errorCheck("name") ? errors.message : ""}
                    </span>
                  </div>
                  <div className="form-group">
                    <InputField
                      type="email"
                      className={
                        this.errorCheck("email")
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
                    </span>
                  </div>
                  <div className="form-group">
                    <InputField
                      type="password"
                      className={
                        this.errorCheck("password")
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
                    </span>
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

export default Register;
