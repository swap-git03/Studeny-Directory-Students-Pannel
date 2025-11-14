import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentDetails from "./pages/StudentDetails";
import StudentList from "./pages/StudentList"; // your existing student table/page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/students" element={<StudentList />} />
        <Route path="/student/:id" element={<StudentDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
