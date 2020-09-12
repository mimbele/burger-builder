import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App appTitle="Hi! I'm a react app"/>, document.getElementById('root'));
registerServiceWorker();
