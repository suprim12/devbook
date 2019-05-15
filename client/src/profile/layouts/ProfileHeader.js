import React, { Component } from "react";
import isEmpty from "../../utils/isempty";
class ProfileHeader extends Component {
  render() {
    const {
      user,
      status,
      company,
      location,
      social,
      bio,
      skills
    } = this.props.profile;
    return (
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-2">
            <img src={user.avatar} alt={user.name} />
          </div>
          <div className="col-md-10">
            <h4>{user.name}</h4>
            <p className="lead">
              {status} at {isEmpty(company) ? null : <span>{company}</span>}
            </p>
            {!isEmpty(location) ? <span>location at {location}</span> : null}
            {!isEmpty(bio) ? <p>Bio: {bio}</p> : null}
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-6">
            <h4 className="text-info">Social Links</h4>
            <ul className="list-group">
              {isEmpty(social && social.facebook) ? null : (
                <li className="list-group-item bg-secondary ">
                  <a
                    className="text-white"
                    href={social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                </li>
              )}
              {isEmpty(social && social.twitter) ? null : (
                <li className="list-group-item bg-secondary ">
                  <a
                    className="text-white"
                    href={social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Twitter
                  </a>
                </li>
              )}
              {isEmpty(social && social.linkedin) ? null : (
                <li className="list-group-item bg-secondary ">
                  <a
                    className="text-white"
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Linkedin
                  </a>
                </li>
              )}
              {isEmpty(social && social.youtube) ? null : (
                <li className="list-group-item bg-secondary ">
                  <a
                    className="text-white"
                    href={social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Youtube
                  </a>
                </li>
              )}
            </ul>
          </div>
          <div className="col-md-6">
            <h4 className="text-info">Skills</h4>
            <ul className="list-group">
              {skills.map((sk, index) => (
                <li key={index} className="list-group-item bg-secondary">
                  {sk.toUpperCase()}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
