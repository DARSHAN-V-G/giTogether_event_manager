import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Button, Grid, Container, Typography } from '@mui/material';
import axios from 'axios';

const ScoreComponent = ({ scoreType }) => {
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [score, setScore] = useState('');

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
        if (!selectedTeam || !score) {
            alert("Please select a team and enter a score.");
            return;
        }

        
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/team/update/${selectedTeam._id}/score`;
            await axios.put(url, {
                scoreType,
                score: Number(score)
            });
            alert("Score updated successfully!");
            setScore('');
        } catch (error) {
            console.error("Error updating score:", error);
            alert("Failed to update score");
        }
    };

    return (
        <Container maxWidth="xs" style={{ textAlign: 'center', marginTop: '20px' }}>
            <Typography variant="h6" gutterBottom>
                Update Score
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Autocomplete
                        options={teams}
                        getOptionLabel={(option) => option.teamName}
                        onChange={(event, newValue) => {
                            console.log('Selected Team:', newValue); // Log newValue to check its structure
                            setSelectedTeam(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} label="Select Team" variant="outlined" />}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="number"
                        label="Score"
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
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

export default ScoreComponent;