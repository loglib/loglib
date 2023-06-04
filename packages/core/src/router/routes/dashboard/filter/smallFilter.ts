type StringOperator = "is" | "isNot" | "contains" | "notContains";
type NumberOperator = "lte" | "gte" | "lt" | "gt" | "is" | "isNot";
type DateOperator = "lte" | "gte" | "lt" | "gt" | "is" | "isNot";
type ArrayOperator = "contains" | "notContains";


export type OperatorType<T> = T extends string ? StringOperator : T extends number ? NumberOperator : T extends Date ? DateOperator : T extends Array<any> ? ArrayOperator : never;


interface FilterFunction<T, S extends keyof T = keyof T> {
    where: (key: keyof T, operator: OperatorType<T[S]>, value: T[keyof T]) => FilterFunction<T>;
    or: () => FilterFunction<T>;
    and: () => FilterFunction<T>;
    execute: () => T[];
    sort: (key: keyof T, desc?: boolean) => FilterFunction<T>;
    limit: (count: number) => FilterFunction<T>;
}
type Primitive = string | number | boolean | null | undefined | Date | Array<null | number | string>

const filterRoot = <T extends Record<S, Primitive>, S extends keyof T>(
    data: T[],
    key: S,
    operator: OperatorType<T[S]>,
    value: T[S]
): T[] => {
    return data.filter((item) => {
        switch (operator) {
            case "is":
                return item[key] === value;
            case "isNot":
                return item[key] !== value;
            case "contains":
                const a = item[key] as Array<string>;
                return a.includes(value as string);
            case "notContains":
                const b = item[key] as Array<string>;
                return !b.includes(value as string);
            case "gt":
                const c = item[key] as number
                return c > (value as number);
            case "lt":
                return (item[key] as number) < (value as number);
            case "gte":
                return (item[key] as number) >= (value as number);
            case "lte":
                return (item[key] as number) <= (value as number);
            default:
                return true;
        }
    });
};

const filter = <T extends Record<S, T[S]>, S extends keyof T>(data: T[]) => {
    let andFilters: ((data: T[]) => T[])[] = [];
    const orFilters: ((data: T[]) => T[])[] = [];
    let limitCount: number | undefined;

    const execute = (): T[] => {
        let result = data;

        if (andFilters.length > 0) {
            for (const filterFn of andFilters) {
                result = filterFn(result);
            }
        }

        if (orFilters.length > 0) {
            const orResults: T[][] = [];
            for (const filterFn of orFilters) {
                const filtered = filterFn(result);
                if (filtered.length > 0) {
                    orResults.push(filtered);
                }
            }
            if (orResults.length > 0) {
                result = ([] as T[]).concat(...orResults);
            }
        }

        if (limitCount !== undefined && result.length > limitCount) {
            result = result.slice(0, limitCount);
        }
        return result;
    };

    const limit = (count: number): FilterFunction<T> => {
        limitCount = count;
        return {
            execute,
            where,
            or,
            and,
            sort,
            limit,
        };
    };


    const sort = (key: keyof T, desc?: boolean): FilterFunction<T> => {
        //sort by key
        const sorted = data.sort((a, b) => {
            if (a[key] < b[key]) {
                return -1;
            }
            if (a[key] > b[key]) {
                return 1;
            }
            return 0;
        });
        if (desc) {
            sorted.reverse();
        }
        return {
            execute,
            where,
            or,
            and,
            sort,
            limit
        }
    };

    const where: FilterFunction<T>['where'] = (key, operator, value) => {
        andFilters.push((data) => filterRoot(data, key, operator, value));
        return {
            where,
            execute,
            or,
            and,
            sort,
            limit
        };
    };


    const and = (...filters: { key: keyof T; operator: OperatorType<T[S]>; value: T[keyof T] }[]): FilterFunction<T> => {
        orFilters.push((data) => {
            let result = data;
            for (const filter of filters) {
                result = filterRoot(result, filter.key, filter.operator, filter.value);
            }
            return result;
        });
        return {
            where,
            execute,
            or,
            and,
            sort,
            limit
        };
    };

    const or = (): FilterFunction<T> => {
        const currentAndFilters = andFilters;
        andFilters = [];
        orFilters.push((data) => {
            let result = data;
            for (const filterFn of currentAndFilters) {
                result = filterFn(result);
            }
            return result;
        });
        return {
            where,
            execute,
            or,
            and,
            sort,
            limit
        };
    };
    return {
        where
    };
};
export { filter };
