import React, { Component } from "react";

export default class ProfileCreds extends Component {
  render() {
    const { education, exprience } = this.props;
    const expItems = exprience.map(exp => (
      <li key={exp._id} className="list-group-item bg-secondary">
        <h4>{exp.company}</h4>
        <p>{exp.from}</p>
        <p>{exp.to === null ? "Current" : exp.to}</p>
        <p>
          <b>{exp.title}</b>
        </p>
        <p>
          {exp.location === "" ? null : <span>location: {exp.location}</span>}
          {exp.description === "" ? null : (
            <span>description: {exp.description}</span>
          )}
        </p>
      </li>
    ));
    const eduItems = education.map(edu => (
      <li key={edu._id} className="list-group-item bg-secondary">
        <h4>{edu.school}</h4>
        <p>{edu.from}</p>
        <p>{edu.to === null ? "Current" : edu.to}</p>
        <p>
          <b>{edu.degree}</b>
        </p>
        <p>
          {edu.field === "" ? null : <span>field: {edu.field}</span>}
          {edu.description === "" ? null : (
            <span>description: {edu.description}</span>
          )}
        </p>
      </li>
    ));
    return (
      <React.Fragment>
        <div className="container">
          <div className="row mt-4">
            <div className="col-md-6">
              <h3 className="text-info">Exprience</h3>
              {expItems.length > 0 ? (
                <ul className="list-group">{expItems}</ul>
              ) : null}
            </div>
            <div className="col-md-6">
              <h3 className="text-info">Education</h3>
              {eduItems.length > 0 ? (
                <ul className="list-group">{eduItems}</ul>
              ) : null}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
