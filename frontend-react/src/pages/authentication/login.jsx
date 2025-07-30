import { Link } from "react-router-dom";
import { useState } from "react";
import googleLogo from "../../styles/img/google.png";
import outlookLogo from "../../styles/img/outlook.png";
import WarningIcon from '@mui/icons-material/Warning';
import DangerousIcon from '@mui/icons-material/Dangerous';

const Login = () => {

  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [alert, setAlert] = useState("");
  const [erreur, setErreur] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (email !== "" && motDePasse !== "") {
      if (email === "yann@gmail.com" && motDePasse === "motDePasse") {
        console.log("Vous êtes connecté");
        setAlert("");
        setErreur("");
      } else {
        setAlert("");
        setErreur("Identifiants inconnus")
      }
    } else {
      setAlert("Veuillez remplir tous les champs !");
      setErreur();
    }

  }

  return (
    <div className="login-main">
      <div>
        <h1>To Do List</h1>
      </div>
      <div className="login-content">
        <div>
          <div>
            <h2>Content de vous revoir !</h2>
            <h3>Connectez-vous à votre compte</h3>
          </div>
          <form action="" onSubmit={handleLogin}>
            <div>
              <input type="email" name="" id="" placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email">Email</label>
            </div>
            <div>
              <input type="password" name="" id="" placeholder=" "
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              />
              <label htmlFor="password">Mot de passe</label>
            </div>
            <Link>
              <p>Mot de passe oublié ?</p>
            </Link>
            { alert && <div className="alert"><WarningIcon />{alert}</div> }
            { erreur && <div className="erreur"><DangerousIcon />{erreur}</div> }
            <button type="submit">Se connecter</button>
          </form>
        </div>
        <div>
          <div></div>
          <p>Ou</p>
          <div></div>
        </div>
        <div>
          <Link>
            <img src={googleLogo} alt="Logo de google" />
            <p>Connectez-vous avec Google</p>
          </Link>
          <Link>
            <img src={outlookLogo} alt="Logo de outlook" />
            <p>Connectez-vous avec Outlook</p>
          </Link>
          <Link>
            <p>Vous n'avez pas de compte? Inscrivez-vous</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
