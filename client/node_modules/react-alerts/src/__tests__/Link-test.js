jest.dontMock('../Link');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Alert = require('../Alert');
const Link = require('../Link');

describe('Link', () => {

  it('rendered with correct className', () => {
    const Div = React.createClass({
      render() {
        return (
          <Link>
            Hello, world!
          </Link>
        );
      }
    });
    const div = TestUtils.renderIntoDocument(<Div />);

    // Will raise error if no <a> is found
    TestUtils.findRenderedDOMComponentWithTag(
      div,
      'a'
    );

  });

});