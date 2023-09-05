"use client";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/user-avatar";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
    user: User & {
        plan: string
    }
}

export function UserAccountNav({ user }: UserAccountNavProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserAvatar
                    user={{ name: user.name || null, image: user.image || null }}
                    className="h-8 w-8"
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                        {user.name && <p className="font-medium">{user.name}</p>}
                        {user.email && (
                            <p className="text-muted-foreground w-[200px] truncate text-sm">
                                {user.email}
                            </p>
                        )}
                    </div>
                    <Badge className={cn(" mt-2", user.plan !== "free" && "border border-amber-600")} style={{
                        background: user.plan === "free" ? "white" : user.plan !== "pro" ? "#1b1917" : "#1b1917",
                        color: user.plan === "free" ? "black" : "goldenrod"
                    }}>
                        {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)}
                    </Badge>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className=" cursor-pinter flex items-center gap-2">
                    <Link href="/dashboard" className="w-full cursor-pointer">
                        Dashboard
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="cursor-pointer"
                    onSelect={(event) => {
                        event.preventDefault();
                        signOut({
                            callbackUrl: `${window.location.origin}/login`,
                        });
                    }}
                >
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
