CREATE TABLE "public"."temp_user"("role" varchar NOT NULL, "account" varchar NOT NULL, "secret" varchar NOT NULL, "email" varchar NOT NULL, "email_verified" varchar NOT NULL, "id" serial NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "name" varchar, "verification_code" varchar NOT NULL DEFAULT 'verificarion_code', "token" integer NOT NULL DEFAULT 0, "signup_method" varchar NOT NULL DEFAULT 'lifebank', "email_subscription" boolean NOT NULL DEFAULT true, "language" varchar NOT NULL DEFAULT 'es', PRIMARY KEY ("id") ); COMMENT ON TABLE "public"."temp_user" IS E'This table hold the user information when they deactivate their accounts';
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_temp_user_updated_at"
BEFORE UPDATE ON "public"."temp_user"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_temp_user_updated_at" ON "public"."temp_user" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
