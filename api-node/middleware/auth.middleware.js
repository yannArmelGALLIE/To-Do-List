import jwt from "jsonwebtoken";
import UtilisateurModel from "../models/utilisateur.models.js";

export const checkUtilisateur = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                res.locals.utilisateur = null;
                res.cookie("jwt", "", {maxAge: 1});
                next();
            }
            else {
                console.log("decoded token" + decodedToken);
                let utilisateur = await UtilisateurModel.findById(decodedToken.id);
                res.locals.utilisateur = utilisateur;
                console.log(res.locals.utilisateur);
                next();
            }
        })
    }
    else {
        res.locals.utilisateur = null;
        next();
    }
};

export const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if(err) {
                console.log(err);
            }
            else {
                console.log(decodedToken.id);
                next();
            }
        })
    }
    else {
        console.log("Pas de token");
    }
}

