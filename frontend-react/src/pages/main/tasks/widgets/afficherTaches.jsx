import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { format } from "date-fns";
import { useState, useEffect } from "react";

const AfficherTaches = ({ taches, setTaches }) => {
  const button = [
    { id: "en attente", label: "En attente" },
    { id: "en cours", label: "En cours" },
  ];

  const deleteTasks = async (tache) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/tache/${tache._id}`
      );
      if (res) {
        console.log("Message supprimé");
        setTaches((prev) => prev.filter((t) => t._id !== tache._id));
      }
    } catch (err) {
      console.error(
        "Erreur lors de la suppression :",
        err.response?.data || err.message
      );
    }
  };

  const completeTasks = async (tache) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/tache/${tache._id}`,
        {
          status: "terminée",
        }
      );
      if (res) {
        setTaches((prev) =>
          prev.map((t) =>
            t._id === tache._id ? { ...t, Status: "terminée" } : t
          )
        );
      }
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err.message);
    }
  };

  const changeStatus = async (tache, btn) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/tache/${tache._id}`,
        {
          status: btn.id,
        }
      );
      if (res) {
        setTaches((prev) =>
          prev.map((t) => (t._id === tache._id ? { ...t, Status: btn.id } : t))
        );
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const getPrioriteClass = (status, priorite) => {
    if (status !== "terminée") {
      if (priorite === "faible") return "faible";
    if (priorite === "moyenne") return "moyenne";
    return "elevee";
    } else {
      return "terminee";
    }
  };

  return (
    <div>
      {taches.map((tache) => (
        <div key={tache._id} className={getPrioriteClass(tache.Status, tache.Priorite)}>
          <div>
            <input
              type="checkbox"
              name=""
              id=""
              checked={tache.Status === "terminée"}
              onClick={() => completeTasks(tache)}
            />
            <p className={tache.Status === "terminée" ? "titre-barre" : ""}>
              {tache.Titre}
            </p>
            <div>
              <button>
                <EditIcon />
              </button>
              <button onClick={() => deleteTasks(tache)}>
                <DeleteIcon />
              </button>
            </div>
          </div>
          <div>
            <p>{tache.Description}</p>
          </div>
          <div>
            {tache.Status === "terminée" ? (
              <p className="terminee">{tache.Status}</p>
            ) : (
              <div>
                {button.map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => changeStatus(tache, btn)}
                    className={tache.Status === btn.id ? "active" : ""}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            )}
            <p>{format(new Date(tache.Deadline), "dd/MM/yyyy")}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AfficherTaches;
