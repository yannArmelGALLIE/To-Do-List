import UtilisateurSchema from "../models/utilisateur.models.js";
import { registerErrors } from "../utils/auth.utils.js";
import jwt from "jsonwebtoken";

// Cookies
const maxAge = 3 * 24 * 60 * 1000;
const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
};

// Connexion et deconnexion
export const register = async (req, res) => {
    const {nom, prenom, email, mot_de_passe} = req.body;

    try {
        const utilisateur = await UtilisateurSchema.create({nom, prenom, email, mot_de_passe});
        res.status(201).json({ utilisateur : utilisateur });
    }
    catch (err) {
        console.log(err);
        const errors = registerErrors(err)
        res.status(200).send({errors})
    }
}

export const login = async (req, res) => {
    const {email, mot_de_passe} = req.body;

    try {
        const utilisateur = await UtilisateurSchema.login(email, mot_de_passe);
        const token = createToken(utilisateur._id);
        res.cookie("jwt", token, {httpOnly: true, maxAge});
        res.status(201).json({ utilisateur : utilisateur, token });
    }
    catch (err) {
        console.log(err);
        if (err.name === "AuthError1") {
            return res.status(401).json({erreur : err.message})
        }
        if (err.name === "AuthError2") {
            return res.status(401).json({ erreur: err.message })
        }
        res.send({err})
    }
}

export const logout = async (req, res) => {
    res.cookie("jwt", "", {maxAge: 1});
    res.redirect("/");
}
