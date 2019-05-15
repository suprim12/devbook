import React, { Component } from "react";
import ProfileHeader from "./layouts/ProfileHeader";
import ProfileCreds from "./layouts/ProfileCreds";
import Spinner from "../components/layouts/Spinner";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProfileByHandle } from "../actions/profileActions";
import ProfileGithub from "./layouts/ProfileGithub";
class ProfileDetail extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null) {
      this.props.history.push("/not-found");
    }
  }
  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;
    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <Link
                to="/profiles"
                className="btn btn-light btn-sm mb-3 mt-4 mb-5"
              >
                Back to Profiles
              </Link>
            </div>
            <ProfileHeader profile={profile} />
            <ProfileCreds
              education={profile.education}
              exprience={profile.exprience}
            />
            {profile.githubusername ? (
              <ProfileGithub username={profile.githubusername} />
            ) : null}
          </div>
        </div>
      );
    }

    return <div className="profile">{profileContent}</div>;
  }
}
const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(ProfileDetail);
