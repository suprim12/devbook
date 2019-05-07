import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getprofile } from "../actions/profileActions";
import Spinner from "../components/layouts/Spinner";
import { Link } from "react-router-dom";
class Dashboard extends Component {
  componentDidMount() {
    this.props.getprofile();
  }
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
        dashboardContent = <h4>You Have Profile</h4>;
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
  { getprofile }
)(Dashboard);
