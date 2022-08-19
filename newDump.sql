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
	"url_title" TEXT NOT NULL,
	"url_description" TEXT NOT NULL,
	"url_image" TEXT NOT NULL,
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
	"post_id" integer NOT NULL ,
	"created_at" TIMESTAMP NOT NULL DEFAULT 'NOW()',
	CONSTRAINT "likes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "hashtags" (
	"id" serial NOT NULL,
	"hashtag" TEXT NOT NULL UNIQUE,
	"count" integer NOT NULL DEFAULT '1',
	"created_at" TIMESTAMP NOT NULL DEFAULT 'NOW()',
	CONSTRAINT "hashtags_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "hashtags-posts" (
	"id" serial NOT NULL,
	"hashtag_id" integer NOT NULL,
	"post_id" integer NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT 'NOW()',
	CONSTRAINT "hashtags-posts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "follows" (
	"id" serial NOT NULL,
	"follower_id" integer NOT NULL,
	"followed_id" integer NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT 'NOW()',
	CONSTRAINT "follows_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "comments" (
	"id" serial NOT NULL,
	"author_id" integer NOT NULL,
	"post_id" integer NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT 'NOW()',
	CONSTRAINT "comments_pk" PRIMARY KEY ("id")
)WITH (
  OIDS=FALSE
);

CREATE TABLE "reposts" (
	"id" serial NOT NULL,
	"repost_user_id" integer NOT NULL,
	"post_id" integer NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT 'NOW()',
	CONSTRAINT "reposts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);





ALTER TABLE "posts" ADD CONSTRAINT "posts_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "likes" ADD CONSTRAINT "likes_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "likes" ADD CONSTRAINT "likes_fk1" FOREIGN KEY ("post_id") REFERENCES "posts"("id");

ALTER TABLE "hashtags-posts" ADD CONSTRAINT "hashtags-posts_fk0" FOREIGN KEY ("hashtag_id") REFERENCES "hashtags"("id");
ALTER TABLE "hashtags-posts" ADD CONSTRAINT "hashtags-posts_fk1" FOREIGN KEY ("post_id") REFERENCES "posts"("id");

ALTER TABLE "follows" ADD CONSTRAINT "follows_fk0" FOREIGN KEY ("follower_id") REFERENCES "users"("id");
ALTER TABLE "follows" ADD CONSTRAINT "follows_fk1" FOREIGN KEY ("followed_id") REFERENCES "users"("id");

ALTER TABLE "comments" ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("author_id") REFERENCES "users"("id");
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk1" FOREIGN KEY ("post_id") REFERENCES "posts"("id");


ALTER TABLE "reposts" ADD CONSTRAINT "reposts_fk0" FOREIGN KEY ("post_id") REFERENCES "posts"("id");

ALTER TABLE "posts" ADD "reposted" boolean NOT NULL DEFAULT 'false';


