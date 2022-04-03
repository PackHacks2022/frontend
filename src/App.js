import { useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

function App() {

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
      console.log(data)
      if (data) {
        // localStorage.setItem("PHRASE", data);
        setAuthenticated(true);
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
    <div className="App">
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

export default App;
