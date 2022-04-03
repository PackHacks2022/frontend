import { useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

function Home() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [sessionCode, setSessionCode] = useState("");

  function joinSession() {
    socket.emit("join", {name: name, room: sessionCode});
    localStorage.setItem("type", "student")
    localStorage.setItem("sessionCode", sessionCode)
    navigate("/session");
  }

  return (
    <div className="Home">
      <h1>PackHacks 2022</h1>
      <button onClick={() => navigate("/login")}>Login</button>
      <br/>
      <br/>
      <br/>

      <input onChange={(e) => setName(e.target.value)}></input>
      <input onChange={(e) => setSessionCode(e.target.value)}></input>
      <button onClick={joinSession}>Join Session</button>
    </div>
  )
}

export default Home;