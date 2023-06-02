function camelToSnake<T extends object>(obj: T): T {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(camelToSnake) as unknown as T;
    }

    if (obj instanceof Date) {
        return obj;
    }

    return Object.keys(obj).reduce((acc, key) => {
        const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
        const value = obj[key as keyof T];
        return { ...acc, [snakeKey]: value };
    }, {} as T);
}
function snakeToCamel<T extends Record<string, any>>(obj: T): T {
    if (Array.isArray(obj)) {
        return obj.map(snakeToCamel) as unknown as T;
    }

    return Object.keys(obj).reduce((acc, key) => {
        const camelKey = key.replace(/_([a-z])/g, (_, letter: string) => letter.toUpperCase());
        const value = obj[key as keyof T];
        return { ...acc, [camelKey]: value };
    }, {} as T);
}

export { camelToSnake, snakeToCamel }