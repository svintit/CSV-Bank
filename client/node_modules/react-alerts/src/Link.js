import React from 'react';
import classNames from 'classnames';

const Link = React.createClass({

  propTypes: {
    children: React.PropTypes.node,
    className: React.PropTypes.string
  },

  render() {
    const { children, className, ...others } = this.props;
    return (
      <a {...others} className={classNames(className, 'Alert-link')}>
        {children}
      </a>
    );
  }

});

export default Link;