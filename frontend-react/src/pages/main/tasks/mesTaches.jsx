import React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AddIcon from "@mui/icons-material/Add";
import WarningIcon from "@mui/icons-material/Warning";

const MesTaches = () => {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priorite, setPriorite] = useState("");
  const [alert, setAlert] = useState("");

  const handleForm = (e) => {
    e.preventDefault();

    if (titre === "" && deadline == "") {
        setAlert("Veuillez remplir tous les champs !")
    }
  }

  return (
    <div className="mes-taches">
      <div>
        <form action="" onSubmit={handleForm}>
          <div>
            <TextField label="Titre" variant="outlined" value={titre} onChange={(e) => setTitre(e.target.value)} />
            <TextField
              label="Description"
              variant="outlined"
              sx={{ minWidth: 350 }}
              value={description} onChange={(e) => setDescription(e.target.value)}
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
            <input type="date" name="" id="" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
            <button type="submit">
              <AddIcon /> Ajouter une tâche
            </button>
          </div>
          {alert && <div><WarningIcon /> {alert}</div>}
        </form>
      </div>
      <div></div>
    </div>
  );
};

export default MesTaches;
