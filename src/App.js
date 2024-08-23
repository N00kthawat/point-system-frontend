import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './components/Login.css';
import './components/Home.css';
import './components/Detail.css';

import Login from './components/Login';
import Home from './components/Home';
import Detail from './components/Detail';

const App = () => {
    return (
        <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home/:userId" element={<Home />} />
                    <Route path="/detail/:userId/:id" element={<Detail />} />
                </Routes>
        </Router>
    );
};

export default App;
