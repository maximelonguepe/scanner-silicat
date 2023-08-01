import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Generatecodebarre from "./generatecodebarre";
import NavbarApp from "./NavbarApp";
import ListeObjets from "./ListeObjets";
import DetailObjet from "./DetailObjet";

function App() {
    return (
        <Router>
            <div className="App">
                <NavbarApp></NavbarApp>
                <Routes>
                    <Route path="/" element={<ListeObjets/>}/>
                    <Route path="/generate" element={<Generatecodebarre/>}/>
                    <Route path="/objets" element={<DetailObjet/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
