package models

import "time"

type Tache struct {
	ID string
	Titre string
	Description string
	Status string
	Priorite string
	Deadline time.Time
	Utilisateur string
}

