import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const AfficherTaches = ({ taches }) => {
  return (
    <div>
      {taches.map((tache) => {
        if (tache.priorite === "Faible") {
          return (
            <div key={tache.id} className="faible">
              <div>
                <input type="checkbox" name="" id="" />
                <p>{tache.titre}</p>
                <div>
                  <button>
                    <EditIcon />
                  </button>
                  <button>
                    <DeleteIcon />
                  </button>
                </div>
              </div>
              <div>
                <p>{tache.description}</p>
              </div>
              <div>
                <p>{tache.status}</p>
                <p>{tache.priorite}</p>
                <p>{tache.deadline}</p>
              </div>
            </div>
          );
        } else if (tache.priorite === "Moyenne") {
          return (
            <div key={tache.id} className="moyenne">
              <div>
                <input type="checkbox" name="" id="" />
                <p>{tache.titre}</p>
                <div>
                  <button>
                    <EditIcon />
                  </button>
                  <button>
                    <DeleteIcon />
                  </button>
                </div>
              </div>
              <div>
                <p>{tache.description}</p>
              </div>
              <div>
                <p>{tache.status}</p>
                <p>{tache.priorite}</p>
                <p>{tache.deadline}</p>
              </div>
            </div>
          );
        } else {
          return (
            <div key={tache.id} className="elevee">
              <div>
                <input type="checkbox" name="" id="" />
                <p>{tache.titre}</p>
                <div>
                  <button>
                    <EditIcon />
                  </button>
                  <button>
                    <DeleteIcon />
                  </button>
                </div>
              </div>
              <div>
                <p>{tache.description}</p>
              </div>
              <div>
                <p>{tache.status}</p>
                <p>{tache.priorite}</p>
                <p>{tache.deadline}</p>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default AfficherTaches;
