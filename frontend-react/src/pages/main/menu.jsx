import { Link, useLocation, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DoneIcon from "@mui/icons-material/Done";
import SettingsIcon from "@mui/icons-material/Settings";
import profil from "../../styles/img/profil.jpg";

const Menu = () => {
  const [activePage, setActivePage] = useState("mes-taches");
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.split("/")[2];
    if (path) setActivePage(path);
  }, [location]);

  const menuItems = [
    { id: "mes-taches", icon: HomeIcon, label: "Mes tâches" },
    { id: "taches-a-faire", icon: AssignmentIcon, label: "Tâches à faire" },
    { id: "taches-terminees", icon: DoneIcon, label: "Tâches terminées" },
    { id: "parametres", icon: SettingsIcon, label: "Paramètres" },
  ];

  return (
    <div className="menu">
      <div className="menu-bar">
        <div>
          <h1>My Todo List</h1>
        </div>
        <div>
          <ul>
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link
                  className={activePage === item.id ? "active" : ""}
                  to={`/todolist/${item.id}`}
                >
                  <item.icon /> {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <img src={profil} alt="Photo de profil" />
          <Link to={"/todolist/profil"}>
            <p>GALLIE</p>
            <p>Koffi Yann-Armel</p>
          </Link>
        </div>
      </div>
      <div className="menu-main">
        <Outlet /> {}
      </div>
    </div>
  );
};

export default Menu;
