ALTER TABLE "public"."notification" ADD COLUMN "state" bool;
ALTER TABLE "public"."notification" ALTER COLUMN "state" DROP NOT NULL;
ALTER TABLE "public"."notification" ALTER COLUMN "state" SET DEFAULT false;
