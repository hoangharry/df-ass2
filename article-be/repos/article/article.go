package article

import "df-ass2/article-be/models"

type Article interface {
	GetArticleByID(id int64) (models.Article, error)
	GetArticles(page int64, size int) ([]models.Article, error)
	AddArticle(art models.Article) error
	EditArticleByID(newArt models.ArticleReq) (models.Article, error)
	DeleteArticleByID(id int64) error
	CountArticles() (int64, error)
}
