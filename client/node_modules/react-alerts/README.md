# react-alerts

A simple react component for displaying Alert banners.

This project is heavily inspired by [Bootstrap 3.x Alert component](http://getbootstrap.com/components/#alerts). The inspiration for this project began when I felt that it was time to wean myself off of being dependant on bootstrap and [jQuery](https://jquery.com/).

## Installation

The easiest way to use react-alerts is to install it from NPM and include it in yoru React build process (using [Webpack](https://webpack.github.io/), etc).

```bash
npm install react-alerts --save
```

You can also use the standalone build by including `dist/react-alerts.js` and `dist/react-alerts.css` in your page. If you do this, make sure you already included the following dependencies:

* [React](http://facebook.github.io/react/)
* [classNames](http://jedwatson.github.io/classnames/)

## Usage

```js
var React = require('react');
var ReactAlerts = require('react-alerts');
var ReactDOM = require('react-dom');

<Alert alertStyle="info">
  <strong>Well done!</strong> You just created a simple alert banner!
</Alert>
```

## CSS stylesheet

I've built a default stylesheet, `dist/react-alerts.css`, that you may include in your sites/projects. 

You can customize the styles by modifying the stylesheet itself or by using [less](http://lesscss.org/) and modifying the less files in the `/less` directory.

## Examples

* [Basic Usage][1]

[1]: http://dennisduong.github.io/react-alerts/examples/