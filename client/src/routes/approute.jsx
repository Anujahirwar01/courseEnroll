import { Routes, Route, BrowserRouter } from "react-router-dom";
import Signup from "../components/signup";
import Login from "../components/login";
import Home from "../components/home";
import Courses from "../components/courses";
import About from "../components/about";
import ProfileInside from "../components/profileinside";
import Features from "../components/features";
import DSACourse from "../components/dsacourse";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/about" element={<About />} />
                <Route path="/profile" element={<ProfileInside />} />
                <Route path="/features" element={<Features />} />
                <Route path="/course/dsa" element={<DSACourse />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;