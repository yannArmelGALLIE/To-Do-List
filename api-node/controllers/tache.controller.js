import TacheModels from "../models/tache.models.js";
import {tacheErrors}  from "../utils/tache.utils.js";

export const save = async (req, res) => {
    const { titre, description, status, priorite, deadline, utilisateur } = req.body;

    try {
        const tache = await TacheModels.create({ titre, description, status, priorite, deadline, utilisateur })
        res.status(201).json({ tache : tache });
        console.log(tache);
    }
    catch (err) {
        console.log(err);
        const errors = tacheErrors(err)
        res.status(400).json({errors});
    }
}

export const updateTache = async (req, res) => {
    
    try {
        const tache = await TacheModels.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true },
        );

        if (!tache) {
            res.status(404).json({ message : "Tâche non trouvée" });
        };

        res.status(201).json({ message : "Tâche mise à jour", tache });
    }
    catch (err) {
        console.log(err);
        res.satus(400).json({ message : "Erreur de mise à jour", err });
    }
}

export const deleteTache = async (req, res) => {
    try {
        const tache = await TacheModels.findByIdAndDelete(
            req.params.id,   
        );

        if (!tache) {
            res.status(404).json({ message : "Tache non trouvée" });
        };

        res.status(201).json({ message : "Tâche supprimée" });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message : "Erreur de suppression de la tâche" });
    }
}

export const getAllTaches = async (req, res) => {
    const taches = await TacheModels.find();
    res.status(201).json({ taches });
}