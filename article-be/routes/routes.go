package routes

import (
	"df-ass2/article-be/controllers"
	"df-ass2/article-be/middlewares"
	"github.com/gin-gonic/gin"
)

func Setup(router *gin.Engine, c controllers.Controllers) {

	v1 := router.Group("/v1")

	v1.POST("/register", c.UserController.Register)
	v1.POST("/login", c.UserController.Login)

	articleGroup := v1.Group("/articles")
	articleGroup.Use(middlewares.JwtAuthMiddleware())
	{
		articleGroup.GET("/", c.ArticleController.GetArticles)
		articleGroup.GET("/my", c.ArticleController.GetArticlesOfUser)
		articleGroup.GET("/:id", c.ArticleController.GetArticleByID)
		articleGroup.POST("/", c.ArticleController.PostArticle)
		articleGroup.PUT("/:id", c.ArticleController.EditArticleByID)
		articleGroup.DELETE("/:id", c.ArticleController.DeleteArticleByID)
	}

}
