# df-ass2
# Assignment 2 at DF: Article 

Article is a website application for user to register to post their blogs to the community in the app to share their thoughts.

## Initialization
To install all package use in this project please run this command

```bash
make init
```

This command will install tool for migration, all backend and frontend packages.

## Database
PostgresSQL is used to build this application.
For migration use [golang-migrate](https://github.com/golang-migrate/migrate)
```bash
// migrate up command
make migrateup
// migrate down command
make migratedown
```


## Backend
Backend service write in Go use [gin](https://github.com/gin-gonic/gin) framework
To run backend service 
```bash
cd article-be
go run main.go

// OR use make

```
### Support API




## Frontend
Frontend is built with ReactJS, created with command **create-react-app**. [Tailwind](https://tailwindcss.com/) is used to style webpage.

To run frontend please run following commands:
```bash
cd article-fe
npm install
npm run

// OR use make
```

