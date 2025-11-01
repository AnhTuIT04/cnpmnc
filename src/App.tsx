import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/about";
import Dashboard from "./pages/dashboard";
import Courses from "./pages/courses";
import Students from "./pages/students";
import Reports from "./pages/reports";
import Settings from "./pages/settings";
import NotFound from "./pages/not-found";
import LandingPage from "./pages/Landing";
import SignInPage from "./pages/auth/signin";
import SignUpPage from "./pages/auth/signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/signin" element={<SignInPage />} />
        <Route path="/auth/signup" element={<SignUpPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/students" element={<Students />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
