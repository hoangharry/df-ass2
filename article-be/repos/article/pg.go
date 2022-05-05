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
	return art, r.db.Table("article").Where("id = ?", id).First(&art).Error
}

func (r *ReposArticle) GetArticles(page int64, size int) ([]models.Article, error) {
	var arts []models.Article
	return arts, r.db.Table("article").Order("created_at desc").Limit(size).Offset(int(page-1) * size).Find(&arts).Error
}

func (r *ReposArticle) AddArticle(art models.Article) error {
	return r.db.Table("article").Create(&art).Error
}

func (r *ReposArticle) EditArticleByID(newArt models.Article) (models.Article, error) {
	return newArt, r.db.Table("article").Save(&newArt).Error
}

func (r *ReposArticle) DeleteArticleByID(art models.Article) error {
	return r.db.Table("article").Delete(&art).Error
}

func (r *ReposArticle) CountArticles() (int64, error) {
	var num int64
	num = 0
	return num, r.db.Table("article").Where("deleted = ?", false).Count(&num).Error

}
