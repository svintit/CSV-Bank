import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { CONFIG } from './config.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
        csv_files: []
    };
  }

  componentDidMount() {
    fetch(CONFIG.API_BASE_URL)
        .then(results => results.json())
        .then(csv_files => this.setState({csv_files: csv_files}));
  }

  render() {
    const csv_files = this.state.csv_files.map(
        (csv_file, index) => <li key={index}>{csv_file.lastname} {csv_file.firstname}</li>
    );

    return (
      <div>
          <h1>Csv Files List</h1>
          <ul>
            {csv_files}
          </ul>
      </div>
    );
  }
}

export default App;
