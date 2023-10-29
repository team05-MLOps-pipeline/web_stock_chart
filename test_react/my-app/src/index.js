import Chart from './Chart';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { Container, Typography, Grid, Paper, Button } from '@mui/material';

function Dashboard() {
    const tickers = ['AAPL', 'MSFT', 'GOOGL', 'AMZN'];

    return (
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom>Stock Chart Dashboard</Typography>
                <Grid container spacing={2}>
                    {tickers.map((ticker, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                            <Paper sx={{ p: 2, borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                                <Typography variant="h5" component="h2" gutterBottom>{ticker}</Typography>
                                <Button variant="contained" component={Link} to={`/chart/${ticker}`} sx={{ backgroundColor: '#1976d2', color: 'white' }}>View Chart</Button>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </Container>
    );
}

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/chart/:ticker" element={<Chart />} />
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);