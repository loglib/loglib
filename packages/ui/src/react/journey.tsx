import React from "react"
import { Card, CardContent, CardFooter, CardHeader } from "./components/ui/card"
import { Button } from "./components/ui/button"
import { ArrowRight, Minus, Plus } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./components/ui/dropdownMenu"


export const Journey = () => {
    const [journeys, setJourneys] = React.useState([{ url: "/login", name: "Login" }, { url: "/dashboard", name: "Dashboard" }])
    return (
        <div>
            <Card>
                <CardHeader className=" text-2xl font-bold">
                    Analyze Pages Journey
                </CardHeader>
                <CardContent className=" flex items-center gap-2">
                    {
                        journeys.map((j, index) => {
                            return (
                                <div className=" flex items-center gap-2"
                                    key={index}
                                    onClick={() => {
                                        setJourneys(journeys.filter((_, i) => i !== index))
                                    }}
                                >
                                    <Button variant="outline">
                                        <p>{j.name}</p>
                                    </Button>
                                    <ArrowRight size={20} />
                                </div>

                            )
                        }
                        )
                    }
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                <Plus />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className=" w-56" align="start">
                            <DropdownMenuLabel>Choose a page</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem textValue="dashboard"
                                    onClick={() => setJourneys([...journeys, { name: "Dashboard", url: "/dashboard" }])}
                                >
                                    <span>/dashboard</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem textValue="dashboard"
                                    onClick={() => setJourneys([...journeys, { name: "Login", url: "/login" }])}
                                >
                                    <span>/login</span>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardContent>
                <CardFooter>
                    <Button className=" bg-gray-900 text-emphasis hover:bg-gray-800">
                        Analyze
                    </Button>
                </CardFooter>

            </Card>
        </div >
    )
}