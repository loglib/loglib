import * as React from "react";

export function useMounted() {
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	return mounted;
}

export function useRunOnMount<T>(fn: () => T) {
	const [result, setResult] = React.useState<T>();

	React.useEffect(() => {
		setResult(fn());
	}, [fn]);
	return result;
}
