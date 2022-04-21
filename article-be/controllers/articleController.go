package controllers

import (
	"df-ass2/article-be/database"
	"df-ass2/article-be/models"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

func PostArticle(c *gin.Context) {
	category := c.PostForm("category")
	userId, _ := strconv.ParseInt(c.PostForm("user_id"), 10, 64)
	description := c.PostForm("description")
	content := c.PostForm("content")

	art := models.Article{
		Category:    category,
		UserId:      uint(userId),
		Description: description,
		Content:     content,
	}

	database.DB.Create(&art)

	c.String(http.StatusOK, "success")
}

func GetArticles(c *gin.Context) {
	page, _ := strconv.ParseInt(c.DefaultQuery("page", "0"), 10, 64)
	var arts []models.Article
	database.DB.Order("created_at desc").Limit(10).Offset(int(page * 10)).Find(&arts)
	c.JSON(http.StatusOK, arts)

}

func GetArticleById(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)
	var art models.Article
	database.DB.Where("id = ", id).First(&art)
	c.JSON(http.StatusOK, art)
}

//func PutArticle(c *gin.Context) {
//
//}
