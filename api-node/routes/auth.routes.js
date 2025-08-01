import express from "express";
import {register, login, logout} from "../controllers/auth.controller.js";

const router = express.Router();

// auth
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout)


export default router;