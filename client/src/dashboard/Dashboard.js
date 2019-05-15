import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getprofile, deleteAccount } from "../actions/profileActions";
import Spinner from "../components/layouts/Spinner";
import { Link } from "react-router-dom";
import ProfileTabs from "./ProfileTabs";
// Components
import Education from "./Education/Education";
import Exprience from "./Experience/Exprience";
class Dashboard extends Component {
  componentDidMount() {
    this.props.getprofile();
  }
  handleDeleteAccount = e => {
    e.preventDefault();
    this.props.deleteAccount();
  };
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    // Dashboard
    let dashboardContent;
    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome
              <Link to={`/profile/${profile.handle}`}> {user.name} </Link>
            </p>
            <ProfileTabs />
            <Exprience exprience={profile.exprience} />
            <Education education={profile.education} />
            <button
              type="button"
              className="btn btn-danger d-block mt-5"
              onClick={this.handleDeleteAccount}
            >
              Delete my account
            </button>
          </div>
        );
      } else {
        // User logged but no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>Please Create Profile.</p>
            <Link to="/create-profile" className="btn btn-primary mt-5">
              Create Profile
            </Link>
          </div>
        );
      }
    }
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-md-12 mt-5">
              <h2 className="mb-2">Dashboard</h2>
              {dashboardContent}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
Dashboard.propTypes = {
  getprofile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getprofile, deleteAccount }
)(Dashboard);
