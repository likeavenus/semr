import React from 'react';
import './App.scss';
import Header from "./components/Header/Header";
import CreateBox from './components/CreateBox/CreateBox';

function App() {
  return (
    <div className="App">
        <Header/>
        <CreateBox/>
    </div>
  );
}

export default App;
