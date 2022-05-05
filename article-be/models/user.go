package models

type User struct {
	ID       uint   `gorm:"primaryKey,autoIncrement"`
	Username string `gorm:"size:255;not null;unique" json:"username" binding:"required"`
	Password string `gorm:"size:255;not null" json:"password" binding:"min=8"`
}

type RegisterInput struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required,min=8"`
}
