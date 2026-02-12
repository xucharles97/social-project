package handler

import (
	"encoding/json"
	"fmt"
	"net/http"
	"socialai/model"
)

func uploadHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Received one upload request")
	
	// Process http request
	decoder := json.NewDecoder(r.Body)
	var p model.Post
	if err := decoder.Decode(&p); err != nil {
		panic(err)
	}

	fmt.Fprintf(w, "Post received: %s\n", p.Message)

	// call service layer (business logic)


	// construct response
}