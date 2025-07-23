import UtilisateurModels from "../models/utilisateur.models.js";
import TacheModels from "../models/tache.models.js";
import { isValidObjectId } from "mongoose";
import axios from "axios";

export const getAllUtilisateurs = async (req, res) => {
  const utilisateurs = await UtilisateurModels.find();
  res.status(201).json({ utilisateurs });
};

export const utilisateurInfo = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    res.status(400).json({ messages: `ID inconnu : ${req.params.id}` });
  }

  try {
    const utilisateur = await UtilisateurModels.findById(req.params.id);
    if (!utilisateur) {
      res
        .status(400)
        .json({ message: `Utilisateur inconnu : ${req.params.id}` });
    }
    res.status(201).json({ utilisateur });
  } catch (err) {
    console.log(err);
    res.status(200).json({ err });
  }
};

export const updateUtilisateur = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    res.status(400).json({ message: `ID inconnu : ${req.params.id}` });
  }

  try {
    const utilisateur = await UtilisateurModels.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!utilisateur) {
      res
        .status(400)
        .json({ message: `Utilisateur inconnu : ${req.params.id}` });
    }
    res.status(200).json({ utilisateur });
  } catch (err) {
    console.log(err);
    res.status(200).json({ err });
  }
};

export const deleteUtilisateur = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    res.status(400).json({ message: `ID inconnu: ${req.params.id}` });
  }

  try {
    const utilisateur = await UtilisateurModels.findByIdAndDelete(
      req.params.id
    );
    if (!utilisateur) {
      res
        .send(400)
        .json({ message: `Utilisateur introuvable: ${req.params.id}` });
    }
    res.status(201).json({ message: "Utilisateur supprimé" });
  } catch (err) {
    console.log(err);
    res.status(200).json({ err });
  }
};

export const findAllTachesForUtilisateur = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    res.status(400).json({ message: `ID inconnu: ${req.params.id}` });
  }
  try {
    const utilisateur = await UtilisateurModels.findById(req.params.id);
    if (!utilisateur) {
      res
        .send(400)
        .json({ message: `Utilisateur introuvable ${req.params.id}` });
    }
    const tachesUtilisateur = await TacheModels.find({
      utilisateur: req.params.id,
    });

    const response = await axios.post(
      "http://localhost:8000/analyse",
      tachesUtilisateur,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    res.status(200).json(response.data);
  } catch (err) {
    console.log(err);
    res.status(200).json({ err });
  }
};
