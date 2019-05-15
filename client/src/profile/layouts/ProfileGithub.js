import React, { Component } from "react";
class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "9f1f914cca728773bade",
      clientSecret: "6a076f489a50090d71a318ab8e634ba10216d97b",
      count: 5,
      sort: "created:desc",
      repos: []
    };
  }
  componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;
    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data =>
        this.setState({
          repos: data
        })
      )
      .catch(err => console.error(err));
  }
  render() {
    const { repos } = this.state;
    const repoItems = repos.map(repo => (
      <div key={repo.id} className="card card-body mb-2 bg-dark text-white">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <a
                href={repo.html_url}
                className="text-info"
                target="_blank"
                rel="noopener noreferrer"
              >
                {repo.name.toUpperCase()}
              </a>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-primary badge-pill mr-2">
              Stars: {repo.stargazers_count}
            </span>
            <span className="badge badge-primary badge-pill mr-2">
              Watchers: {repo.watchers_count}
            </span>
            <span className="badge badge-success badge-pill mr-2">
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ));
    return (
      <div className="container mt-4">
        <h4 className="text-info">Github Repos:</h4>
        {repoItems}
      </div>
    );
  }
}

export default ProfileGithub;
