import React from 'react';
import { Link } from 'react-router-dom';

const Score = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px', color:"rgb(243, 60, 91)" }}>
            <h1 className="txt">Team Scoring</h1>
            <div className="container" style={{display:'flex',width:'100%',alignItems:'center',justifyContent:'center',height:'70vh'}}>
                <div style={{ marginBottom: '20px' }}>
                <Link to="/speedrun">
                    <button className="btns">Speedrun</button>
                </Link>
                <Link to="/boxoflies" style={{ margin: '0 10px' }}>
                    <button className="btns">Box of Lies</button>
                </Link>
                <Link to="/marketing">
                    <button className="btns">Marketing</button>
                </Link>
                </div>
            </div>
        </div>
    );
};

export default Score;