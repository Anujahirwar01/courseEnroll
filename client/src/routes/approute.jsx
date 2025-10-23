import { Routes, Route, BrowserRouter } from "react-router-dom";
import Signup from "../components/signup";
import Login from "../components/login";
import Home from "../components/home";
import Courses from "../components/courses";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/" element={<Home/>}/>
                <Route path="/courses" element={<Courses/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;