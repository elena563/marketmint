import React, { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js/auto';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

/*memorizzare i dati del grafico*/
const BarChart = () => { 
    const [chartData, setChartData] = useState(null);
    const chartRef = useRef(null);

    /*Prendiamo i dati con fetch*/
    useEffect(() => {
        const barData = {
            labels: 
            ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Balance (USD)', 
                data: [136.21, 32.73, 66.36, -45.13, 250.56, 114.97, -39.5, -101.72, 6.59, 70.93, 287.29, 52.13], 
                borderColor: '#00F4AA', 
                borderWidth: 1,
                backgroundColor: '#00F4AA',
                barPercentage: 1,
                categoryPercentage: 0.8,
            }]
        };
            setChartData(barData);
            } , []);

 

    useEffect(() => {
        if (chartData && chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
             new ChartJS(ctx, {
                type: 'bar',
                data: chartData,
                options: { 
                    indexAxis: 'y',
                    responsive: true, 
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {display: false,},
                        datalabels: false,
                    },
                    scales: {
                        y: {
                            grid: {
                                display: false, 
                            },
                            barPercentage: 1,
                            categoryPercentage: 1,
                        },
                        x: {
                            min: -150,
                            max: 300,
                        }
                    },
                    
                },
            });
        }
    }, [chartData]);

    return (
        <div>
            <h2>Balance (USD)</h2>
            <canvas style={{maxHeight: '300px'}} ref={chartRef} />
        </div>
    );
};
export default BarChart;