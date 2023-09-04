import { OperatorType } from "@loglib/types";

export type TimeRange = {
    startDate: Date;
    endDate: Date;
    stringValue?: string;
};

export type Filter = {
    key: string;
    value: string;
    operator: OperatorType<any>;
};

export type FilterProp = {
    clearFilter: (key: string) => void;
    addFilter: (filter: Filter) => void;
    isFilterActive: (key: string) => boolean;
};
