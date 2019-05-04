import React, { Component } from "react";
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
    console.log(newUser);
  };
  render() {
    const { email, password } = this.state;
    return (
      <React.Fragment>
        <div className="app-form">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto ">
                <h2 className="text-center mb-0">Log In</h2>
                <p className="lead text-center mb-4">Log in your account.</p>
                <form>
                  <div className="form-group">
                    <InputField
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                      name="email"
                      value={email}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <InputField
                      type="password"
                      className="form-control"
                      placeholder="Enter your password"
                      name="password"
                      value={password}
                      onChange={this.handleChange}
                      required
                    />
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

export default Login;
