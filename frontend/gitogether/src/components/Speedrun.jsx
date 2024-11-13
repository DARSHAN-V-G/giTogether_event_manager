// src/components/Speedrun.jsx
import React from 'react';
import ScoreComponent from './ScoreComponent';

import { Container, Typography, Paper, Box } from '@mui/material';
const Speedrun = () => {
    return (
        <>
        <Container maxWidth="sm" style={{ marginTop: '50px' }}>
        <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Speedrun Score
            </Typography>
            <Box mt={3}>
                <ScoreComponent scoreType="speedrunScore" />
            </Box>
        </Paper>
        </Container>
        
        </>
    );
};

export default Speedrun;
