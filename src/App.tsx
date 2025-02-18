import React from 'react';
import './App.css';
import Routers from './components/Routers';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routers/>
    </div>
  );
}

export default App;
