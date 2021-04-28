UPDATE notification
SET account_from = substring(description from 6 for 12);

ALTER TABLE notification ALTER COLUMN account_from SET NOT NULL;
