CREATE TABLE `emails` (
	`id` text PRIMARY KEY NOT NULL,
	`lastSent` integer,
	`sendingInterval` integer DEFAULT 30,
	`reportInterval` integer DEFAULT 30,
	`websiteId` text,
	FOREIGN KEY (`websiteId`) REFERENCES `website`(`id`) ON UPDATE no action ON DELETE cascade
);
