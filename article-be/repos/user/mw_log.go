package user

import (
	"df-ass2/article-be/models"
	log "github.com/sirupsen/logrus"
	"time"
)

type logMW struct {
	logger *log.Logger
	User
}

func LogMW(logger *log.Logger) func(User) User {
	return func(next User) User {
		return &logMW{
			logger: logger,
			User:   next,
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

func (mw logMW) GetUserByID(id int) (u models.User, err error) {
	defer func(begin time.Time) {
		mw.Log("GetUserByID", id, u, err, time.Since(begin))
	}(time.Now())

	return mw.User.GetUserByID(id)
}

func (mw logMW) GetUserByUsername(usr string) (u models.User, err error) {
	defer func(begin time.Time) {
		mw.Log("GetUserByID", usr, u, err, time.Since(begin))
	}(time.Now())

	return mw.User.GetUserByUsername(usr)
}

func (mw logMW) AddUser(usr models.User) (err error) {
	defer func(begin time.Time) {
		mw.Log("GetUserByID", usr, nil, err, time.Since(begin))
	}(time.Now())

	return mw.User.AddUser(usr)
}
