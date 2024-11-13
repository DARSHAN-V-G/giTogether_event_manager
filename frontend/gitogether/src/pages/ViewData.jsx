import './HomePage.css';

const HomePage = ()=>{
  return(
    <>
    <div className="header">
      <p className="txt">GiTogether Event Manager</p>
    </div>
    <div className="home-container">
      <a href="/group" className="btns">Create Group</a>
      <a href="/score" className="btns">Add Scores</a>
      <a href="/leaderboard" className="btns">Leaderboard</a>
    </div>
    </>
  )
}

export default HomePage;