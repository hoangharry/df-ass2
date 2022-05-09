package main

import (
	"df-ass2/article-be/cfg"
	"df-ass2/article-be/controllers"
	"df-ass2/article-be/database"
	"df-ass2/article-be/middlewares"
	"df-ass2/article-be/repos"
	"df-ass2/article-be/repos/article"
	"df-ass2/article-be/repos/user"
	"df-ass2/article-be/routes"
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
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
	wd, err := os.Getwd()
	if err != nil {
		panic(fmt.Errorf("Cannot get path: %w \n", err))
	}

	cfg.ReadEnv(wd)
	serverPort := fmt.Sprintf(":%s", cfg.ConfigMap["SERVER_PORT"])
	db := database.Connect(fmt.Sprint(cfg.ConfigMap["DB_STR"]))
	// service (repos) init add log and db to service
	var service repos.Service
	service = repos.Service{
		ArticleService: middlewares.Compose(
			article.NewReposArticle(db),
			article.LogMW(logger),
		).(article.Article),
		UserService: middlewares.Compose(
			user.NewReposUser(db),
			user.LogMW(logger),
		).(user.User),
	}

	// controller init add service and log
	var c controllers.Controllers
	c = controllers.Controllers{
		ArticleController: controllers.NewArticleControllers(&service),
		UserController:    controllers.NewUserController(&service),
	}

	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"},
	}))
	routes.Setup(r, c)

	r.Run(serverPort)
}
