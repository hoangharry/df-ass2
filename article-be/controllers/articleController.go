package controllers

import (
	"df-ass2/article-be/database"
	"df-ass2/article-be/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func PostArticle(c *gin.Context) {

	body := models.ArticleReq{}
	err := c.ShouldBindJSON(&body)
	if err != nil {
		c.Abort()
	}
	art := models.Article{
		Category:    body.Category,
		UserID:      body.UserID,
		Description: body.Description,
		Content:     body.Content,
		Title:       body.Title,
	}

	database.DB.Table("article").Create(&art)

	c.String(http.StatusOK, "success")
}

func GetArticles(c *gin.Context) {
	page, _ := strconv.ParseInt(c.DefaultQuery("page", "0"), 10, 64)
	var arts []models.Article
	database.DB.Table("article").Order("created_at desc").Limit(10).Offset(int(page * 10)).Find(&arts)
	c.JSON(http.StatusOK, arts)

}

func GetArticleByID(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)
	var art models.Article
	database.DB.Table("article").First(&art, id)
	c.JSON(http.StatusOK, art)
}

func EditArticleByID(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)
	body := models.ArticleReq{}
	err := c.ShouldBindJSON(&body)
	if err != nil {
		c.Abort()
	}

	var art models.Article
	database.DB.Table("article").First(&art, id)
	art.Title = body.Title
	art.Description = body.Description
	art.Content = body.Content
	database.DB.Table("article").Save(&art)
	c.JSON(http.StatusOK, art)
}

func CountArticles(c *gin.Context) (int64, error) {
	var num int64
	database.DB.Table("article").Count(&num)
	return num, nil
}
