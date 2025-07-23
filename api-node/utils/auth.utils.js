// Erreur pour l'inscription
export const registerErrors = (err) => {
    const errors = {
        nom: "",
        prenom: "",
        email: "",
        mot_de_passe: ""
    };

    if (err.errors) {
        for (const key in err.errors) {
            if (err.errors[key].kind === "required") {
                switch (key) {
                    case "nom":
                        errors.nom = "Le nom est requis";
                        break;
                    case "prenom":
                        errors.prenom = "Au moins un prenom est requis";
                        break;
                    case "email":
                        errors.email = "L'email est requis";
                        break;
                    case "mot_de_passe":
                        errors.mot_de_passe = "La création d'un mot de passe est requis";
                        break;            
                }
            };

            if (err.errors[key].kind === "user defined") {
                if (key === "email") {
                    errors.email = "Email invalide";
                }

                if (key === "mot_de_passe") {
                    errors.mot_de_passe = "Mot de passe invalide";
                }
            };

            if(err.errors[key].kind === "minlength") {
                if (key === "mot_de_passe") {
                    errors.mot_de_passe = "Le mot de passe doit contenir au moins 8 caractères";
                }
            }
        }
    }

    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        if (field === "email") {
            errors.email = "Email déjà existant";
        }
    }

    return errors;
};