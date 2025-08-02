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

const MesTaches = () => {
  const [userId, setUserId] = useState("");
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priorite, setPriorite] = useState("");
  const [alert, setAlert] = useState("");
  const [erreur1, setErreur1] = useState("");
  const [erreur2, setErreur2] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
    console.log("ID user : ", storedUserId);
  }, []);

  const handleForm = async (e) => {
    e.preventDefault();

    if (titre === "" && deadline == "") {
      setAlert("Veuillez remplir tous les champs !");
    } else {
      if (priorite) {
        try {
          const res = await axios.post("http://localhost:3000/api/tache/save", {
            titre,
            description,
            priorite,
            deadline,
            userId,
          });
          if (res.data) {
            console.log(res.data);
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
            userId,
          });
          if (res.data) {
            console.log(res.data);
          } else {
            console.log("erreur");
          }
        } catch (err) {
          if (err.response && err.response.data && err.response.data.errors) {
            const errors = err.response.data.errors;
            if (errors.titre !== "") {
              setErreur1(errors.titre);
              setErreur2("");
            }
            else if (errors.deadline !== "") {
              setErreur1("");
              setErreur2(errors.deadline);
            }
          }
        }
      }
    }
  };

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
      <div></div>
    </div>
  );
};

export default MesTaches;
