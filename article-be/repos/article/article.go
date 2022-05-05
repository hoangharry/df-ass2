package article

import "df-ass2/article-be/models"

type Article interface {
	GetArticleByID(id int64) (models.Article, error)
	GetArticles(page int64, size int) ([]models.Article, error)
	AddArticle(art models.Article) error
	EditArticleByID(newArt models.Article) (models.Article, error)
	DeleteArticleByID(art models.Article) error
	CountArticles() (int64, error)
}
