
import React from "react"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "./ui/dropdownMenu"
import { Clock, LogOut, Settings } from "lucide-react"
import NightModeIcon from "./Icon/NightModeIcon"
import { changeTheme } from "../lib/utils"
import LogoIcon from "./Icon/LogoIcon"

export type HeaderProps = { timezone: string, setTimezone: (state: string) => void, logoutFn: () => void, timezones: Record<string, { name: string }>, hideLogout?: boolean }

export const DefaultHeader = ({ timezone, timezones, setTimezone, logoutFn, hideLogout }: HeaderProps) => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 ">
                <LogoIcon />
                <h2 className="md:text-4xl font-bold tracking-tight text-2xl">LOGLIB</h2>
            </div>
            <div className="flex gap-4 justify-center items-center col-span-1 self-center select-none relative">

                <div
                    className="rounded-md cursor-pointer  hover:bg-gray-100 dark:hover:bg-gray-900 dark:bg-dark shadow-black/70 transition-al duration-300 ease-in-out"
                    onClick={changeTheme}
                >
                    <NightModeIcon />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Settings size={20} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className=" md:w-52 w-40">
                        <DropdownMenuGroup>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    <Clock className="mr-2 h-4 w-4" />
                                    <span>Time Zone</span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>

                                    <DropdownMenuSubContent className=" h-52 md:w-52 w-44 overflow-scroll">

                                        {
                                            Object.keys(timezones).sort().map((t: string) => {
                                                const z = timezones[t]
                                                return (
                                                    <DropdownMenuCheckboxItem checked={z.name === timezone} onCheckedChange={() => setTimezone(z.name)} key={t}>
                                                        <span>{z.name}</span>
                                                    </DropdownMenuCheckboxItem>
                                                )
                                            })
                                        }
                                    </DropdownMenuSubContent>

                                </DropdownMenuPortal>
                            </DropdownMenuSub>


                            {!hideLogout &&
                                <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={logoutFn}
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Logout
                                    </DropdownMenuItem>
                                </>
                            }
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}