import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import App from './components/App';
import Interceptor from './interceptor';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

import './css/bootstrap.min.css';
import './css/bootstrap-theme.min.css';
import './css/styles.css';
import 'react-notifications/lib/notifications.css';

Interceptor.setupInterceptors();

library.add(faPen, faTrash);

render((
    <BrowserRouter basename="/">
        <App />
    </BrowserRouter>
), document.getElementById('app'));