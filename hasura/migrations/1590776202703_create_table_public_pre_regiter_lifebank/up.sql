CREATE TABLE "public"."pre_register_lifebank"
(
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
  "verification_code" varchar NOT NULL,
  "state" varchar DEFAULT 'Pediente',
  PRIMARY KEY ("id") 
);