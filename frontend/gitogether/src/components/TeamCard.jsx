// src/components/TeamCard.jsx
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const TeamCard = ({ team }) => {
    const overallScore = team.speedrunScore + team.boxOfLiesScore + team.marketingScore;
    const firstMember = team.members[0] || {};

    return (
        <Card sx={{ marginBottom: '20px', width: '600px' }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    Team Name: {team.teamName}
                </Typography>
                <Typography color="text.secondary">
                    Captain Name: {firstMember.name}
                </Typography>
                <Typography color="text.secondary">
                    Captain Roll No: {firstMember.roll_no}
                </Typography>
                <Typography variant="body2">
                    Overall Score: {overallScore}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default TeamCard;