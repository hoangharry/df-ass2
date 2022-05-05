package user

import (
	"df-ass2/article-be/models"
	"gorm.io/gorm"
)

type ReposUser struct {
	db *gorm.DB
}

func NewReposUser(db *gorm.DB) *ReposUser {
	return &ReposUser{
		db: db,
	}
}

func (r *ReposUser) AddUser(u models.User) error {
	return r.db.Table("user").Create(&u).Error
}

func (r *ReposUser) GetUserByID(id int) (models.User, error) {
	var u models.User
	return u, r.db.Table("user").Where("id = ?", id).First(&u).Error
}

func (r *ReposUser) GetUserByUsername(username string) (models.User, error) {
	var u models.User
	return u, r.db.Table("user").Where("username = ?", username).First(&u).Error
}
