CREATE TABLE `sent_email` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text,
	`createdAt` integer,
	`websiteId` text,
	`userId` text NOT NULL,
	FOREIGN KEY (`websiteId`) REFERENCES `website`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
