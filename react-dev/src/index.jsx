import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
    HashRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Info from "./pages/Info";
import axios from "axios";

axios.defaults.baseURL = "https://ark-box-backend.vercel.app"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="info" element={<Info />}/>
            </Route>
        </Routes>
    </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
