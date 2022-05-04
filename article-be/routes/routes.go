package routes

import (
	"df-ass2/article-be/controllers"
	"github.com/gin-gonic/gin"
)

func Setup(router *gin.Engine, c controllers.Controllers) {

	v1 := router.Group("/v1")
	articleGroup := v1.Group("/articles")
	{
		articleGroup.GET("/", c.ArticleController.GetArticles)
		articleGroup.GET("/:id", c.ArticleController.GetArticleByID)
		articleGroup.POST("/", c.ArticleController.PostArticle)
		articleGroup.PUT("/:id", c.ArticleController.EditArticleByID)
		articleGroup.DELETE("/:id", c.ArticleController.DeleteArticleByID)
	}

}
