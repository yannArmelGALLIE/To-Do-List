import { Link } from "react-router-dom";
import googleLogo from "../../styles/img/google.png";
import outlookLogo from "../../styles/img/outlook.png";

const Login = () => {
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
          <form action="">
            <div>
              <input type="email" name="" id="" placeholder=" " />
              <label htmlFor="email">Email</label>
            </div>
            <div>
              <input type="password" name="" id="" placeholder=" " />
              <label htmlFor="password">Mot de passe</label>
            </div>
            <Link>
              <p>Mot de passe oublié ?</p>
            </Link>
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
