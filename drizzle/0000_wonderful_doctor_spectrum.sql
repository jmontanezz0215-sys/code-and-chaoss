CREATE TABLE `chat_limits` (
	`id` text PRIMARY KEY NOT NULL,
	`count` integer NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `leads` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`kind` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text DEFAULT '' NOT NULL,
	`business` text DEFAULT '' NOT NULL,
	`service` text NOT NULL,
	`website` text DEFAULT '' NOT NULL,
	`message` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `leads_email_created` ON `leads` (`email`,`created_at`);