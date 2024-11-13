// src/components/BoxOfLies.jsx
import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import ScoreComponent from './ScoreComponent';

const BoxOfLies = () => {
    return (
        <Container maxWidth="sm" style={{ marginTop: '50px' }}>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h4" component="h2" gutterBottom>
                    Box of Lies Score
                </Typography>
                <Box mt={3}>
                    <ScoreComponent scoreType="boxOfLiesScore" />
                </Box>
            </Paper>
        </Container>
    );
};

export default BoxOfLies;