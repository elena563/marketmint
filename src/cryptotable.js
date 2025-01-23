import React, { useState, useEffect } from 'react';
import './cryptotable.css';

const CryptoTable = () => {
    const [cryptoData, setCryptoData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const requestOptions = {
                method: 'GET',
                redirect: 'follow',
            };
            try{
            const response = await fetch(
                'https://api.coincap.io/v2/assets', requestOptions);
            if (!response.ok) {
                throw new Error('HTTP error! status: $ {response.status');
            }
            
            const result = await response.json();
            const formattedData = result.data.map(entry => ({
                        symbol: entry.symbol,
                        price: parseFloat(entry.priceUsd).toFixed(2),
                        changePercent: parseFloat(entry.changePercent24Hr).toFixed(2),
                        marketCap: formatNumber(entry.marketCapUsd),
                        volume24h: formatNumber(entry.volumeUsd24Hr),
                    }))

                setCryptoData(formattedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    },[]);

    const formatNumber = (number) => {
        if (!number) return 'NA' ;
        const num = parseFloat(number);
        if (num >=1e9) return `${(num / 1e9).toFixed(2)} B`;
        if (num >=1e6) return `${(num / 1e6).toFixed(2)} M`;
        if (num < 1e6) return `${num.toFixed(1)}`
        return num.toLocaleString();
    }

    return (
        <div>
            <h2>Top Cryptocurrencies 24h</h2>
            <table>
                <thead>
                    <tr>
                        <th style={{ textAlign: 'left' }}>Coin</th>
                        <th style={{ textAlign: 'right' }}>Price</th>
                        <th style={{ textAlign: 'right' }}>Change</th>
                        <th style={{ textAlign: 'right' }}>MarketCap</th>
                        <th style={{ textAlign: 'right' }}>Volume</th>
                    </tr>
                </thead>
                <tbody>
                    {cryptoData.slice(0, 22).map((crypto, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'row-dark' : 'row-light'}>
                            <td style={{ textAlign: 'left' }}>{crypto.symbol}</td>
                            <td style={{ textAlign: 'right' }}>${crypto.price}</td>
                            <td style={{ textAlign: 'right' }}>{crypto.changePercent}%</td>
                            <td style={{ textAlign: 'right' }}>{crypto.marketCap}</td>
                            <td style={{ textAlign: 'right' }}>{crypto.volume24h}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CryptoTable