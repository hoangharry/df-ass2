
   
# Specify the base image for the go app.
FROM golang:1.16
# Specify that we now need to execute any commands in this directory.
WORKDIR /go/src/df-ass2/article-be
# Copy everything from this project into the filesystem of the container.
COPY . .
# Obtain the package needed to run code. Alternatively use GO Modules. 
RUN go get mod tidy
# Compile the binary exe for our app.
RUN go build -o main .
# Start the application.
CMD ["./main"]