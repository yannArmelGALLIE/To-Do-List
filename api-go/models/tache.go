package models

import "time"

type Tache struct {
	ID          string    `json:"_id"`  
	Titre       string    `json:"Titre"`
	Description string    `json:"Description"`
	Status      string    `json:"Status"`
	Priorite    string    `json:"Priorite"`
	Deadline    time.Time `json:"Deadline"`
	Utilisateur string    `json:"Utilisateur"`
}

