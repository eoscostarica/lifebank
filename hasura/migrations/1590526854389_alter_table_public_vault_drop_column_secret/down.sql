ALTER TABLE "public"."vault" ADD COLUMN "secret" varchar;
ALTER TABLE "public"."vault" ALTER COLUMN "secret" DROP NOT NULL;
