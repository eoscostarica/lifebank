DROP TRIGGER IF EXISTS "set_public_pre_register_lifebank_updated_at" ON "public"."pre_register_lifebank";
ALTER TABLE "public"."pre_register_lifebank" DROP COLUMN "updated_at";
