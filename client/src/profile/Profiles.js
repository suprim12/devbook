import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../components/layouts/Spinner";
import { getProfiles } from "../actions/profileActions";
import ProfileItem from "./ProfileItem";
class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    let profileItems;
    const { profiles, loading } = this.props.profile;
    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <h1>No Porfiles</h1>;
      }
    }
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-md-8 mx-auto">{profileItems}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
