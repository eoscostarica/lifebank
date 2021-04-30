alter table "public"."notification"
           add constraint "notification_account_to_fkey"
           foreign key ("account_to")
           references "public"."user"
           ("account") on update restrict on delete restrict;
