import { XCircle } from "lucide-react";

export function ClearFilter({ onClick }: { onClick: () => void }) {
  return (
    <div
      className=" flex gap-1 text-sm mt-4 mb-2 items-center justify-end font-bold cursor-pointer"
      onClick={onClick}
      onKeyUp={(e) => {
        if (e.key === "Enter") {
          onClick();
        }
      }}
      role="button"
    >
      <XCircle size={14} className=" " />
      <p>Clear Filter</p>
    </div>
  );
}
