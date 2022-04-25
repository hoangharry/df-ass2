-- CREATE TABLE "User" (
--     "id" BIGINT AUTO_INCREMENT PRIMARY KEY,
--     "user_name" VARCHAR NOT NULL,
--     "pwd" TEXT NOT NULL
-- );

CREATE TABLE "Article" (
    "id" BIGSERIAL PRIMARY KEY,
    "category" VARCHAR NOT NULL,
    "user_id" BIGINT,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT (now())
);
CREATE Table "User" (
    "id" BIGSERIAL PRIMARY KEY,
    "name" VARCHAR NOT NULL
);

