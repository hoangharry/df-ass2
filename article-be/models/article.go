package models

type Article struct {
	Id          uint   `json:"id"`
	Category    string `json:"name"`
	UserId      uint   `json:"user_id"`
	Description string `json:"description"`
	Content     string `json:"content"`
	CreatedAt   int    `json:"created_at"`
}
