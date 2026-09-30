CREATE TABLE `admin_identity` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`model` text NOT NULL,
	`category` text NOT NULL,
	`height` real NOT NULL,
	`width` real NOT NULL,
	`material` text NOT NULL,
	`lighting` text NOT NULL,
	`description` text NOT NULL,
	`subtitle` text NOT NULL,
	`images` text NOT NULL,
	`published` integer DEFAULT 0 NOT NULL,
	`demo` integer DEFAULT 0 NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_products_model` ON `products` (`model`);--> statement-breakpoint
CREATE TABLE `settings` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL
);
