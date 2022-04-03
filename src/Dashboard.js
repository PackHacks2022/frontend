import { useState, useEffect } from "react";
import "nes.css/css/nes.min.css";

const instructorId = localStorage.getItem("instructor_id");

function Dashboard() {
  const [fetchingUserInfo, setFetchingUserInfo] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [courses, setCourses] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setFetchingUserInfo(true);

    fetch(`http://localhost:5000/instructor/${instructorId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(data => {
      if (data) {
        setFirstName(data.first_name);
        setLastName(data.last_name);
      }
    });

    fetch(`http://localhost:5000/courses?instructor_id=${instructorId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(data => {
      setCourses(data);
    });

    setFetchingUserInfo(false);
  }, []);

  return (
    <div className="Dashboard">
      <h1>Welcome, {firstName} {lastName}.</h1>
      {courses && tags && courses.map((course, i) => 
        <div>
          <p>Course {i + 1}: {course.department} {course.number} {course.title}</p>
        </div>
      )}
    </div>
  )
}


function StaticPage() {
  return (
    <div className="nes-balloon">
      <textarea id="textarea_field" class="nes-textarea">Enter Question Here</textarea>
      <span class="nes-text is-primary">Fancy Text</span>
      <p type="text" class="is-primary">Mock text</p>
      <button type="button" class="nes-btn is-primary">Start Class</button>
      <label>
        <input type="radio" class="nes-radio" name="answer" />
        <span>No</span>
      </label>

      <ul class="lists">
      <li>Good morning.</li>
      <li>Thou hast had a good night's sleep, I hope.</li>
      <li>Thou hast had a good afternoon</li>
      <li>Good night.</li>
    </ul>
    </div>
  );
}

export default StaticPage;

// export default Dashboard;