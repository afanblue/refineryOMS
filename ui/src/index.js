import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import OMS from './oms.js';
import registerServiceWorker from './registerServiceWorker';

if (process.env.NODE_ENV !== 'production') {
  localStorage.setItem('debug', 'oms:*');
}

ReactDOM.render(<OMS />, document.getElementById('root'));
registerServiceWorker();
