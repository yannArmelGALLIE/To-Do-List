import mongoose from "mongoose";
import bcrypt from "bcrypt";
import isEmail from "validator/lib/isEmail.js";

const UtilisateurSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      trim: true,
    },
    prenom: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      unique: true,
      trim: true,
    },
    mot_de_passe: {
      type: String,
      required: true,
      minLength: 8,
    },
  },
  {
    timestamps: true,
  }
);

// Ne pas utiliser une arrow function ici !
UtilisateurSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.mot_de_passe = await bcrypt.hash(this.mot_de_passe, salt);
  next();
});

// Utilisation correcte de "this" dans les méthodes statiques
UtilisateurSchema.statics.login = async function (email, mot_de_passe) {
  const utilisateur = await this.findOne({ email });
  if (utilisateur) {
    const auth = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);
    if (auth) {
      return utilisateur;
    }
    const error = new Error("Mot de passe incorrect");
    error.name = "AuthError2";
    throw error;
  }
  const error = new Error("Email incorrect");
  error.name = "AuthError1";
  throw error;
};

export default mongoose.model("Utilisateur", UtilisateurSchema);
