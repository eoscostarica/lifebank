DROP TRIGGER IF EXISTS "set_public_offer_updated_at" ON "public"."offer";
ALTER TABLE "public"."offer" DROP COLUMN "updated_at";
