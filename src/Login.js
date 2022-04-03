import { useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

// Login page where the instructor logs in
function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [sessionCode, setSessionCode] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  // Called when "Log In" is pressed
  const logIn = () => {
    fetch(`http://localhost:5000/login?email=${email}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(data => {
      if (data) {
        // save items to local storage to know type of user, which instructor, etc.
        localStorage.setItem("instructor_id", data.instructor_id);
        localStorage.setItem("phrase", data.phrase)
        localStorage.setItem("type", "instructor")
        setAuthenticated(true);
        navigate("/dashboard") // redirect to the dashboard after log in
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
