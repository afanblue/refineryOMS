import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import OMS from './oms';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<OMS />, document.getElementById('root'));
registerServiceWorker();
