package user

import "df-ass2/article-be/models"

type User interface {
	AddUser(u models.User) error
	GetUserByUsername(username string) (models.User, error)
	GetUserByID(id int) (models.User, error)
}
