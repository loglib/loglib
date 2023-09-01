export async function retryFunction<
	T extends ReturnType<F>,
	F extends (...args: any[]) => Promise<any>,
	S extends Parameters<F>,
>(func: F, inputs: S, maxRetries: number, delayMs: number): Promise<T> {
	try {
		return await func(...inputs);
	} catch (error) {
		if (maxRetries <= 0) {
			throw error;
		}
		console.log("retry...", " \n remaining retries: ", maxRetries, error);
		await new Promise((resolve) => setTimeout(resolve, delayMs));
		return retryFunction(func, inputs, maxRetries - 1, delayMs);
	}
}
