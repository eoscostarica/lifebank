CREATE TABLE "public"."preregister_lifebank"(
  "id" serial NOT NULL,
  "email" varchar NOT NULL,
  "password" varchar NOT NULL,
  "name" varchar NOT NULL,
  "address" varchar NOT NULL,
  "schedule" varchar NOT NULL,
  "phone" varchar NOT NULL,
  "description" varchar,
  "urgency_level" integer,
  "coordinates" varchar NOT NULL,
  "immunity_test" boolean DEFAULT false,
  "invitation_code" varchar,
  "state" varchar NOT NULL DEFAULT 'Pediente',
  "verification_code" varchar NOT NULL,
  "created_at" timestamptz DEFAULT now(),
  "updated_at" timestamptz DEFAULT now(),
  PRIMARY KEY ("id"),
  UNIQUE ("id"),
  UNIQUE ("email")
);