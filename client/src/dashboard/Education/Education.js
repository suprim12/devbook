import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteEducation } from "../../actions/profileActions";
class Education extends Component {
  handleDelete = id => {
    this.props.deleteEducation(id);
  };
  render() {
    const { education } = this.props;
    return (
      <React.Fragment>
        <h2 className="mt-2 mb-3">Education Details</h2>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Field</th>
              <th>Date</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {education.map(edu => (
              <tr key={edu._id}>
                <td>{edu.school}</td>
                <td>{edu.degree}</td>
                <td>{edu.field}</td>
                <td>
                  {edu.from} - {edu.to === null ? "Current" : edu.to}
                </td>
                <td>
                  <button
                    onClick={this.handleDelete.bind(this, edu._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}
export default connect(
  null,
  { deleteEducation }
)(Education);
