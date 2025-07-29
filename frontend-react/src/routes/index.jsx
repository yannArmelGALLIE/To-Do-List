import { 
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes
 } from "react-router-dom";
import Login from "../pages/authentication/login";
import Register from "../pages/authentication/register";

const Index = () => {
    return (
        <Router>
            <Routes>
                <Route path="/connexion" element={<Login />} />
                <Route path="/inscription" element={<Register />} />
                <Route path="*" element={<Navigate to="/connexion" />} />
            </Routes>
        </Router>
    );
}

export default Index;