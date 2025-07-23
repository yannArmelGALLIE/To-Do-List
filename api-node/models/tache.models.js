import mongoose from "mongoose";

const TacheSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["en attente", "en cours", "terminé"],
      default: "en attente",
    },
    utilisateur: {
      type: mongoose.Schema.ObjectId,
      ref: "Utilisateur",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Tache", TacheSchema);