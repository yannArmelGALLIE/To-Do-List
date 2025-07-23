import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js"
import tacheRoutes from "./routes/tache.routes.js";
import utilisateurRoutes from "./routes/utilisateur.routes.js";
import { checkUtilisateur, requireAuth } from "./middleware/auth.middleware.js";
dotenv.config({path: "./config/.env"})

// Base de données
mongoose
  .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@backenddb.u0odg8.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB`)
  .then(() => console.log("Connecté à MongoDB"))
  .catch((err) => console.log("Echec de la connexion à MongoDB", err));


const corsOptions = {
    origin : process.env.CLIENT_URL,
    credentials : true,
    'allowedHeaders': ['sessionId', 'content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

// Middleware JWT
app.use(checkUtilisateur);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.utilisateur._id);
});


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tache", tacheRoutes);
app.use("/api/utilisateur", utilisateurRoutes);

//server
app.listen(process.env.PORT, () => {
    console.log(`Le server écoute sur le port http://localhost:${process.env.PORT}`);
})

