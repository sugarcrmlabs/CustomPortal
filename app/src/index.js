import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import App from './components/App';
import Interceptor from './interceptor';

import './css/bootstrap.min.css';
import './css/bootstrap-theme.min.css';
import './css/styles.css';

Interceptor.setupInterceptors();

render((
    <BrowserRouter basename="/">
        <App />
    </BrowserRouter>
), document.getElementById('app'));