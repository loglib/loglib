import { cn } from "@/react/lib/utils";
import { TableBody, TableCell, TableRow } from "../ui/table";

const TableLoading = ({
  cellCount,
  className,
  rowOnly,
}: {
  cellCount: number;
  className?: string;
  rowOnly?: boolean;
}) => {
  if (!rowOnly) {
    return (
      <TableBody className=" animate-pulse">
        <TableRow
          className={cn(
            "h-6 gap-2 bg-gray-200 dark:bg-gray-800 rounded-md",
            className,
          )}
        >
          <TableCell colSpan={cellCount}></TableCell>
        </TableRow>
      </TableBody>
    );
  } else {
    return (
      <TableRow
        className={cn(
          "h-6 gap-2 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse",
          className,
        )}
      >
        <TableCell
          colSpan={cellCount}
          className=" h-6 gap-2 bg-gray-200 dark:bg-gray-800 animate-pulse text-center"
        >
          Loading Data ...
        </TableCell>
      </TableRow>
    );
  }
};
export { TableLoading };
