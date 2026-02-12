package main

import (
	"fmt"
	"log"
	"net/http"
	"socialai/handler"
)

func main() {
	fmt.Println("Hello world")

	log.Fatal(http.ListenAndServe(":8080", handler.InitRouter()))
}