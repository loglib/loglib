import { ScrollArea } from "../ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { TableLoading } from "../util/tableLoading";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Tip } from "../util/tooltip";

type InsightProps<T> = {
  isLoading: boolean;
  data?: T[];
  meta: {
    key: keyof T;
    nameLabel: string;
    valueLabel: string;
  };
  Row: (data: T) => React.ReactElement;
  searchFn?: (term: string) => void;
  hideSearchBar?: boolean;
  searchPlaceholder: string;
  tip?: string;
};

export function InsightTable<T>({
  isLoading,
  data,
  meta,
  searchFn,
  Row,
  hideSearchBar,
  tip,
  searchPlaceholder,
}: InsightProps<T>) {
  const [term, setTerm] = useState("");
  const [lData, setLData] = useState<T[]>([]);
  useEffect(() => {
    if (term) {
      if (data) {
        setLData(
          data.filter((d) =>
            (d[meta.key] as string).toLowerCase().includes(term.toLowerCase()),
          ),
        );
      }
    }
    if (!term && data) {
      setLData(data);
    }
  }, [term, data]);
  return (
    <ScrollArea className=" md:tw-h-96 tw-h-72">
      <Table>
        <TableCaption>{tip}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>{meta.nameLabel}</TableHead>
            <TableHead className="tw-text-right">{meta.valueLabel}</TableHead>
          </TableRow>
          {!isLoading && !hideSearchBar && (
            <TableHead colSpan={2} className=" tw-px-0">
              <div className="tw-flex tw-h-10 tw-w-full tw-items-center tw-rounded-md tw-border  tw-border-slate-200 tw-bg-white tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-white file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium placeholder:tw-text-slate-500 focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-slate-400 focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 dark:tw-border-slate-800 dark:tw-bg-slate-950 dark:tw-ring-offset-slate-950 dark:placeholder:tw-text-slate-400 dark:focus-visible:tw-ring-slate-800 tw-relative">
                <input
                  onChange={(e) => setTerm(e.target.value)}
                  className=" tw-bg-transparent tw-flex-grow focus:tw-outline-none tw-outline-none"
                  placeholder={searchPlaceholder}
                  value={term}
                />

                <Tip tip="This will also filter the data">
                  <Search
                    size={16}
                    className=" tw-cursor-pointer"
                    onClick={() => {
                      if (term) {
                        searchFn && searchFn(term);
                      }
                    }}
                  />
                </Tip>
              </div>
            </TableHead>
          )}
        </TableHeader>
        {isLoading || !data ? (
          <TableLoading cellCount={2} />
        ) : (
          <TableBody>
            {lData.map((d, i) => {
              return <Row {...d} key={i} />;
            })}
          </TableBody>
        )}
      </Table>
    </ScrollArea>
  );
}
