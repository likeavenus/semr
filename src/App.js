import React from 'react';
import './App.scss';
import Header from "./components/Header/Header";
import CreateBox from './components/CreateBox/CreateBox';
import Section from "./components/Section/Section";

function App() {
  return (
    <div className="App">
        <Header/>
        <CreateBox/>
        <Section/>
    </div>
  );
}

export default App;
