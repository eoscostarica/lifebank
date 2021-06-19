alter table "public"."notification" add foreign key ("account_to") references "public"."user"("account") on update restrict on delete restrict;
