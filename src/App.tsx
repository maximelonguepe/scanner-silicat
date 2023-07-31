import React from 'react';
import logo from './logo.svg';
import './App.css';
import Generatecodebarre from "./generatecodebarre";
import NavbarApp from "./NavbarApp";
function App() {
    return (

        <div className="App">
            <NavbarApp></NavbarApp>
            <Generatecodebarre></Generatecodebarre>
        </div>
    );
}

export default App;
