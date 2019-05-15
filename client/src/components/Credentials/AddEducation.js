import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import InputField from "../auth/InputField";
import { connect } from "react-redux";
import { addEducation } from "../../actions/profileActions";
class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: "",
      degree: "",
      field: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      disable: false
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleCurrent = e => {
    this.setState({
      disable: !this.state.disable,
      current: !this.state.current
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const data = {
      school: this.state.school,
      degree: this.state.degree,
      field: this.state.field,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };
    this.props.addEducation(data, this.props.history);
  };
  render() {
    const {
      school,
      degree,
      field,
      from,
      to,
      current,
      description,
      disable,
      errors
    } = this.state;
    return (
      <React.Fragment>
        <div className="app-form">
          <div className="container ">
            <div className="row">
              <div className="col-md-8 m-auto">
                <Link to="/dashboard" className="btn btn-light btn-sm mt-5">
                  Go back
                </Link>
                <h3 className="text-centre mt-5">Add Education</h3>
                <form onSubmit={this.handleSubmit} className="mt-4">
                  <div className="form-group">
                    <InputField
                      type="text"
                      className={
                        errors.type === "school"
                          ? "is-invalid form-control"
                          : "form-control"
                      }
                      placeholder="School"
                      name="school"
                      value={school}
                      onChange={this.handleChange}
                    />
                    <span className="invalid-feedback">{errors.msg}</span>
                  </div>
                  <div className="form-group">
                    <InputField
                      type="text"
                      className={
                        errors.type === "degree"
                          ? "is-invalid form-control"
                          : "form-control"
                      }
                      placeholder="degree"
                      name="degree"
                      value={degree}
                      onChange={this.handleChange}
                    />
                    <span className="invalid-feedback">{errors.msg}</span>
                  </div>
                  <div className="form-group">
                    <InputField
                      type="text"
                      className={
                        errors.type === "field"
                          ? "is-invalid form-control"
                          : "form-control"
                      }
                      placeholder="field"
                      name="field"
                      value={field}
                      onChange={this.handleChange}
                    />
                    <span className="invalid-feedback">{errors.msg}</span>
                  </div>
                  <div className="form-group">
                    <div className="form-row">
                      <div className="col">
                        <h5>From Date</h5>
                        <InputField
                          type="date"
                          className={
                            errors.type === "from"
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          placeholder="from "
                          name="from"
                          value={from}
                          onChange={this.handleChange}
                        />
                        <span className="invalid-feedback">{errors.msg}</span>
                      </div>
                      <div className="col">
                        <h5>To Date</h5>
                        <InputField
                          type="date"
                          className={
                            errors.type === "to"
                              ? "is-invalid form-control"
                              : "form-control"
                          }
                          placeholder="To"
                          name="to"
                          value={to}
                          onChange={this.handleChange}
                          disabled={disable ? "disabled" : ""}
                        />
                        <span className="invalid-feedback">{errors.msg}</span>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <input
                      type="checkbox"
                      name="current"
                      value={current}
                      onChange={this.handleCurrent}
                      checked={current}
                      id="current"
                    />
                    <label htmlFor="current" className="ml-2">
                      Current Job
                    </label>
                  </div>
                  <div className="form-group">
                    <textarea
                      type="textarea"
                      className={
                        errors.type === "description"
                          ? "is-invalid form-control"
                          : "form-control"
                      }
                      placeholder="Enter job description."
                      name="description"
                      value={description}
                      onChange={this.handleChange}
                    />
                    <span className="invalid-feedback">{errors.msg}</span>
                  </div>
                  <input
                    type="submit"
                    className="btn btn-primary d-flex justify-content-center w-100"
                    value="Add Education"
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
  { addEducation }
)(withRouter(AddEducation));
