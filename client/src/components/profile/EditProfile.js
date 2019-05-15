import React, { Component } from "react";
import { connect } from "react-redux";
import InputField from "../auth/InputField";
import SocialField from "./SocialField";
import { createprofile, getprofile } from "../../actions/profileActions";
import { withRouter } from "react-router-dom";
import isEmpty from "../../utils/isempty";
class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialField: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      bio: "",
      githubusername: "",
      status: "",
      skills: "",
      youtube: "",
      facebook: "",
      twitter: "",
      linkedin: "",
      behance: "",
      instagram: "",
      errors: {}
    };
  }
  componentDidMount() {
    this.props.getprofile();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
    // Check Profile
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      const skills = profile.skills.join(",");
      // if empty field make empty string
      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.facebook = !isEmpty(profile.facebook) ? profile.facebook : "";
      profile.twitter = !isEmpty(profile.twitter) ? profile.twitter : "";
      profile.youtube = !isEmpty(profile.youtube) ? profile.youtube : "";
      profile.linkedin = !isEmpty(profile.linkedin) ? profile.linkedin : "";
      profile.behance = !isEmpty(profile.behance) ? profile.behance : "";
      profile.instagram = !isEmpty(profile.instagram) ? profile.instagram : "";
      const {
        handle,
        company,
        website,
        location,
        bio,
        githubusername,
        status,
        youtube,
        facebook,
        twitter,
        linkedin,
        behance,
        instagram
      } = profile;
      this.setState({
        handle,
        company,
        website,
        location,
        bio,
        githubusername,
        status,
        skills,
        youtube,
        facebook,
        twitter,
        linkedin,
        behance,
        instagram
      });
    }
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      bio: this.state.bio,
      githubusername: this.state.githubusername,
      status: this.state.status,
      skills: this.state.skills,
      youtube: this.state.youtube,
      facebook: this.state.facebook,
      twitter: this.state.twitter,
      linkedin: this.state.linkedin,
      behance: this.state.behance,
      instagram: this.state.instagram
    };
    this.props.createprofile(profileData, this.props.history);
  };
  handleDisplaySocial = e => {
    e.preventDefault();
    this.setState({
      displaySocialField: !this.state.displaySocialField
    });
  };
  render() {
    const {
      handle,
      company,
      website,
      location,
      bio,
      githubusername,
      status,
      skills,
      youtube,
      facebook,
      twitter,
      linkedin,
      behance,
      instagram,
      errors
    } = this.state;
    const options = [
      { label: "* Select your status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Instructor or Teacher", value: "Instructor or Teacher" },
      { label: "Intern", value: "Intern" },
      { label: "Graphic Designer", value: "Graphic Designer" },
      { label: "Other", value: "Other" }
    ];
    return (
      <React.Fragment>
        <div className="app-form">
          <div className="container ">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h3 className="text-centre mt-5">Edit Profile</h3>
                <p className="text-lead text-centre">
                  You can edit your profile @{handle}.
                </p>
                <form onSubmit={this.handleSubmit} className="mt-4">
                  <div className="form-group">
                    <InputField
                      type="text"
                      className={
                        errors.type === "company"
                          ? "is-invalid form-control"
                          : "form-control"
                      }
                      placeholder="Company"
                      name="company"
                      value={company}
                      onChange={this.handleChange}
                    />
                    <span className="invalid-feedback">{errors.msg}</span>
                  </div>
                  <div className="form-group">
                    <InputField
                      type="text"
                      className={
                        errors.type === "website"
                          ? "is-invalid form-control"
                          : "form-control"
                      }
                      placeholder="Website"
                      name="website"
                      value={website}
                      onChange={this.handleChange}
                    />
                    <span className="invalid-feedback">{errors.msg}</span>
                  </div>
                  <div className="form-group">
                    <InputField
                      type="text"
                      className={
                        errors.type === "location"
                          ? "is-invalid form-control"
                          : "form-control"
                      }
                      placeholder="Location"
                      name="location"
                      value={location}
                      onChange={this.handleChange}
                    />
                    <span className="invalid-feedback">{errors.msg}</span>
                  </div>
                  <div className="form-group">
                    <textarea
                      type="textarea"
                      className={
                        errors.type === "bio"
                          ? "is-invalid form-control"
                          : "form-control"
                      }
                      placeholder="Enter your bio"
                      name="bio"
                      value={bio}
                      onChange={this.handleChange}
                    />
                    <span className="invalid-feedback">{errors.msg}</span>
                  </div>
                  <div className="form-group">
                    <InputField
                      type="text"
                      className={
                        errors.type === "githubusername"
                          ? "is-invalid form-control"
                          : "form-control"
                      }
                      placeholder="Github username"
                      name="githubusername"
                      value={githubusername}
                      onChange={this.handleChange}
                    />
                    <small className="form-text text-muted">
                      Only add your uesrname. no @
                    </small>
                    <span className="invalid-feedback">{errors.msg}</span>
                  </div>
                  <div className="form-group">
                    <span className="form-text-lg">*</span>
                    <select
                      className={
                        errors.type === "status"
                          ? "is-invalid form-control"
                          : "form-control"
                      }
                      name="status"
                      onChange={this.handleChange}
                      value={status}
                    >
                      {options.map(item => (
                        <option
                          label={item.label}
                          value={item.value}
                          key={item.value}
                        >
                          {status}
                        </option>
                      ))}
                    </select>
                    <span className="invalid-feedback">{errors.msg}</span>
                    <small className="form-text text-muted">
                      Where are you at your carrer.
                    </small>
                  </div>
                  <div className="form-group">
                    <InputField
                      type="text"
                      className={
                        errors.type === "skills"
                          ? "is-invalid form-control"
                          : "form-control"
                      }
                      placeholder="Skills"
                      name="skills"
                      value={skills}
                      onChange={this.handleChange}
                    />
                    <small className="form-text text-muted">
                      Enter comma sepreated skills. eg: js,css...
                    </small>
                    <span className="invalid-feedback">{errors.msg}</span>
                  </div>
                  <div className="form-group">
                    <button
                      onClick={this.handleDisplaySocial}
                      className="btn btn-light btn-sm"
                    >
                      {this.state.displaySocialField === true
                        ? "Skip Later"
                        : "Add Social Network"}
                    </button>
                    <small className="form-text text-muted">Optional</small>
                  </div>
                  {this.state.displaySocialField && (
                    <div>
                      <SocialField
                        name="facebook"
                        onChange={this.handleChange}
                        errors={errors}
                        value={facebook}
                      />
                      <SocialField
                        name="twitter"
                        onChange={this.handleChange}
                        errors={errors}
                        value={twitter}
                      />
                      <SocialField
                        name="behance"
                        onChange={this.handleChange}
                        errors={errors}
                        value={behance}
                      />
                      <SocialField
                        name="youtube"
                        onChange={this.handleChange}
                        errors={errors}
                        value={youtube}
                      />
                      <SocialField
                        name="instagram"
                        onChange={this.handleChange}
                        errors={errors}
                        value={instagram}
                      />
                      <SocialField
                        name="linkedin"
                        onChange={this.handleChange}
                        errors={errors}
                        value={linkedin}
                      />
                    </div>
                  )}
                  <input
                    type="submit"
                    className="btn btn-primary d-flex justify-content-center w-100"
                    value="Edit Profile"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  {
    createprofile,
    getprofile
  }
)(withRouter(CreateProfile));
