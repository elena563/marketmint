import React, { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
    const [chartData, setChartData] = useState(null);
    const chartRef = useRef(null);

    useEffect(() => {
        // Dati creati artificialmente
        const pieData = {
            labels: ['Bitcoin', 'Ethereum', 'XRP', 'Litecoin'],
            datasets: [{
                data: [60, 20, 10, 10],  //percentuali
                backgroundColor: ['#1CA37B', '#22C594', '#00F4AA', '#71FFCA'],
                borderColor: ['#1CA37B', '#22C594', '#00F4AA', '#71FFCA'],
                borderWidth: 1,
            }]
        };

        setChartData(pieData);
    }, []);

    useEffect(() => {
        if (chartData && chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            new ChartJS(ctx, {
                type: 'pie',
                data: chartData,
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend:{
                            display: false,
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    const label = context.label || '';
                                    const value = context.raw || 0;
                                    return `${label}: ${value}%`;
                                },
                            },
                        },
                        datalabels: {
                            color: '#fff',
                            font: { size: 14, weight: 'bold' },
                            formatter: (value, context) => {
                                const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${percentage}%`; //calcola percentuali
                            },
                        },
                    },
                },
                plugins: [ChartDataLabels],
            });
        }
    }, [chartData]);

    return (
        <div>
            <h2>Wallet</h2>
                <div className="custom-legend" style={{  marginTop: '20px' }}>
                <div className="legend-item" style={{ marginRight: '20px', display: 'flex', alignItems: 'center' }}>
                <div 
                    style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: '#1CA37B',
                    marginRight: '10px',
                    }}
                />
                <span>Bitcoin</span>
                </div>
                
                <div className="legend-item" style={{ marginRight: '20px', display: 'flex', alignItems: 'center' }}>
                <div 
                    style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: '#22C594',
                    marginRight: '10px',
                    }}
                />
                <span>Ethereum</span>
                </div>
                
                <div className="legend-item" style={{ marginRight: '20px', display: 'flex', alignItems: 'center'}}>
                <div 
                    style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: '#00F4AA',
                    marginRight: '10px',
                    }}
                />
                <span>XRP</span>
                </div>
                
                <div className="legend-item" style={{ marginRight: '20px', display: 'flex', alignItems: 'center'}}>
                <div 
                    style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: '#71FFCA',
                    marginRight: '10px',
                    }}
                />
                <span>Litecoin</span>
            </div>
        </div>
            <canvas ref={chartRef} style={{ padding: '5px', maxHeight: '200px' }}/>
        </div>
    );
};

export default PieChart;
