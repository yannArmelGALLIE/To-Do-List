import express from "express";
import { getAllUtilisateurs, utilisateurInfo, updateUtilisateur, deleteUtilisateur, findAllTachesForUtilisateur } from "../controllers/utilisateur.controller.js";

const router = express.Router();

router.get("/", getAllUtilisateurs);
router.post("/:id", utilisateurInfo);
router.put("/:id", updateUtilisateur);
router.delete("/:id", deleteUtilisateur);
router.get("/:id/taches", findAllTachesForUtilisateur);

export default router;