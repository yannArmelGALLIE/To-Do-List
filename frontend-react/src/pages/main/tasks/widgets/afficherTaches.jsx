import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const AfficherTaches = ({ taches, setTaches }) => {
  
  const deleteTasks = async (tache) => {
    try {
          const res = await axios.delete(`http://localhost:3000/api/tache/${tache._id}`);
    if (res) {
      console.log("Message supprimé");
      setTaches((prev) => prev.filter((t) => t._id !== tache._id));
    }
    }
    catch (err) {
      console.error("Erreur lors de la suppression :", err.response?.data || err.message)
    }
  }

  return (
    <div>
      {taches.map((tache) => {
        if (tache.Priorite === "faible") {
          return (
            <div key={tache._id} className="faible">
              <div>
                <input type="checkbox" name="" id="" />
                <p>{tache.Titre}</p>
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
                <p>{tache.Status}</p>
                <p>{tache.Priorite}</p>
                <p>{new Date(tache.Deadline).toISOString().split("T")[0]}</p>
              </div>
            </div>
          );
        } else if (tache.Priorite === "moyenne") {
          return (
            <div key={tache._id} className="moyenne">
              <div>
                <input type="checkbox" name="" id="" />
                <p>{tache.Titre}</p>
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
                <p>{tache.Status}</p>
                <p>{tache.Priorite}</p>
                <p>{new Date(tache.Deadline).toISOString().split("T")[0]}</p>
              </div>
            </div>
          );
        } else {
          return (
            <div key={tache._id} className="elevee">
              <div>
                <input type="checkbox" name="" id="" />
                <p>{tache.Titre}</p>
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
                <p>{tache.Status}</p>
                <p>{tache.Priorite}</p>
                <p>{new Date(tache.Deadline).toISOString().split("T")[0]}</p>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default AfficherTaches;
