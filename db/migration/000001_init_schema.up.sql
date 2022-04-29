-- CREATE TABLE "User" (
--     "id" BIGINT AUTO_INCREMENT PRIMARY KEY,
--     "user_name" VARCHAR NOT NULL,
--     "pwd" TEXT NOT NULL
-- );

CREATE TABLE "article" (
    "id" BIGSERIAL PRIMARY KEY,
    "category" VARCHAR NOT NULL,
    "user_id" BIGINT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" BIGINT NOT NULL
);
CREATE Table "user" (
    "id" BIGSERIAL PRIMARY KEY,
    "name" VARCHAR NOT NULL
);

