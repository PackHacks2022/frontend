import { useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [sessionCode, setSessionCode] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const logIn = () => {
    fetch(`http://localhost:5000/login?email=${email}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(data => {
      if (data) {
        localStorage.setItem("instructor_id", data);
        setAuthenticated(true);
        navigate("/dashboard")
      }
    })
  }

  const startSession = () => {
    fetch(`http://localhost:5000/create_session?phrase=${localStorage.getItem("PHRASE")}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(data => {
      setSessionCode(data);
      socket.emit("join", {name: email, room: sessionCode});
    })
  }

  return (
    <div className="Login">
      <p>Log in as an instructor.</p>
      <input onChange={(e) => setEmail(e.target.value)}></input>
      <button onClick={() => logIn()}>Log In</button>
      {authenticated && 
      <div>
        <button onClick={startSession}>Start Session</button>
        <p>Session code: {sessionCode}</p>
      </div>}
    </div>
  );
}

export default Login;
