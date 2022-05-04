package controllers

import (
	"df-ass2/article-be/models"
	"df-ass2/article-be/repos"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

type articleController struct {
	repo *repos.Service
}

func NewArticleControllers(r *repos.Service) articleController {
	return articleController{
		repo: r,
	}
}

func (c *articleController) PostArticle(ctx *gin.Context) {

	body := models.ArticleReq{}
	err := ctx.ShouldBindJSON(&body)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	art := models.Article{
		Category:    body.Category,
		UserID:      body.UserID,
		Description: body.Description,
		Content:     body.Content,
		Title:       body.Title,
		CreatedAt:   time.Now().Unix(),
		Deleted:     false,
	}
	err = c.repo.ArticleService.AddArticle(art)
	if err != nil {
		ctx.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
		return
	}
	ctx.String(http.StatusCreated, "success")
}

func (c *articleController) GetArticles(ctx *gin.Context) {
	//page, _ := strconv.ParseInt(ctx.DefaultQuery("page", "0"), 10, 64)
	var page models.Pagination
	if err := ctx.ShouldBind(&page); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "query params are not valid"})
		return
	}
	var arts []models.Article
	if page.Size == 0 {
		page.Size = 10
	}
	fmt.Println(page)
	arts, err := c.repo.ArticleService.GetArticles(int64(page.Page), page.Size)
	fmt.Println(arts)
	if err != nil {
		ctx.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
		return
	}
	//database.DB.Table("article").Order("created_at desc").Limit(10).Offset(int(page.Page * page.Size)).Find(&arts)
	var num int64
	num, err = c.repo.ArticleService.CountArticles()
	if err != nil {
		ctx.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
		return
	}
	//database.DB.Table("article").Count(&num)
	res := models.ArticlesRes{
		Total: num,
		Data:  arts,
	}
	ctx.JSON(http.StatusOK, res)

}

func (c *articleController) GetArticleByID(ctx *gin.Context) {
	id, _ := strconv.ParseInt(ctx.Param("id"), 10, 64)
	var art models.Article
	art, err := c.repo.ArticleService.GetArticleByID(id)
	if err != nil {
		ctx.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
		return
	}
	//database.DB.Table("article").First(&art, id)
	ctx.JSON(http.StatusOK, art)
}

func (c *articleController) EditArticleByID(ctx *gin.Context) {
	id, _ := strconv.ParseInt(ctx.Param("id"), 10, 64)
	body := models.ArticleReq{}
	err := ctx.ShouldBindJSON(&body)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "query params are not valid"})
		return

	}
	body.ID = uint(id)

	var art models.Article
	art, err = c.repo.ArticleService.EditArticleByID(body)
	//database.DB.Table("article").First(&art, id)
	//database.DB.Table("article").Save(&art)
	if err != nil {
		ctx.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, art)
}

func (c *articleController) DeleteArticleByID(ctx *gin.Context) {
	id, _ := strconv.ParseInt(ctx.Param("id"), 10, 64)
	err := c.repo.ArticleService.DeleteArticleByID(id)
	if err != nil {
		ctx.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, "deleted successfully")
}
