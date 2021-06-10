ALTER TABLE "public"."location" ADD COLUMN "state" varchar;
ALTER TABLE "public"."location" ALTER COLUMN "state" DROP NOT NULL;
ALTER TABLE "public"."location" ALTER COLUMN "state" SET DEFAULT 'active'::character varying;
COMMENT ON COLUMN "public"."location"."state" IS E'Handle whether the user location is currently active or inactive to query its information';
