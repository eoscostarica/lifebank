alter table "public"."verificate_email" add foreign key ("email") references "public"."preregister_lifebank"("email") on update restrict on delete restrict;
