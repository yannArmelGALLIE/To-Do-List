package routes

import (
	"github.com/gorilla/mux"
	"todoapi/controllers"
)

func SetupRoutes() *mux.Router {
	router := mux.NewRouter()
	router.HandleFunc("/analyse", controllers.AnalyseTaches).Methods("POST")
	return router
}