CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" varchar(200) NOT NULL,
	"email" varchar(30) UNIQUE NOT NULL,
	"password" TEXT NOT NULL,
	"picture_url" TEXT NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT 'NOW()',
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "posts" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"link_url" TEXT NOT NULL,
	"description" TEXT NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT 'NOW()',
	CONSTRAINT "posts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "sessions" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"token" TEXT NOT NULL UNIQUE,
	"created_at" TIMESTAMP NOT NULL DEFAULT 'NOW()',
	CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "likes" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"post_id" TEXT NOT NULL UNIQUE,
	"created_at" TIMESTAMP NOT NULL DEFAULT 'NOW()',
	CONSTRAINT "likes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "hashtags" (
	"id" serial NOT NULL,
	"hashtag" TEXT NOT NULL UNIQUE,
	"post_id" integer NOT NULL,
	"count" integer NOT NULL DEFAULT '1',
	"created_at" TIMESTAMP NOT NULL DEFAULT 'NOW()',
	CONSTRAINT "hashtags_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "posts" ADD CONSTRAINT "posts_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "likes" ADD CONSTRAINT "likes_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "likes" ADD CONSTRAINT "likes_fk1" FOREIGN KEY ("post_id") REFERENCES "posts"("id");

ALTER TABLE "hashtags" ADD CONSTRAINT "hashtags_fk0" FOREIGN KEY ("post_id") REFERENCES "posts"("id");





