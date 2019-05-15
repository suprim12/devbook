import React from "react";
import { Link } from "react-router-dom";
const ProfileTabs = () => {
  return (
    <React.Fragment>
      <div className="btn-group mt-4" role="group" aria-label="Basic example">
        <Link as="button" to="/add-education" className="btn btn-secondary">
          Add Education
        </Link>
        <Link as="button" to="/add-experience" className="btn btn-secondary">
          Add Experience
        </Link>
        <Link as="button" to="/edit-profile" className="btn btn-secondary">
          Edit Profile
        </Link>
      </div>
    </React.Fragment>
  );
};

export default ProfileTabs;
