package database

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

const (
	dsn = "host=localhost user=root password=secret dbname=article_db port=5432 sslmode=disable TimeZone=Asia/Shanghai"
)

var DB *gorm.DB

func Connect() {
	connection, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("could not connect to the database")
	}

	DB = connection
}
