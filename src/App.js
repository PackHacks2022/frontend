import { useState, useEffect } from "react";

function App() {

  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/course/1", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(data => {
      setCourse(data);
    })
  }, []);

  return (
    <div className="App">
      {course &&
      <div>
        <h1>Fetch course:</h1>
        <p>{course.department}</p>
        <p>{course.number}</p>
        <p>{course.title}</p>
      </div>}
    </div>
  );
}

export default App;
