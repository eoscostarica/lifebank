alter table "public"."location" add foreign key ("account") references "public"."user"("account") on update restrict on delete restrict;
