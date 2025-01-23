import React, { useState } from 'react';
import './App.css';
import CryptoChart from './cryptochart';
import CryptoTable from './cryptotable';
import BarChart from './barchart';
import PieChart from './piechart';
import CryptoCard from './card';

function App() {
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin'); // Stato centrale
  

  const handleCryptoChange = (event) => {
    const selectedValue = event.target.value; 
    console.log('Crypto selected:', selectedValue); 
  setSelectedCrypto(selectedValue);
  };
  const [selectedInterval, setSelectedInterval] = useState('d1');
  const handleIntervalChange = (event) => {
    const selectedValuei = event.target.value; 
    console.log('Interval selected:', selectedValuei); 
  setSelectedInterval(selectedValuei);
  };


  return (
    <div className="App">
      <div className='flex'>
        <div className='cont1'>
          <header className="App-header">
            <img src='/images/logo.png'/>
          </header>
          <div>
            <span className='active'><i className="fa-solid fa-border-all"></i> <span className='word'>Dashboard</span></span>
            <span className='inactive'><i className="fa-solid fa-chart-pie"></i> <span className='word'>Market</span></span>
            <span className='inactive'><i className="fa-solid fa-wallet"></i> <span className='word'>Wallet</span></span>
            <span className='inactive'><i className="fa-solid fa-chart-line"></i> <span className='word'>Analytics</span></span>
            <span className='inactive'><i className="fa-solid fa-newspaper"></i> <span className='word'>News</span></span>
            <span className='inactive'><i className="fa-solid fa-gear"></i> <span className='word'>Settings</span></span>
          </div>
        </div>
        <div className='cont2'>
          <h1>Dashboard</h1>
          <div className="crypto-selector">
            <select
              id="crypto-select"
              onChange={handleCryptoChange}
              value={selectedCrypto}
            >
              <option value="bitcoin">Bitcoin</option>
              <option value="ethereum">Ethereum</option>
              <option value="cardano">Cardano</option>
              <option value="dogecoin">Dogecoin</option>
            </select>
            <select
              id="interval-select"
              onChange={handleIntervalChange}
              value={selectedInterval}
            >
                <option value="m1">1 day</option>
                <option value="m15">1 week</option>
                <option value="h1">1 month</option>
                <option value="h6">6 months</option>
                <option value="d1">1 year</option>
            </select>
          </div>
          <div className='flexCont'>
            <div className='flexv'>
              <div className='container card'>
                <CryptoCard selectedCrypto={selectedCrypto}/>
              </div>
                <div className="container graph">
                  <CryptoChart selectedCrypto={selectedCrypto} selectedInterval={selectedInterval}/>
                </div>
                <div className='flexCont2'>
                <div className="container2">
                  <BarChart />
                </div>
                <div className="container2 pie">
                  <PieChart />
                </div>
              </div>
           </div>
           <div className="littlecont">
            <CryptoTable />
          </div>
          </div>
          
        </div>
        </div>
        <footer>
          <p>
            by <a href='https://elenazen.it/'>Elena Zen</a>
          </p>
        </footer>
      </div>
  );
}

export default App;
