package main

import (
	"df-ass2/article-be/database"
	"df-ass2/article-be/routes"
	"github.com/gin-gonic/gin"
)

func main() {
	database.Connect()
	r := gin.Default()
	routes.Setup(r)
	r.Run(":8080")

}
