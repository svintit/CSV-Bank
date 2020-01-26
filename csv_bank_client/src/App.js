import React, { Component } from 'react';
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
          <div className="animated bounceInDown main-title">
            <h1>CSV BANK</h1>
          </div>
        <div>

        </div>
      </div>
    );
  }
}

export default App;
