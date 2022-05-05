package repos

import (
	"df-ass2/article-be/repos/article"
	"df-ass2/article-be/repos/user"
)

type Service struct {
	ArticleService article.Article
	UserService    user.User
}
