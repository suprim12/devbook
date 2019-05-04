import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutuser } from "./actions/authActions";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Components
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Landing from "./components/layouts/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

// Check for token
if (localStorage.jwtToken) {
  // set auth token
  setAuthToken(localStorage.jwtToken);
  //decode token
  const decoded = jwt_decode(localStorage.jwtToken);
  // setCurrent Action
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //logoutuser
    store.dispatch(logoutuser());
    // redirect
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Provider store={store}>
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
        </Provider>
      </React.Fragment>
    );
  }
}

export default App;
