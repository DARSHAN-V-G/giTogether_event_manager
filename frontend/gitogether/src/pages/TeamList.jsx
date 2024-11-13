// src/components/TeamList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, CircularProgress, Alert } from '@mui/material';
import styled from 'styled-components';
import TeamCard from '../components/TeamCard';

const StyledContainer = styled(Container)`
  margin-top: 3rem;
  width: 70%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.1); /* Semi-transparent background */
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.3); /* Semi-transparent border */
  backdrop-filter: blur(10px); /* Apply blur effect */
  -webkit-backdrop-filter: blur(10px); /* Support for Safari */

  @media (max-width: 768px) {
    width: 95%;
  }
`;

const StyledTitle = styled(Typography)`
  color: #f1f1f1;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const StyledTeamContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2rem;
`;

const StyledLoading = styled(CircularProgress)`
  color: #f1f1f1;
`;

const StyledError = styled(Alert)`
  background-color: #1e1e1e;
  color: #f1f1f1;
`;

const TeamList = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/team/getteam`);
        const sortedTeams = response.data.sort((a, b) => {
          const aScore = a.speedrunScore + a.boxOfLiesScore + a.marketingScore;
          const bScore = b.speedrunScore + b.boxOfLiesScore + b.marketingScore;
          return bScore - aScore; // Sort in descending order
        });
        setTeams(sortedTeams);
      } catch (err) {
        setError('Failed to load teams');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return (
      <StyledContainer>
        <StyledLoading />
      </StyledContainer>
    );
  }

  if (error) {
    return (
      <StyledContainer>
        <StyledError severity="error">{error}</StyledError>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <StyledTitle variant="h4" gutterBottom>
        Leaderboard
      </StyledTitle>
      <StyledTeamContainer>
        {teams.map((team) => (
          <TeamCard key={team._id} team={team} />
        ))}
      </StyledTeamContainer>
    </StyledContainer>
  );
};

export default TeamList;