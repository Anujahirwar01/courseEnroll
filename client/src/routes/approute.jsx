import { Routes, Route, BrowserRouter } from "react-router-dom";
import Signup from "../components/signup";
import Login from "../components/login";
import Home from "../components/home";
import Courses from "../components/courses";
import About from "../components/about";
import ProfileInside from "../components/profileinside";
import Features from "../components/features";
import DSACourse from "../data/dsacourse";
import MERNStackCourse from "../data/fullstack";
import JavaScriptTypeScriptCourse from "../data/javascript";
import UIUXCourse from "../data/uiux";

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
                <Route path="/course/fullstack" element={<MERNStackCourse />} />
                <Route path="/course/javascript" element={<JavaScriptTypeScriptCourse />} />
                <Route path="/course/uiux" element={<UIUXCourse />} />

            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;