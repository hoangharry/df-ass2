package article

import (
	"df-ass2/article-be/models"
	"gorm.io/gorm"
)

type ReposArticle struct {
	db *gorm.DB
}

func NewReposArticle(db *gorm.DB) *ReposArticle {
	return &ReposArticle{
		db: db,
	}
}

func (r *ReposArticle) GetArticleByID(id int64) (models.Article, error) {
	art := models.Article{}
	return art, r.db.Table("article").Where(map[string]interface{}{"id": id, "deleted": false}).First(&art).Error
}

func (r *ReposArticle) GetArticles(page int64, size int) ([]models.Article, error) {
	var arts []models.Article
	return arts, r.db.Table("article").Where("deleted = ?", false).Order("created_at desc").Limit(size).Offset(int(page-1) * size).Find(&arts).Error
}

func (r *ReposArticle) AddArticle(art models.Article) error {
	return r.db.Table("article").Create(&art).Error
}

func (r *ReposArticle) EditArticleByID(newArt models.ArticleReq) (models.Article, error) {
	art := models.Article{}
	r.db.Table("article").Where("id = ?", newArt.ID).First(&art)
	art.Title = newArt.Title
	art.Description = newArt.Description
	art.Content = newArt.Content
	return art, r.db.Table("article").Save(&art).Error
}

func (r *ReposArticle) DeleteArticleByID(id int64) error {
	art := models.Article{}
	r.db.Table("article").First(&art, id)
	art.Deleted = true
	return r.db.Table("article").Save(&art).Error
}

func (r *ReposArticle) CountArticles() (int64, error) {
	var num int64
	num = 0
	return num, r.db.Table("article").Where("deleted = ?", false).Count(&num).Error

}
