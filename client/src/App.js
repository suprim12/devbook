import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Components
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Landing from "./components/layouts/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <Header />
          <main className="app-main">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </Switch>
          </main>
          <Footer />
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
