/**
 * React renderer.
 */
// Import the styles here to process them with webpack
import '_public/style.css';

import App from '_renderer/App';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
