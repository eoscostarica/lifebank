alter table "public"."notification" add foreign key ("account_from") references "public"."user"("account") on update restrict on delete restrict;
