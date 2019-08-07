import React from 'react';
import logo from './logo.svg';
import './App.css';
import CreateAccount from './components/CreateAccount';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <div className="row">
            <div className="col-xs-2">
              <img src={logo} className="App-logo" alt="logo" />
            </div>
            <div class="col-xs-6">
              Bartering Made Easy - Swipe, Swap, Sweet.
            </div>
          </div>
        </div>
      </header>
      <CreateAccount />
    </div>
  );
}

export default App;
