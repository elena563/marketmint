import React, { useState, useEffect } from 'react';
import './card.css';

const CryptoCard = ({ selectedCrypto }) => {
    const [cryptoData, setCryptoData] = useState(null); // Stato per un singolo oggetto

    useEffect(() => {
        const fetchData = async () => {
            const requestOptions = {
                method: 'GET',
                redirect: 'follow',
            };
            try {
                const response = await fetch(
                    `https://api.coincap.io/v2/assets/${selectedCrypto}`,
                    requestOptions
                );
                if (!response.ok) {
                    console.error('Response status:', response.status, response.statusText);
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                const entry = result.data; // Singolo oggetto
                const formattedData = {
                    symbol: entry.symbol,
                    price: parseFloat(entry.priceUsd).toFixed(2),
                    changePercent: parseFloat(entry.changePercent24Hr).toFixed(2),
                    marketCap: formatNumber(entry.marketCapUsd),
                    volume24h: formatNumber(entry.volumeUsd24Hr),
                };

                setCryptoData(formattedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [selectedCrypto]);

    const formatNumber = (number) => {
        if (!number) return 'NA';
        const num = parseFloat(number);
        if (num >= 1e9) return `${(num / 1e9).toFixed(2)} B`;
        if (num >= 1e6) return `${(num / 1e6).toFixed(2)} M`;
        return num.toLocaleString();
    };

    
    
    
    

    return cryptoData ? (
        <div className="crypto-card">
            <div>
            <h2 style={{fontSize: '30px'}}>${cryptoData.price}</h2>
            <p className='change' style={{fontSize: '17px', color: cryptoData.changePercent >= 0 ? 'green' : 'red', backgroundColor: cryptoData.changePercent >= 0 ? '#cefad0' : 'rgba(255, 200, 201, 0.5)'}}>{cryptoData.changePercent}%</p>
            <p className='name'> 
                {selectedCrypto.charAt(0).toUpperCase() + selectedCrypto.slice(1)}</p>
            <p className='symbol'>{cryptoData.symbol}</p>
            </div>
            <div className='flexcard'>
            <p className='p2'>Market Cap: {cryptoData.marketCap}</p>
            <p className='p2'>Vol(24Hr): {cryptoData.volume24h}</p>
            <button className='wbtn'>Add to Watchlist</button>
            <button className='gbtn'>Buy</button>
            </div>
        </div>
    ) : (
        <p>Loading...</p>
    );
};

export default CryptoCard;
