ALTER TABLE user ADD `plan` text DEFAULT 'free';--> statement-breakpoint
ALTER TABLE user ADD `stripeId` text;--> statement-breakpoint
ALTER TABLE user ADD `billingCycleStart` integer;