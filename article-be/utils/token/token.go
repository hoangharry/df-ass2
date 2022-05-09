package token

import (
	"fmt"
	jwt "github.com/dgrijalva/jwt-go/v4"
	"github.com/gin-gonic/gin"
	"github.com/spf13/viper"
	"strconv"
	"strings"
	"time"
)

func GenerateToken(userID uint) (string, error) {
	tokenLifespan, _ := strconv.Atoi(fmt.Sprint(viper.Get("TOKEN_HOUR_LIFESPAN")))
	claims := jwt.MapClaims{}
	claims["user_id"] = userID
	claims["exp"] = time.Now().Add(time.Hour * time.Duration(tokenLifespan)).Unix()
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return token.SignedString([]byte(fmt.Sprint(viper.Get("SECRET_KEY"))))
}

func TokenValid(ctx *gin.Context) error {
	tokenString := ExtractToken(ctx)
	_, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signed method: %v", token.Header["alg"])
		}
		return []byte(fmt.Sprint(viper.Get("SECRET_KEY"))), nil
	})
	if err != nil {
		return err
	}
	return nil
}

func ExtractToken(ctx *gin.Context) string {
	bearerToken := ctx.Request.Header.Get("Authorization")
	if len(strings.Split(bearerToken, " ")) == 2 {
		return strings.Split(bearerToken, " ")[1]
	}
	return ""

}

func ExtractTokenID(ctx *gin.Context) (uint, error) {
	tokenString := ExtractToken(ctx)
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signed method: %v", token.Header["alg"])
		}
		return []byte(fmt.Sprint(viper.Get("SECRET_KEY"))), nil
	})
	if err != nil {
		return 0, err
	}
	claims, ok := token.Claims.(jwt.MapClaims)
	if ok && token.Valid {
		uid, err := strconv.ParseUint(fmt.Sprintf("%.0f", claims["user_id"]), 10, 64)
		if err != nil {
			return 0, err
		}
		return uint(uid), nil
	}
	return 0, nil
}
