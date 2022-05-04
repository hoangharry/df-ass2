package main

import (
	"df-ass2/article-be/controllers"
	"df-ass2/article-be/database"
	"df-ass2/article-be/middlewares"
	"df-ass2/article-be/repos"
	"df-ass2/article-be/repos/article"
	"df-ass2/article-be/routes"
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/viper"
	"os"
)

func main() {
	logger := log.New()

	{
		log.SetFormatter(&log.TextFormatter{
			DisableColors: true,
			FullTimestamp: true,
		})
		log.SetOutput(os.Stdout)

	}
	viper.SetConfigFile(".env")
	viper.AddConfigPath(".")
	err := viper.ReadInConfig() // Find and read the config file
	if err != nil {             // Handle errors reading the config file
		panic(fmt.Errorf("Fatal error config file: %w \n", err))
	}
	serverPort := ":" + fmt.Sprint(viper.Get("SERVER_PORT"))
	db := database.Connect(fmt.Sprint(viper.Get("DB_STR")))

	// service (repos) init add log and db to service
	var service repos.Service
	service = repos.Service{
		ArticleService: middlewares.Compose(
			article.NewReposArticle(db),
			article.LogMW(logger),
		).(article.Article),
	}

	// controller init add service and log
	var c controllers.Controllers
	c = controllers.Controllers{
		ArticleController: controllers.NewArticleControllers(&service),
	}

	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:3000"},
	}))
	routes.Setup(r, c)

	r.Run(serverPort)
}
