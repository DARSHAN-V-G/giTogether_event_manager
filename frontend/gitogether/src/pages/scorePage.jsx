import React from 'react';
import { Link } from 'react-router-dom';

const Score = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px', color:"rgb(243, 60, 91)" }}>
            <h1>Team Scoring</h1>
            <div className="container" style={{}}>
                <div style={{ marginBottom: '20px' }}>
                <Link to="/speedrun">
                    <button>Speedrun</button>
                </Link>
                <Link to="/boxoflies" style={{ margin: '0 10px' }}>
                    <button>Box of Lies</button>
                </Link>
                <Link to="/marketing">
                    <button>Marketing</button>
                </Link>
                </div>
            </div>
        </div>
    );
};

export default Score;