ALTER TABLE "public"."offer" ADD COLUMN "Icon" varchar;
ALTER TABLE "public"."offer" ALTER COLUMN "Icon" DROP NOT NULL;
