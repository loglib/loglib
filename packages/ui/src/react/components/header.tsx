
import React from "react"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "./ui/dropdownMenu"
import { Clock, LogOut, Settings } from "lucide-react"
import NightModeIcon from "./Icon/NightModeIcon"
import { changeTheme } from "../lib/utils"
import LogoIcon from "./Icon/LogoIcon"

export type HeaderProps = { timezone: string, setTimezone: (state: string) => void, logoutFn: () => void, timezones: Record<string, { name: string }>, hideLogout?: boolean }

export const DefaultHeader = ({ timezone, timezones, setTimezone, logoutFn, hideLogout }: HeaderProps) => {
    return (
        <div className="tw-flex tw-items-center tw-justify-between">
            <div className="tw-flex tw-items-center tw-space-x-2 ">
                <LogoIcon />
                <h2 className="md:tw-text-4xl tw-font-bold tw-tracking-tight tw-text-2xl">LOGLIB</h2>
            </div>
            <div className="tw-flex tw-gap-4 tw-justify-center tw-items-center tw-col-span-1 tw-self-center tw-select-none tw-relative">

                <div
                    className="tw-rounded-md tw-cursor-pointer  hover:tw-bg-gray-100 dark:hover:tw-bg-gray-900 dark:bg-dark shadow-black/70 transition-al tw-duration-300 tw-ease-in-out"
                    onClick={changeTheme}
                >
                    <NightModeIcon />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Settings size={20} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className=" md:tw-w-52 tw-w-40">
                        <DropdownMenuGroup>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    <Clock className="tw-mr-2 tw-h-4 tw-w-4" />
                                    <span>Time Zone</span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>

                                    <DropdownMenuSubContent className=" tw-h-52 md:tw-w-52 tw-w-44 tw-overflow-scroll">

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
                                        <LogOut className="tw-mr-2 tw-h-4 tw-w-4" />
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