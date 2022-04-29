package models

type Article struct {
	ID          uint   `json:"id"`
	Category    string `json:"name"`
	UserID      uint   `json:"user_id"`
	Description string `json:"description"`
	Content     string `json:"content"`
	CreatedAt   int    `json:"created_at"`
}
