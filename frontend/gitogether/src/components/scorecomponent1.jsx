import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Button, Grid, Container, Typography } from '@mui/material';
import axios from 'axios';

const ScoreComponent1 = ({ scoreType, calculationType }) => {
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [score1, setScore1] = useState('');
    const [score2, setScore2] = useState('');

    useEffect(() => {
        // Fetch teams data from the backend
        const fetchTeams = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/team/getteam`);
                setTeams(response.data);
            } catch (error) {
                console.error("Error fetching teams:", error);
            }
        };

        fetchTeams();
    }, []);

    const handleSubmit = async () => {
        if (!selectedTeam || !score1 || !score2) {
            alert("Please select a team and enter both scores.");
            return;
        }

        // Calculate score based on calculationType
        let finalScore;
        if (calculationType === 'average') {
            // Calculate the average of the two scores
            finalScore = (Number(score1) + Number(score2)) / 2;
        } else if (calculationType === 'sum') {
            // Calculate the sum of the two scores
            finalScore = Number(score1) + Number(score2);
        }

        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/team/update/${selectedTeam._id}/score`;
            await axios.put(url, {
                scoreType,
                score: finalScore
            });
            alert("Score updated successfully!");
            setScore1('');
            setScore2('');
        } catch (error) {
            console.error("Error updating score:", error);
            alert("Failed to update score");
        }
    };

    return (
        <Container maxWidth="xs" style={{ textAlign: 'center', marginTop: '20px' }}>
            <Typography variant="h6" gutterBottom>
                {calculationType === 'average' ? 'Update  Score' : 'Update Total Score'}
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Autocomplete
                        options={teams}
                        getOptionLabel={(option) => option.teamName}
                        onChange={(event, newValue) => {
                            setSelectedTeam(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} label="Select Team" variant="outlined" />}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="number"
                        label="Score 1"
                        value={score1}
                        onChange={(e) => setScore1(e.target.value)}
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="number"
                        label="Score 2"
                        value={score2}
                        onChange={(e) => setScore2(e.target.value)}
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
                        Update Score
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ScoreComponent1;

