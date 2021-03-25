ALTER TABLE "public"."preregister_lifebank" ADD COLUMN "categories" jsonb NOT NULL DEFAULT jsonb_build_array();
