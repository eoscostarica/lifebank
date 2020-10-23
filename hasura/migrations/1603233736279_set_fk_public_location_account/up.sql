alter table "public"."location"
           add constraint "location_account_fkey"
           foreign key ("account")
           references "public"."user"
           ("account") on update restrict on delete restrict;
