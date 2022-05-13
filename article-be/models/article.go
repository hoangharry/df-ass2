package models

import (
	"gorm.io/plugin/soft_delete"
	"time"
)

type Article struct {
	ID          uint                  `json:"id"`
	Img         string                `json:"img"`
	Category    string                `json:"category"`
	UserID      uint                  `json:"user_id"`
	Title       string                `json:"title"`
	Description string                `json:"description"`
	Content     string                `json:"content"`
	CreatedAt   time.Time             `json:"created_at"`
	IsDeleted   soft_delete.DeletedAt `json:"is_deleted" gorm:"softDelete:flag"`
}

type ArticleReq struct {
	ID          uint   `json:"id" binding:"omitempty,gt=0"`
	Img         string `json:"img"`
	Category    string `json:"category" binding:"required"`
	UserID      uint   `json:"user_id" binding:"omitempty,gt=0"`
	Title       string `json:"title" binding:"required"`
	Description string `json:"description" binding:"required"`
	Content     string `json:"content" binding:"required"`
}

type ArticleResponse struct {
	ID          uint   `json:"id" binding:"omitempty,gt=0"`
	Img         string `json:"img" binding:"required"`
	Category    string `json:"category" binding:"required"`
	UserID      uint   `json:"user_id" binding:"omitempty,gt=0"`
	Username    string `json:"user"`
	Title       string `json:"title" binding:"required"`
	Description string `json:"description" binding:"required"`
	Content     string `json:"content" binding:"required"`
}

type ArticlesRes struct {
	Total int64     `json:"total"`
	Data  []Article `json:"data"`
}
