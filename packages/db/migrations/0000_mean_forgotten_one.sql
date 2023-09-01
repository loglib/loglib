CREATE TABLE `apiKey` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`name` text NOT NULL,
	`websiteId` text,
	`token` text NOT NULL,
	`expiresAt` integer NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`websiteId`) REFERENCES `website`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `events` (
	`id` text PRIMARY KEY NOT NULL,
	`event` text NOT NULL,
	`timestamp` integer NOT NULL,
	`sessionId` text NOT NULL,
	`visitorId` text NOT NULL,
	`properties` blob,
	`websiteId` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `account` (
	`userId` text NOT NULL,
	`type` text NOT NULL,
	`provider` text NOT NULL,
	`providerAccountId` text NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` integer,
	`token_type` text,
	`scope` text,
	`id_token` text,
	`session_state` text,
	PRIMARY KEY(`provider`, `providerAccountId`),
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `session` (
	`sessionToken` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`expires` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`email` text NOT NULL,
	`emailVerified` integer,
	`image` text,
	`createdAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `verificationToken` (
	`identifier` text NOT NULL,
	`token` text NOT NULL,
	`expires` integer NOT NULL,
	PRIMARY KEY(`identifier`, `token`)
);
--> statement-breakpoint
CREATE TABLE `team` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`type` text DEFAULT 'free',
	`description` text,
	`image` text,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `teamInvitation` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`teamId` text,
	`token` text NOT NULL,
	`status` text,
	`userId` text NOT NULL,
	`teamMemberId` text,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	FOREIGN KEY (`teamId`) REFERENCES `team`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`teamMemberId`) REFERENCES `teamMember`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `teamMember` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`email` text NOT NULL,
	`name` text,
	`teamId` text,
	`websiteId` text,
	`accepted` integer DEFAULT false,
	`text` text,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`teamId`) REFERENCES `team`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`websiteId`) REFERENCES `website`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `teamWebsites` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	`teamId` text,
	`websiteId` text,
	FOREIGN KEY (`teamId`) REFERENCES `team`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`websiteId`) REFERENCES `website`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `website` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` integer NOT NULL,
	`url` text NOT NULL,
	`title` text,
	`userId` text NOT NULL,
	`active` integer DEFAULT false NOT NULL,
	`public` integer DEFAULT false NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `apiKey_token_unique` ON `apiKey` (`token`);--> statement-breakpoint
CREATE INDEX `user_idx` ON `apiKey` (`userId`);--> statement-breakpoint
CREATE INDEX `website_idx` ON `events` (`websiteId`);--> statement-breakpoint
CREATE UNIQUE INDEX `teamInvitation_token_unique` ON `teamInvitation` (`token`);--> statement-breakpoint
CREATE INDEX `website_userIdx` ON `website` (`userId`);