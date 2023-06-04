import { OperatorType } from "@loglib/core/types";

export type Filter = {
    key: string;
    value: string;
    operator: OperatorType<any>;
    data: string
}

export type FilterProp = {
    clearFilter: (key: string) => void;
    addFilter: (filter: Filter) => void;
    isFilterActive: (key: string) => boolean;
}