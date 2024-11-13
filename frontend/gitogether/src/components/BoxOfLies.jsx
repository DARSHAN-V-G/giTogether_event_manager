// src/components/BoxOfLies.jsx
import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import ScoreComponent from './ScoreComponent';
import ScoreComponent1 from './scorecomponent1';

const BoxOfLies = () => {
    return (
        <Container maxWidth="sm" style={{ marginTop: '50px' }}>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h4" component="h2" gutterBottom>
                    Box of Lies Score
                </Typography>
                <Box mt={3}>
                    <ScoreComponent1 scoreType="boxOfLiesScore" calculationType="sum" />
                </Box>
            </Paper>
        </Container>
    );
};

export default BoxOfLies;