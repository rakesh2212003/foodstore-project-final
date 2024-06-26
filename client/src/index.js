import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { BrowserRouter as Router } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import myReducers from './context/reducers'

const myStore = createStore(
    myReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()    
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AnimatePresence>
            <Provider store={ myStore }>
                <Router>
                    <App />
                </Router>
            </Provider>
        </AnimatePresence>
    </React.StrictMode>
);