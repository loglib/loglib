import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAtom } from "jotai";
import { localSettingAtom } from "@/jotai/store";
import { useState } from "react";
import { TIMEZONES } from "@/lib/constants";

export const GeneralSetting = () => {
    const [setting, setSetting] = useAtom(localSettingAtom);

    const [timeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
    return (
        <form className=" space-y-2 flex flex-col items-start">
            <Label>Timezone</Label>
            <Select
                onValueChange={(v) => {
                    setSetting((prev) => ({
                        ...prev,
                        timezone: v,
                    }));
                }}
                defaultValue={setting.timezone ?? timeZone}
                value={setting.timezone ?? timeZone}
            >
                <SelectTrigger>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <ScrollArea className=" h-56">
                        {TIMEZONES.map((timezone) => (
                            <SelectItem key={timezone} value={timezone}>
                                {timezone}
                            </SelectItem>
                        ))}
                    </ScrollArea>
                </SelectContent>
            </Select>
            <Label>Default Graph</Label>
            <Select
                defaultValue={setting.graph ?? "line-graph"}
                onValueChange={(graph) => {
                    setSetting((prev) => ({
                        ...prev,
                        graph,
                    }));
                }}
            >
                <SelectTrigger>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="bar-graph">Bar Graph</SelectItem>
                    <SelectItem value="line-graph">Line Graph</SelectItem>
                </SelectContent>
            </Select>
        </form>
    );
};
