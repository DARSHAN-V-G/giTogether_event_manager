// src/components/TeamCard.jsx
import React from 'react';
import './TeamCard.css'

const TeamCard = ({ team ,rank}) => {
    const overallScore = team.speedrunScore + team.boxOfLiesScore + team.marketingScore;
    const firstMember = team.members[0] || {};

    return (
       <>
       <div className="maincard-container">
       <p className="pos-text">{rank}</p>
       <div className="card-container">
        <p className="text" style={{fontSize:"2.3rem"}}>{team.teamName}</p>
        <p className="text">{firstMember.name}</p>
        <p className="text">Overall Score: {overallScore}</p>
       </div>
       </div>
       </>
    );
};

export default TeamCard;