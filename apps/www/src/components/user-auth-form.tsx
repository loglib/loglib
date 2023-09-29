"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import * as React from "react";

import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    activeStrategy: {
        github?: boolean;
        google?: boolean;
    };
}
export function UserAuthForm({ className, activeStrategy, ...props }: Props) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false);
    const searchParams = useSearchParams();
    return (
        <div className={cn("grid gap-4 ", className)} {...props}>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background text-muted-foreground px-2">continue with</span>
                </div>
            </div>
            {activeStrategy.github && (
                <button
                    type="button"
                    className={cn(buttonVariants({ variant: "outline" }))}
                    onClick={() => {
                        setIsGitHubLoading(true);
                        signIn("github", {
                            callbackUrl: "/dashboard",
                        });
                    }}
                    disabled={isLoading || isGitHubLoading}
                >
                    {isGitHubLoading ? (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Icons.gitHub className="mr-2 h-4 w-4" />
                    )}
                    Github
                </button>
            )}
            {activeStrategy.google && (
                <button
                    type="button"
                    className={cn(buttonVariants({ variant: "outline" }))}
                    onClick={() => {
                        setIsLoading(true);
                        signIn("google", {
                            callbackUrl: "/dashboard",
                        });
                    }}
                    disabled={isLoading || isGitHubLoading}
                >
                    {isLoading ? (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Icons.google className="mr-2 h-4 w-4 dark:fill-white" />
                    )}
                    Google
                </button>
            )}
        </div>
    );
}
