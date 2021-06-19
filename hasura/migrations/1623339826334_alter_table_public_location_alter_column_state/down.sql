ALTER TABLE "public"."location" ALTER COLUMN "state" TYPE boolean;
ALTER TABLE ONLY "public"."location" ALTER COLUMN "state" SET DEFAULT 'true';
