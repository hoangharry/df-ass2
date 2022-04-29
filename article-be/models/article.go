package models

type Article struct {
	ID          uint   `json:"id"`
	Category    string `json:"category"`
	UserID      uint   `json:"user_id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Content     string `json:"content"`
	CreatedAt   int    `json:"created_at"`
}

type ArticleReq struct {
	Category    string `json:"category"`
	UserID      uint   `json:"user_id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Content     string `json:"content"`
}
