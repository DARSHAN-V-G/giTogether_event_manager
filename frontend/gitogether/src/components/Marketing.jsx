// src/components/Marketing.jsx
import React from 'react';
import ScoreComponent from './ScoreComponent';
import { Container, Typography, Paper, Box } from '@mui/material';
const Marketing = () => {
    return (

<Container maxWidth="sm" style={{ marginTop: '50px' }}>
<Paper elevation={3} style={{ padding: '20px' }}>
    <Typography variant="h4" component="h2" gutterBottom>
        Marketing Score
    </Typography>
    <Box mt={3}>
        <ScoreComponent scoreType="marketingScore" />
    </Box>
</Paper>
</Container>
    );
};

export default Marketing;
