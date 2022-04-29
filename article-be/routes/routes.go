package routes

import (
	"df-ass2/article-be/controllers"
	"github.com/gin-gonic/gin"
)

func Setup(router *gin.Engine) {
	v1 := router.Group("/v1")
	{
		v1.POST("/article", controllers.PostArticle)
		v1.GET("/article/:id", controllers.GetArticleByID)
		v1.GET("/article", controllers.GetArticles)
		v1.PUT("/article/:id", controllers.EditArticleByID)
	}

}
