package controllers

import (
	"encoding/json"
	"net/http"
	"sort"
	"todoapi/models"
)

var odrePriorite = map[string]int{
	"haute": 3,
	"moyenne": 2,
	"faible": 1,
}

func AnalyseTaches (w http.ResponseWriter, r *http.Request) {
	var taches []models.Tache

	if err := json.NewDecoder(r.Body).Decode(&taches); err != nil {
		http.Error(w, "Tâches invalides", http.StatusBadRequest)
		return
	}

	sort.Slice(taches, func(i,j int) bool {
		pi := odrePriorite[taches[i].Priorite]
		pj := odrePriorite[taches[j].Priorite]

		if pi == pj {
			return taches[i].Deadline.Before(taches[j].Deadline)
		}

		return pi > pj
	})

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(taches)
}