jest.dontMock('../Alert');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Alert = require('../Alert');

describe('Alert', () => {

  it('dismissed after click', () => {

    let dismissed = false;

    function dismiss() {
      dismissed = true;
    }

    // Render an <Alert> in the document
    const alert = TestUtils.renderIntoDocument(
      <Alert dismissible={true} onRequestDismiss={dismiss}>
        Hello, world!
      </Alert>
    );

    const alertNode = ReactDOM.findDOMNode(alert);

    // Verify that content rendered correctly
    expect(alertNode.textContent).toEqual('×Hello, world!');

    // Ensure "dismissed" is `false`
    expect(dismissed).toEqual(false);

    // Simulate a click and verify that it is now "dismissed"
    TestUtils.Simulate.click(
      TestUtils.findRenderedDOMComponentWithTag(alert, 'button')
    );

    expect(dismissed).toEqual(true);
  });

});