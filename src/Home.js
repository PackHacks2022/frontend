import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="Home">
      <h1>PackHacks 2022</h1>
      <button onClick={() => navigate("/login")}>Login</button>
    </div>
  )
}

export default Home;