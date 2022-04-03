import { useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

function Session() {

  const userType = localStorage.getItem("type");
  const sessionCode = localStorage.getItem("sessionCode");

  const [title, setTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [questions, setQuestions] = useState([]);

  function submitQuestion() {
    console.log("submitting question", title, questionBody);
    socket.emit("create_question", {title: title, question_body: questionBody, session_code: sessionCode})
  }

  socket.on("updated_questions", (data) => {
    console.log("consuming updated_questions", data);
    setQuestions(data);
  });

  if (userType == "instructor") {
    return (
      <div className="Session">
        <p>Render the session as an instructor view</p>
        <h2>Questions</h2>
        {questions.map(question =>
          <div>
            <h4>{question.title}</h4>
            <p>{question.question_body}</p>
          </div>)}
      </div>
    )
  } else {
    return (
      <div className="Session">
        <p>Render the session as a student view</p>
        <input onChange={(e) => setTitle(e.target.value)}></input>
        <input onChange={(e) => setQuestionBody(e.target.value)}></input>
        <button onClick={submitQuestion}>Submit question</button>

        <h2>Questions</h2>
        {questions.map(question =>
          <div>
            <h4>{question.title}</h4>
            <p>{question.question_body}</p>
          </div>)}
      </div>
    )
  }
}

export default Session;