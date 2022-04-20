PROJECT_NAME=article-be

build:
	GOARCH=amd64 GOOS=darwin go build -o ${PROJECT_NAME}-darwin main.go
	GOARCH=amd64 GOOS=linux go build -o ${PROJECT_NAME}-linux main.go
	GOARCH=amd64 GOOS=window go build -o ${PROJECT_NAME}-windows main.go

run:
	./${PROJECT_NAME}

dev:
	go run main.go

clean:
	go clean
	rm ${PROJECT_NAME}-darwin
	rm ${PROJECT_NAME}-linux
	rm ${PROJECT_NAME}-windows
