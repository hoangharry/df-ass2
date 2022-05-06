postgres:
	docker run --name postgres12 -p 5432:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=secret -d postgres:12-alpine

createdb:
	docker exec -it postgres12 createdb --username=root --owner=root article_db

dropdb:
	docker exec -it postgres12 dropdb article_db

migrateup:
	migrate -path db/migration -database "postgresql://root:secret@localhost:5432/article_db?sslmode=disable" -verbose up

migratedown:
	migrate -path db/migration -database "postgresql://root:secret@localhost:5432/article_db?sslmode=disable" -verbose down

PROJECT_NAME=article-be

build:
	GOARCH=amd64 GOOS=darwin go build -o ${PROJECT_NAME}-darwin ${PROJECT_NAME}/main.go
	GOARCH=amd64 GOOS=linux go build -o ${PROJECT_NAME}-linux ${PROJECT_NAME}/main.go
	GOARCH=amd64 GOOS=window go build -o ${PROJECT_NAME}-windows ${PROJECT_NAME}/main.go

run:
	./${PROJECT_NAME}

dev:
	go run ${PROJECT_NAME}/main.go

clean:
	go clean
	rm ${PROJECT_NAME}-darwin
	rm ${PROJECT_NAME}-linux
	rm ${PROJECT_NAME}-windows

init:
	
	curl -L https://github.com/golang-migrate/migrate/releases/download/$version/migrate.$platform-amd64.tar.gz | tar xvz
	cd ${PROJECT_NAME} && go mod tidy
	

.PHONY: postgres createdb dropdb migrateup migratedown init