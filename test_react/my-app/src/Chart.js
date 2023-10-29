import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

function Chart() {
    const { ticker } = useParams();

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });

    useEffect(() => {
        axios.get(`http://localhost:5000/stock/${ticker}`)
            .then(response => {
                const data = response.data;
                const dates = Object.keys(data).map(timestamp => new Date(parseInt(timestamp)).toLocaleDateString());
                const prices = Object.values(data).map(item => item.Close);
    
                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: `${ticker} Stock Price`,
                            data: prices,
                            fill: false,
                            backgroundColor: 'rgb(75, 192, 192)',
                            borderColor: 'rgba(75, 192, 192, 0.2)',
                        },
                    ],
                });
            })
            .catch(error => {
                console.error("Error getting stock data: ", error);
            });
    }, [ticker]);

    return (
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div>
                <Typography variant="h4" component="h1" gutterBottom>{ticker} Stock Chart</Typography>
                <Line data={chartData} options={{ responsive: true }} />
            </div>
        </Container>
    );
}

export default Chart;