ALTER TABLE "public"."vault" ADD COLUMN "type" varchar;
ALTER TABLE "public"."vault" ALTER COLUMN "type" DROP NOT NULL;
