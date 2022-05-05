package models

import (
	"gorm.io/plugin/soft_delete"
)

type Article struct {
	ID          uint                  `json:"id"`
	Category    string                `json:"category"`
	UserID      uint                  `json:"user_id"`
	Title       string                `json:"title"`
	Description string                `json:"description"`
	Content     string                `json:"content"`
	CreatedAt   int64                 `json:"created_at"`
	IsDeleted   soft_delete.DeletedAt `json:"is_deleted" gorm:"softDelete:flag"`
}

type ArticleReq struct {
	ID          uint   `json:"id" binding:"omitempty,gt=0"`
	Category    string `json:"category" binding:"required"`
	UserID      uint   `json:"user_id" binding:"omitempty,gt=0"`
	Title       string `json:"title" binding:"required"`
	Description string `json:"description" binding:"required"`
	Content     string `json:"content" binding:"required"`
}

type ArticlesRes struct {
	Total int64     `json:"total"`
	Data  []Article `json:"data"`
}
