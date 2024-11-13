// src/components/Marketing.jsx
import React from 'react';
import ScoreComponent1 from './scorecomponent1.jsx';
import { Container, Typography, Paper, Box } from '@mui/material';
const Marketing = () => {
    return (

<Container maxWidth="sm" style={{ marginTop: '50px' }}>
<Paper elevation={3} style={{ padding: '20px' }}>
    <Typography variant="h4" component="h2" gutterBottom>
        Marketing Score
    </Typography>
    <Box mt={3}>
        <ScoreComponent1 scoreType="marketingScore" />
    </Box>
</Paper>
</Container>
    );
};

export default Marketing;
