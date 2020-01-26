var Alert = require('../../dist/react-alerts');
var React = require('react');
var ReactDOM = require('react-dom');

var App = React.createClass({

  getInitialState() {
    return {
      showWarning: true
    };
  },

  render() {
    return (
      <div className="react-alerts-demo">
        <h3>react-alerts</h3>

        <Alert>
          Info style
        </Alert>

        <Alert alertStyle="success">
          Success style
        </Alert>

        {this.state.showWarning &&
          <Alert
            alertStyle="warning"
            dismissible
            onRequestDismiss={this._dismissWarning}
          >
            Warning style and dismissible!
          </Alert>
        }

        <Alert alertStyle="danger">
          Danger style!
        </Alert>

        <Alert
          alertStyle="info"
          style={{
            maxWidth: 200,
            position: 'absolute',
            top: 25,
            right: 25,
            zIndex: 999
          }}
        >
          Easily make "growls"!
        </Alert>

      </div>
    );
  },

  _dismissWarning() {
    this.setState({showWarning: false});
  }

});

ReactDOM.render(<App />, document.getElementById('app'));