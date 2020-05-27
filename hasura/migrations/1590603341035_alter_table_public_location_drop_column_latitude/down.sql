ALTER TABLE "public"."location" ADD COLUMN "latitude" float8;
ALTER TABLE "public"."location" ALTER COLUMN "latitude" DROP NOT NULL;
