package controllers

import (
	"df-ass2/article-be/models"
	"df-ass2/article-be/repos"
	"df-ass2/article-be/utils/token"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

type ArticleController struct {
	repo *repos.Service
}

func NewArticleControllers(r *repos.Service) ArticleController {
	return ArticleController{
		repo: r,
	}
}

func (c *ArticleController) PostArticle(ctx *gin.Context) {
	body := models.ArticleReq{}
	err := ctx.ShouldBindJSON(&body)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	uid, err := token.ExtractTokenID(ctx)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}
	art := models.Article{
		Category:    body.Category,
		UserID:      uid,
		Description: body.Description,
		Content:     body.Content,
		Title:       body.Title,
		Img:         body.Img,
		CreatedAt:   time.Now(),
	}
	err = c.repo.ArticleService.AddArticle(art)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	ctx.String(http.StatusCreated, "success")
}

func (c *ArticleController) GetArticles(ctx *gin.Context) {
	var page models.Pagination
	if err := ctx.ShouldBind(&page); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"err": err.Error()})
		return
	}
	var arts []models.Article
	if page.Size == 0 {
		page.Size = 6
	}
	arts, err := c.repo.ArticleService.GetArticles(int64(page.Page), page.Size)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	var num int64
	num, err = c.repo.ArticleService.CountArticles()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	res := models.ArticlesRes{
		Total: num,
		Data:  arts,
	}
	ctx.JSON(http.StatusOK, res)

}

func (c *ArticleController) GetArticlesOfUser(ctx *gin.Context) {
	var page models.Pagination
	if err := ctx.ShouldBind(&page); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "query params are not valid"})
		return
	}
	var arts []models.Article
	if page.Size == 0 {
		page.Size = 10
	}
	uid := ctx.GetUint("user_id")
	arts, err := c.repo.ArticleService.GetArticlesOfUser(int64(page.Page), page.Size, uid)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	num, err := c.repo.ArticleService.CountArticlesOfUser(uid)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	res := models.ArticlesRes{
		Total: num,
		Data:  arts,
	}
	ctx.JSON(http.StatusOK, res)
}

func (c *ArticleController) GetArticleByID(ctx *gin.Context) {
	id, _ := strconv.ParseInt(ctx.Param("id"), 10, 64)
	var art models.Article
	art, err := c.repo.ArticleService.GetArticleByID(id)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, art)
}

func (c *ArticleController) EditArticleByID(ctx *gin.Context) {
	id, _ := strconv.ParseInt(ctx.Param("id"), 10, 64)
	body := models.ArticleReq{}
	err := ctx.ShouldBindJSON(&body)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "query params are not valid"})
		return
	}

	var art models.Article
	art, err = c.repo.ArticleService.GetArticleByID(id)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	uid, err := token.ExtractTokenID(ctx)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}
	if uid != art.UserID {
		ctx.JSON(http.StatusForbidden, gin.H{"error": "forbidden"})
		return
	}
	art.Content = body.Content
	art.Description = body.Description
	art.Title = body.Title

	art, err = c.repo.ArticleService.EditArticleByID(art)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, art)
}

func (c *ArticleController) DeleteArticleByID(ctx *gin.Context) {
	id, _ := strconv.ParseInt(ctx.Param("id"), 10, 64)
	art, err := c.repo.ArticleService.GetArticleByID(id)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	uid, err := token.ExtractTokenID(ctx)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}
	if uid != art.UserID {
		ctx.JSON(http.StatusForbidden, gin.H{"error": "forbidden"})
		return
	}
	err = c.repo.ArticleService.DeleteArticleByID(art)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, "deleted successfully")
}
