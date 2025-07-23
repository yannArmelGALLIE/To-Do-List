import express from "express";
import { save, updateTache, deleteTache } from "../controllers/tache.controller.js";

const router = express.Router();

router.post("/save", save);
router.put("/:id", updateTache);
router.delete("/:id", deleteTache)

export default router;
