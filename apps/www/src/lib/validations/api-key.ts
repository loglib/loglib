import { z } from "zod";

export const apiKeySchema = z.object({
	name: z
		.string()
		.min(3, "The name should be at least 3 characters long")
		.max(32),
	website: z
		.string({
			required_error:
				"Please choose which website you want to use this API key for",
		})
		.min(1, "Cannot be empty"),
	expiresIn: z.number().min(1).max(365),
});
