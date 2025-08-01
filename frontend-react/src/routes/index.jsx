import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Login from "../pages/authentication/login";
import Register from "../pages/authentication/register";
import Menu from "../pages/main/menu";
import MesTaches from "../pages/main/tasks/mesTaches";
import TachesAFaire from "../pages/main/tasks/tachesAFaire";
import TachesTerminees from "../pages/main/tasks/tachesTerminees";
import Param from "../pages/main/custom/param";
import Profil from "../pages/main/custom/profil";

const Index = () => {
  return (
    <Router>
      <Routes>
        <Route path="/connexion" element={<Login />} />
        <Route path="/inscription" element={<Register />} />
        <Route path="/todolist" element={<Menu />}>
          <Route path="mes-taches" element={<MesTaches />} />
          <Route path="taches-a-faire" element={<TachesAFaire />} />
          <Route path="taches-terminees" element={<TachesTerminees />} />
          <Route path="parametres" element={<Param />} />
          <Route path="profil" element={<Profil />} />
        </Route>
        <Route path="*" element={<Navigate to="/connexion" />} />
      </Routes>
    </Router>
  );
};

export default Index;
