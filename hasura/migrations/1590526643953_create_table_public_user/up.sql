CREATE TABLE "public"."user"(
  "id" serial NOT NULL,
  "role" varchar NOT NULL,
  "username" varchar NOT NULL,
  "account" varchar NOT NULL,
  "secret" varchar NOT NULL,
  "email" varchar,
  PRIMARY KEY ("id"),
  UNIQUE ("email")
);