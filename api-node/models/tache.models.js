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
    priorite: {
      type: String,
      enum: ["faible", "moyenne", "haute"],
      default: "faible",
    },
    deadline: {
      type: Date,
      required: true,
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