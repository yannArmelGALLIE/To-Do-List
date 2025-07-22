import app from "./app.js";
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config({path: "./config/.env"})

// Base de données
mongoose
  .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@backenddb.u0odg8.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB`)
  .then(() => console.log("connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));

  
//server
app.listen(process.env.PORT, () => {
    console.log(`Server Listening on port http://localhost:${process.env.PORT_API_NODE}`);
})