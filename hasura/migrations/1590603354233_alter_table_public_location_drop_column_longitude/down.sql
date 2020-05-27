ALTER TABLE "public"."location" ADD COLUMN "longitude" float8;
ALTER TABLE "public"."location" ALTER COLUMN "longitude" DROP NOT NULL;
