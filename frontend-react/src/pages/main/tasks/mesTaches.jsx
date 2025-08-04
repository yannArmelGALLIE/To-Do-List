import React from "react";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AddIcon from "@mui/icons-material/Add";
import WarningIcon from "@mui/icons-material/Warning";
import DangerousIcon from "@mui/icons-material/Dangerous";
import axios from "axios";
import AfficherTaches from "./widgets/afficherTaches";

const MesTaches = () => {
  const [userId, setUserId] = useState("");
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priorite, setPriorite] = useState("");
  const [alert, setAlert] = useState("");
  const [erreur1, setErreur1] = useState("");
  const [erreur2, setErreur2] = useState("");
  const [activeButton1, setActiveButton1] = useState("toutes");
  const [activeButton2, setActiveButton2] = useState("toutes-les-priorites");
  const [taches, setTaches] = useState([]);

  const button1 = [
    { id: "toutes", label: "Toutes" },
    { id: "en-attente", label: "En attente" },
    { id: "en-cours", label: "En cours" },
    { id: "terminees", label: "Terminées" },
  ];
  const button2 = [
    { id: "toutes-les-priorites", label: "Toutes les priorités" },
    { id: "faible", label: "Faible" },
    { id: "moyenne", label: "Moyenne" },
    { id: "élevée", label: "Elevée" },
  ];

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
    console.log("ID user : ", storedUserId);
  }, []);

  const findTasks = async () => {
    const res = await axios.get(`http://localhost:3000/api/utilisateur/${userId}/taches`)
    if (res) {
      setTaches(res.data);
      console.log(res.data);
    }
  }

  useEffect(() => {
    if (userId) {
      findTasks();
    }
  }, [userId])

  const handleForm = async (e) => {
    e.preventDefault();

    if (titre === "" && deadline === "") {
      setAlert("Veuillez remplir tous les champs !");
    } else {
      if (priorite) {
        try {
          const res = await axios.post("http://localhost:3000/api/tache/save", {
            titre,
            description,
            priorite,
            deadline,
            utilisateur: userId,
          });
          if (res.data) {
            console.log(res.data);
            await findTasks();
          } else {
            console.log("erreur");
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          const res = await axios.post("http://localhost:3000/api/tache/save", {
            titre,
            description,
            deadline,
            utilisateur: userId,
          });
          if (res.data) {
            console.log(res.data);
            await findTasks();
          } else {
            console.log("erreur");
          }
        } catch (err) {
          if (err.response && err.response.data && err.response.data.errors) {
            const errors = err.response.data.errors;
            if (errors.titre !== "") {
              setErreur1(errors.titre);
              setErreur2("");
            } else if (errors.deadline !== "") {
              setErreur1("");
              setErreur2(errors.deadline);
            }
          }
        }
      }
    }
  };

  const [filteredTasks, setFilteredTasks] = useState(taches);
  const statusMapping = {
    "en-attente": "en attente",
    "en-cours": "en cours",
    "terminees": "terminée"
  }

  const applyFilters = () => {
  let result = [...taches];

  if (activeButton1 !== "toutes") {
    const status = statusMapping[activeButton1];
    result = result.filter((t) => t.Status === status);
  }

  if (activeButton2 !== "toutes-les-priorites") {
    result = result.filter((t) => t.Priorite === activeButton2);
  }

  setFilteredTasks(result);
};

const handleFilter1 = (filter) => {
  setActiveButton1(filter);
};

const handleFilter2 = (filter) => {
  setActiveButton2(filter);
};

useEffect(() => {
  applyFilters();
}, [activeButton1, activeButton2, taches]);



  return (
    <div className="mes-taches">
      <div>
        <form action="" onSubmit={handleForm}>
          <div>
            <TextField
              label="Titre"
              variant="outlined"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
            />
            <TextField
              label="Description"
              variant="outlined"
              sx={{ minWidth: 350 }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <FormControl sx={{ minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label" sx={{ m: 1 }}>
                Priorité
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={priorite}
                label="Priorité"
                onChange={(e) => setPriorite(e.target.value)}
                sx={{ m: 1 }}
              >
                <MenuItem value="faible">Faible</MenuItem>
                <MenuItem value="moyenne">Moyenne</MenuItem>
                <MenuItem value="élevée">Elevée</MenuItem>
              </Select>
            </FormControl>
            <input
              type="date"
              name=""
              id=""
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
            <button type="submit">
              <AddIcon /> Ajouter une tâche
            </button>
          </div>
          {alert && (
            <div className="alert">
              <WarningIcon /> {alert}
            </div>
          )}
          {erreur1 && (
            <div className="erreur-1">
              <DangerousIcon />
              {erreur1}
            </div>
          )}
          {erreur2 && (
            <div className="erreur-2">
              <DangerousIcon />
              {erreur2}
            </div>
          )}
        </form>
      </div>
      <div>
        <div>
          <div>
            <p>
              Total: <span>{taches.length}</span>
            </p>
            <p>
              En attente: <span>{taches.filter((t) => t.Status === "en attente").length}</span>
            </p>
            <p>
              En cours: <span>{taches.filter((t) => t.Status === "en cours").length}</span>
            </p>
            <p>
              Terminées: <span>{taches.filter((t) => t.Status === "terminée").length}</span>
            </p>
          </div>
          <div>
            <div>
              {button1.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    handleFilter1(item.id);
                  }}
                  className={activeButton1 === item.id ? "active" : ""}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div>
              {button2.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    handleFilter2(item.id);
                  }}
                  className={activeButton2 === item.id ? "active" : ""}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <AfficherTaches taches={filteredTasks} setTaches={setTaches} />
      </div>
    </div>
  );
};
export default MesTaches;
