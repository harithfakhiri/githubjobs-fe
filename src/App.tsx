import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import JobDetails from "./pages/JobDetails";

function App() {
  return (
    <div className="App h-dvh relative">
      <BrowserRouter>
        <RenderNavBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/jobdetails/:id" element={<JobDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// Separate component to conditionally render NavBar based on location
function RenderNavBar() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return !isLoginPage && <NavBar />;
}

export default App;
