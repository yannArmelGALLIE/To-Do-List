export const tacheErrors = (err) => {
    const errors = {
        titre: "",
        description: "",
        status: "",
        utilisateur: ""
    };

    if (err.errors) {
        for (const key in err.errors) {
            if (err.errors[key].kind === "required") {
                if (key === "titre") {
                    errors.titre = "Le titre est requis"
                }
            };

            if (err.errors[key].kind === "ObjectId") {
                if (key === "utilisateur") {
                    errors.utilisateur = "Utilisateur inconnu"
                }
            }
        }
    };

    return errors;
}