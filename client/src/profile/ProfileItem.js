import React, { Component } from "react";
import isEmpty from "../utils/isempty";
import { Link } from "react-router-dom";
class ProfileItem extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="card card-body text-white bg-dark mb-3 mt-4">
        <div className="row">
          <div className="col-md-2">
            <img src={profile.user.avatar} alt={profile.user.name} />
          </div>
          <div className="col-md-6">
            <h3 className="card-title">{profile.user.name}</h3>
            <p className="card-text">
              {profile.status}
              {isEmpty(profile.company) ? null : (
                <span> at {profile.company}</span>
              )}
            </p>
            <p className="card-text">
              {isEmpty(profile.location) ? null : (
                <span> at {profile.location}</span>
              )}
            </p>
            <Link
              to={`/profile/${profile.handle}`}
              className="btn btn-primary btn-sm mt-2"
            >
              View Profile
            </Link>
          </div>
          <div className="col-md-4 d-none d-md-block">
            <h5 className="card-text text-lead">Skills</h5>
            <ul className="list-group list-group-flush ">
              {profile.skills.slice(0, 4).map((skill, index) => (
                <li className="list-group-item bg-secondary" key={index}>
                  {skill.toUpperCase()}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileItem;
