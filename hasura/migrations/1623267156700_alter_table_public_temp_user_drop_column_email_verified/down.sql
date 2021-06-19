ALTER TABLE "public"."temp_user" ADD COLUMN "email_verified" varchar;
ALTER TABLE "public"."temp_user" ALTER COLUMN "email_verified" DROP NOT NULL;
