alter table "public"."notification"
           add constraint "notification_account_from_fkey"
           foreign key ("account_from")
           references "public"."user"
           ("account") on update restrict on delete restrict;
