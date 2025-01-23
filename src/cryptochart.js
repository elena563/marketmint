import React, { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js/auto';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

/*memorizzare i dati del grafico*/
const CryptoChart = ({ selectedCrypto, selectedInterval }) => {
    const [chartData, setChartData] = useState({labels:[], datasets:[]});
    const chartInstance = useRef(null);
    const chartRef = useRef(null);

    /*Prendiamo i dati con fetch*/
    useEffect(() => {
        const fetchData = async () => {
            const requestOptions = {
                method: 'GET',
                redirect: 'follow',
            };
            try{
            const response = await fetch(
                `https://api.coincap.io/v2/assets/${selectedCrypto}/history?interval=${selectedInterval}`, requestOptions
            );
            if (!response.ok) {
                throw new Error('HTTP error! status: $ {response.status');
            }
            const result = await response.json();
            console.log('Fetched result:', result);
            
            /*date*/
            const labels = [];
            const data = [];
            for (let i = 0; i < result.data.length; i++) {
                labels.push(new Date(result.data[i].time).toLocaleDateString());
                data.push(parseFloat(result.data[i].priceUsd)); // Estrai ogni valore di prezzo
            }
            setChartData({
                labels: labels,
                datasets: [{
                    label: `${selectedCrypto.charAt(0).toUpperCase() + selectedCrypto.slice(1)} Price (USD)`, 
                    data: data, 
                    borderColor: '#EF8E19', 
                    borderWidth: 2,
                    tension: 1, 
                    pointRadius: 0.1,
                    pointBackgroundColor: '#EF8E19',
                    fill: true,
                    backgroundColor: 'rgba(239, 142, 25,0.2)',
                    
                }]});
            } catch (error) {console.error('Error fetching data:', error);
        }
    };
    if ( selectedInterval) { 
        fetchData();
      }
    }, [selectedCrypto, selectedInterval]);

 

    useEffect(() => {
        if (chartData.labels.length > 0 && chartRef.current) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new ChartJS(ctx, {
                type: 'line',
                data: chartData,
                options: { 
                    responsive: true, 
                    maintainAspectRatio: false, 
                    plugins: {
                        legend: {display: false,},
                        datalabels: false,
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false, 
                            },
                            ticks: {
                                maxTicksLimit: 8,
                                autoSkip: true,
                            },
                        },
                    },
                },
            });
        }
        return () => {
            if (chartInstance.current){
                chartInstance.current.destroy()
            }
        };
    }, [chartData]);

    return (
        <div>
            
            <canvas style={{width: '100%', minHeight: '200px'}} ref={chartRef} />
        </div>
    );
};
export default CryptoChart;