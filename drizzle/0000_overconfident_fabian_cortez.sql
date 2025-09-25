CREATE TABLE `courses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`level` text NOT NULL,
	`duration_weeks` integer NOT NULL,
	`price_aed` integer NOT NULL,
	`image_url` text NOT NULL,
	`description` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `courses_slug_unique` ON `courses` (`slug`);