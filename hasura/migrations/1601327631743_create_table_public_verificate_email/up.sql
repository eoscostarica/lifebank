CREATE TABLE "public"."verificate_email"(
  "id" serial NOT NULL,
  "email" varchar NOT NULL,
  "verification_code" varchar NOT NULL,
  PRIMARY KEY ("id"),
  UNIQUE ("id"),
  UNIQUE ("email")
);