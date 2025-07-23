package main

import (
	"log"
	"net/http"
	"todoapi/routes"
)

func main() {
	router := routes.SetupRoutes()
	log.Println("API Go lancée sur le port 8000")
	http.ListenAndServe(":8000", router)
}