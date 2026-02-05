import { useEffect, useState } from "react";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("https://localhost:5001/api/project")
      .then(res => res.json())
      .then(data => setProjects(data));
  }, []);

  return (
    <div>
      <h1>Project Dashboard</h1>
      <ul>
        {projects.map((p, i) => <li key={i}>{p}</li>)}
      </ul>
    </div>
  );
}

export default App;
