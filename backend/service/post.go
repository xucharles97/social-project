package service

import (
	"mime/multipart"
	"reflect"

	"socialai/backend"
	"socialai/constants"
	"socialai/model"

	"github.com/olivere/elastic/v7"
)

func SearchPostsByUser(user string) ([]model.Post, error) {
    // Define business logic
    query := elastic.NewTermQuery("user", user)

    // Call backend
    searchResult, err := backend.ESBackend.ReadFromES(query, constants.POST_INDEX)
    if err != nil {
        return nil, err
    }

    // Construct resopnse
    return getPostFromSearchResult(searchResult), nil
}

func SearchPostsByKeywords(keywords string) ([]model.Post, error) {
    // Define business logic
    query := elastic.NewMatchQuery("message", keywords)
    query.Operator("AND")
	    if keywords == "" {
        query.ZeroTermsQuery("all")
    }

    // Call backend
    searchResult, err := backend.ESBackend.ReadFromES(query, constants.POST_INDEX)
    if err != nil {
        return nil, err
    }

    // Construct response
    return getPostFromSearchResult(searchResult), nil
}

func getPostFromSearchResult(searchResult *elastic.SearchResult) []model.Post {
    var ptype model.Post
    var posts []model.Post

    for _, item := range searchResult.Each(reflect.TypeOf(ptype)) {
        p := item.(model.Post)
        posts = append(posts, p)
    }
    return posts
}

func SavePost(post *model.Post, file multipart.File) error {
    // Save to GCS, get URL
    medialink, err := backend.GCSBackend.SaveToGCS(file, post.Id)
    if err != nil {
        return err
    }
    post.Url = medialink

    // Save Post to ES + response
    return backend.ESBackend.SaveToES(post, constants.POST_INDEX, post.Id)
}