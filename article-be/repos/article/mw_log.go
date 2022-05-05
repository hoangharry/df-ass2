package article

import (
	"df-ass2/article-be/models"
	log "github.com/sirupsen/logrus"
	"time"
)

type logMW struct {
	logger *log.Logger
	Article
}

func LogMW(logger *log.Logger) func(Article) Article {
	return func(next Article) Article {
		return &logMW{
			logger:  logger,
			Article: next,
		}
	}
}

func (mw logMW) Log(method string, input, output interface{}, err error, took time.Duration) {
	if err != nil {
		mw.logger.Errorf("%s input:%v error: %v", method, input, err)
	} else {
		mw.logger.Infof("%s input:%v output:%v took %v", method, input, output, took)
	}

}

func (mw logMW) GetArticleByID(id int64) (art models.Article, err error) {
	defer func(begin time.Time) {
		mw.Log("GetArticleByID", id, art, err, time.Since(begin))
	}(time.Now())

	return mw.Article.GetArticleByID(id)
}

func (mw logMW) GetArticles(page int64, size int) (arts []models.Article, err error) {
	defer func(begin time.Time) {
		mw.Log("GetArticles", page, arts, err, time.Since(begin))
	}(time.Now())
	return mw.Article.GetArticles(page, size)
}

func (mw logMW) AddArticle(art models.Article) (err error) {
	defer func(begin time.Time) {
		mw.Log("AddArticle", art, nil, err, time.Since(begin))
	}(time.Now())
	return mw.Article.AddArticle(art)
}

func (mw logMW) EditArticleByID(newArt models.Article) (art models.Article, err error) {
	defer func(begin time.Time) {
		mw.Log("EditArticleByID", newArt, art, err, time.Since(begin))
	}(time.Now())
	return mw.Article.EditArticleByID(newArt)
}

func (mw logMW) DeleteArticleByID(art models.Article) (err error) {
	defer func(begin time.Time) {
		mw.Log("DeleteArticleByID", art, nil, err, time.Since(begin))
	}(time.Now())
	return mw.Article.DeleteArticleByID(art)
}

func (mw logMW) CountArticles() (num int64, err error) {
	defer func(begin time.Time) {
		mw.Log("CountArticles", nil, num, err, time.Since(begin))
	}(time.Now())
	return mw.Article.CountArticles()
}
