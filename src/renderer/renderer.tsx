/**
 * React renderer.
 */
// Import the styles here to process them with webpack
import '_public/style.css';

import App from '_renderer/App.js';
import * as React from 'react';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('app');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(<App />);
