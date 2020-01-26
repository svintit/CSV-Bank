import React  from 'react';
import classNames from 'classnames';

import Link from './Link';

const Alert = React.createClass({

  statics: { Link },

  propTypes: {
    /**
     * Specify the type of alert style.
     *
     * defaults to "info"
     */
    alertStyle: React.PropTypes.oneOf(['info', 'success', 'warning', 'danger']),

    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,

    /**
     * When `true` allows the user to dismiss the alert. When a user dismisses
     * an alert, the `onDismiss` function will be executed.
     *
     * defaults to `false`
     */
    dismissible: React.PropTypes.bool,

    /**
     * Fires when a user clicks on the dismiss button.
     *
     * @param {SyntheticEvent} event
     */
    onDismissClick: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      alertStyle: 'info',
      className: '',
      dismissible: false
    };
  },

  render() {
    const {
      alertStyle,
      children,
      className,
      dismissible,
      onRequestDismiss,
      ...others
    } = this.props;
    const classes = classNames(className, {
      "Alert": true,
      "Alert-dismissible": dismissible
    }, 'Alert Alert-' + alertStyle);

    return (
      <div {...others} className={classes} role="alert">
        {dismissible &&
          <button
            aria-label="Close"
            className="close"
            onClick={onRequestDismiss}
            type="button"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        }
        {children}
      </div>
    );
  }

});

export default Alert;