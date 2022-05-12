-- CREATE TABLE "User" (
--     "id" BIGINT AUTO_INCREMENT PRIMARY KEY,
--     "user_name" VARCHAR NOT NULL,
--     "pwd" TEXT NOT NULL
-- );

CREATE TABLE "article" (
    "id" BIGSERIAL PRIMARY KEY,
    "category" VARCHAR NOT NULL,
    "user_id" INT,
    "img" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP WITH TIMEZONE NOT NULL,
    "is_deleted" INT,
);
CREATE Table "user" (
    "id" BIGSERIAL PRIMARY KEY,
    "username" VARCHAR NOT NULL,
    "pwd" VARCHAR NOT NULL,
);

