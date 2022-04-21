package routes

import (
	"df-ass2/article-be/controllers"
	"github.com/gin-gonic/gin"
)

func Setup(route *gin.Engine) {
	route.POST("/aticle", controllers.PostArticle)
	route.GET("/article/:id", controllers.GetArticleById)
	route.GET("/article", controllers.GetArticles)
}
