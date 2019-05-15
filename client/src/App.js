import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
// Components
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Landing from "./components/layouts/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./dashboard/Dashboard";
import CreateProfile from "./components/profile/CreateProfile";
import EditProfile from "./components/profile/EditProfile";
import AddExperience from "./components/Credentials/AddExperience";
import AddEducation from "./components/Credentials/AddEducation";
// Actions
import { setCurrentUser, logoutuser } from "./actions/authActions";
import { clearprofile } from "./actions/profileActions";
import Profiles from "./profile/Profiles";
import ProfileDetail from "./profile/ProfileDetail";
import NotFound from "./components/layouts/NotFound";

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
    store.dispatch(clearprofile());
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
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
                <Route path="/profiles" component={Profiles} />
                <Route path="/profile/:handle" component={ProfileDetail} />
                <Route path="/not-found" component={NotFound} />
                <Redirect to="/not-found" />
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
