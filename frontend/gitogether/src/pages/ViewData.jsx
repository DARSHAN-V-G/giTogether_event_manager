import './HomePage.css';

const HomePage = ()=>{
  return(
    <>
    <div className="home-container">
      <p className="txt">GiTogether Event Manager</p>
      <a href="/group" className="btns">Create Group</a>
      <a href="/score" className="btns">Add Scores</a>
      <a href="/leaderboard" className="btns">Leaderboard</a>
    </div>
    </>
  )
}

export default HomePage;