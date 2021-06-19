ALTER TABLE "public"."user" ADD COLUMN "state" varchar;
ALTER TABLE "public"."user" ALTER COLUMN "state" DROP NOT NULL;
ALTER TABLE "public"."user" ALTER COLUMN "state" SET DEFAULT 'active'::character varying;
