package controllers

import (
	"df-ass2/article-be/models"
	"df-ass2/article-be/repos"
	"df-ass2/article-be/utils/token"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"net/http"
)

type UserController struct {
	repo *repos.Service
}

func NewUserController(r *repos.Service) UserController {
	return UserController{
		repo: r,
	}
}

func (c *UserController) Register(ctx *gin.Context) {
	var input models.RegisterInput
	if err := ctx.ShouldBindJSON(&input); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	hashPwd, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		ctx.JSON(http.StatusServiceUnavailable, err.Error())
		return
	}
	u := models.User{
		Username: input.Username,
		Password: string(hashPwd),
	}
	err = c.repo.UserService.AddUser(u)
	if err != nil {
		ctx.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
		return
	}
	ctx.String(http.StatusCreated, "success")
}

func (c *UserController) Login(ctx *gin.Context) {
	var input models.RegisterInput
	if err := ctx.ShouldBindJSON(&input); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	u, err := c.repo.UserService.GetUserByUsername(input.Username)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "no user found"})
		return
	}
	err = bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(input.Password))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "username or password is incorrect"})
		return
	}
	t, err := token.GenerateToken(u.ID)
	if err != nil {
		ctx.JSON(http.StatusServiceUnavailable, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"token": t})

}
