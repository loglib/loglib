import React from "react"
import { TabsContent } from "../components/ui/tabs"
import { APIResponse } from "../type"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { ArrowUpIcon, Users } from "lucide-react"

const Insights = ({ user, events, session, pageView }: { data: APIResponse, isLoading: boolean }) => {
    return (
        <TabsContent value="insights" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Unique Visitors
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">700</div>
                        <div className=" flex">
                            <ArrowUpIcon
                                className=" text-green-500"
                                size={16}
                            />
                            <p className=" text-xs">24.8%</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </TabsContent>
    )
}

export default Insights