"use client";
import { toast } from "./ui/use-toast";
import { ReactElement } from "react";
import { Icons } from "./icons";
import { cn } from "@/lib/utils";

export const CopyToClipboard = ({
  text,
  children,
  className,
}: { text: string; children?: string | ReactElement; className?: string }) => {
  return (
    <div className=" flex items-center">
      {children}
      <Icons.clipboard
        className={cn("ml-2 h-5 w-5 cursor-pointer", className)}
        onClick={() => {
          navigator.clipboard.writeText(text);
          toast({
            title: "Copied to clipboard",
          });
        }}
      />
    </div>
  );
};
