package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"sort"
	"todoapi/models"
)

var odreStatus = map[string]int{
	"en cours":   3,
	"en attente": 2,
	"terminée":   1,
}

var odrePriorite = map[string]int{
	"élevée":  3,
	"moyenne": 2,
	"faible":  1,
}

func AnalyseTaches(w http.ResponseWriter, r *http.Request) {
	var taches []models.Tache

	if err := json.NewDecoder(r.Body).Decode(&taches); err != nil {
		http.Error(w, "Tâches invalides", http.StatusBadRequest)
		return
	}

	fmt.Println("tâches réçues : ", taches)

	sort.Slice(taches, func(i, j int) bool {
		pi := odreStatus[taches[i].Status]
		pj := odreStatus[taches[j].Status]

		if pi != pj {
			return pi > pj
		}

		pri := odrePriorite[taches[i].Priorite]
		prj := odrePriorite[taches[j].Priorite]

		if pri != prj {
			return pri > prj
		}

		return taches[i].Deadline.Before(taches[j].Deadline)
	})

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(taches)
}
