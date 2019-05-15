import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteExprience } from "../../actions/profileActions";
class Exprience extends Component {
  handleDelete = id => {
    this.props.deleteExprience(id);
  };
  render() {
    const { exprience } = this.props;
    return (
      <React.Fragment>
        <h2 className="mt-2 mb-3">Exprience Details</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Date</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {exprience.map(exp => (
              <tr key={exp._id}>
                <td>{exp.company}</td>
                <td>{exp.title}</td>
                <td>
                  {exp.from} - {exp.to === null ? "Current" : exp.to}
                </td>
                <td>
                  <button
                    onClick={this.handleDelete.bind(this, exp._id)}
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
  { deleteExprience }
)(Exprience);
