alter table "public"."verificate_email" add foreign key ("email") references "public"."user"("email") on update restrict on delete restrict;
