ALTER TABLE "public"."location" ALTER COLUMN "state" TYPE varchar;
ALTER TABLE ONLY "public"."location" ALTER COLUMN "state" SET DEFAULT 'active';
