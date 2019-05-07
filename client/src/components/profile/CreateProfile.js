import React, { Component } from "react";
import { connect } from "react-redux";
import InputField from "../auth/InputField";
import SocialField from "./SocialField";
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
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
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
                <h3 className="text-centre mt-5">Create Profile</h3>
                <p className="text-lead text-centre">You need profile.</p>
                <small className="d-block pb-5">* are required fields</small>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <span className="form-text-lg">*</span>
                    <InputField
                      type="text"
                      name="handle"
                      className={
                        errors.type === "handle"
                          ? "is-invalid form-control"
                          : "form-control"
                      }
                      value={handle}
                      onChange={this.handleChange}
                      placeholder="Enter a unique handle name."
                      required
                    />
                    <small className="form-text text-muted">
                      You must have unique name for you.
                    </small>
                    <span className="invalid-feedback">{errors.msg}</span>
                  </div>
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
                    <select className="form-control">
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
                    value="Create Profile"
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
export default connect(mapStateToProps)(CreateProfile);
