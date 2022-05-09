package middlewares

import (
	"df-ass2/article-be/utils/token"
	"github.com/gin-gonic/gin"
	"net/http"
)

func JwtAuthMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		err := token.TokenValid(ctx)
		uid, er := token.ExtractTokenID(ctx)
		if err != nil || er != nil {
			ctx.JSON(http.StatusUnauthorized, "Unauthorized")
			ctx.Abort()
			return
		}
		ctx.Set("user_id", uid)
		ctx.Next()
	}
}
