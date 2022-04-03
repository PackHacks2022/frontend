import { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

const socket = io.connect("http://localhost:5000");

const instructorId = localStorage.getItem("instructor_id");

// Main page for an instructor
// Shows all courses and corresponding tags
// Instructor can start a new session for any course
// Instructor can view historical charts about a specific course
function Dashboard() {
  const navigate = useNavigate();

  const [userAndCourseInfoFetched, setUserAndCourseInfoFetched] = useState(false);
  const [tagInfoFetched, setTagInfoFetched] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [courses, setCourses] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const result = await axios(`http://localhost:5000/instructor/${instructorId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const data = await result.data;

      setFirstName(data.first_name);
      setLastName(data.last_name);
    }

    const fetchCourses = async () => {
      const result = await axios(`http://localhost:5000/courses?instructor_id=${instructorId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const data = await result.data;

      setCourses(data);
    }

    setUserAndCourseInfoFetched(false);
    fetchUserInfo();
    fetchCourses();
    setUserAndCourseInfoFetched(true);
  }, []);

  useEffect(() => {
    if (courses) {
      const fetchTags = async (courseId) => {
        const result = await axios(
          `http://localhost:5000/tags?course_id=${courseId}`, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          });

        setTags(prevTags => [...prevTags, result.data]);
      };

      setTagInfoFetched(false);
      courses.forEach(course => {
        fetchTags(course.id);
      });
      setTagInfoFetched(true);
    }
  }, [courses]);

  useEffect(() => {
    console.log(tags);
  }, [tags]);

  const startSession = async () => {
    const result = await axios(`http://localhost:5000/create_session?phrase=${localStorage.getItem("PHRASE")}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    const data = await result.data;

    navigate("/session");
  }

  return (
    <div className="Dashboard">
      <h1>Welcome, {firstName} {lastName}.</h1>
      <h3>Courses</h3>
      {userAndCourseInfoFetched && tagInfoFetched && courses.map((course, i) => 
        <div>
          <p>Course {i + 1}: {course.department} {course.number} {course.title}</p>
          <ul>
          {tags.map((tagGroup, j) => {
            return i == j && 
            <div>
              {tagGroup.map(tag => <li>{tag.name}</li>)}
            </div>
          })}
          </ul>
          <button onClick={startSession}>Start Session</button>
        </div>
      )}
    </div>
  )
}

export default Dashboard;