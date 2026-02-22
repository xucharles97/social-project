package service

import (
	"fmt"
	"socialai/backend"
	"socialai/constants"
	"socialai/model"

	"github.com/olivere/elastic"
)

func CheckUser(username, password string) (bool, error) {
	// logic: search user + password
	query:= elastic.NewBoolQuery()
	query.Must(elastic.NewTermQuery("username", username))
	query.Must(elastic.NewTermQuery("password", password))

	searchResult, err := backend.ESBackend.ReadFromES(query, constants.USER_INDEX)
	if err != nil {
		return false, err
	}

    if searchResult.TotalHits() > 0 {
         fmt.Printf("Login as %s\n", username)
        return true, nil
    }

    return false, nil
}

func AddUser(user *model.User) (bool, error) {
	// Check Username, then create
	query := elastic.NewTermQuery("username", user.Username)
	searchResult, err := backend.ESBackend.ReadFromES(query, constants.USER_INDEX)
	if err != nil {
		return false, err
	}

	if searchResult.TotalHits() > 0 {
		return false, nil
	}

	// ES.Save
	err = backend.ESBackend.SaveToES(user, constants.USER_INDEX, user.Username)
	if err != nil {
		return false, err
	}

	// return
	fmt.Printf("User is added: %s\n", user.Username)
	return true, nil
}